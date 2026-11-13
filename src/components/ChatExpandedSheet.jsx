import React, { useState } from 'react';
import { motion, useDragControls, useReducedMotion } from 'motion/react';
import { BrandIcon } from './BrandVisual.jsx';

const chats = [
  { name: 'Souad Ibrahim', service: 'Housekeeper · Cook', status: 'Online', time: '12:42 PM', image: 'b2a63.png' },
  { name: 'Fatma EL-Sayed', service: 'Housekeeper · Cook', status: 'Online', time: '9:25 PM', image: 'e91be.png' },
  { name: 'Shaimaa Ali', service: 'Housekeeper · Cook', status: 'Offline', time: '29/5/2025', image: '6a1c3.png' },
  { name: 'Amal Mostafa', service: 'Housekeeper · Cook', status: 'Online', time: '27/5/2025', image: '8526c.png' },
  { name: 'Eman Ragab', service: 'Nanny', status: 'Offline', time: '26/5/2025', image: '6ceb4.png' },
  { name: 'Hoda Mahmoud', service: 'Elderly care · Nursing', status: 'Online', time: '22/5/2025', image: '867ad.png' },
];

const unreadCount = (app, name) =>
  Object.entries(app.chatMeta?.unread || {}).find(([person]) => person.toLowerCase() === name.toLowerCase())?.[1] || 0;

export default function ChatExpandedSheet({ app, expanded, onExpandedChange }) {
  const [query, setQuery] = useState('');
  const controls = useDragControls();
  const reduced = useReducedMotion();
  const visible = chats.filter(chat => chat.name.toLowerCase().includes(query.toLowerCase()));

  const snapFromDrag = (_, info) => {
    const passedUp = info.offset.y < -58 || info.velocity.y < -430;
    const passedDown = info.offset.y > 58 || info.velocity.y > 430;
    if (passedUp) onExpandedChange(true);
    else if (passedDown) onExpandedChange(false);
  };

  const handleKeyDown = event => {
    if (event.key === 'ArrowUp' || event.key === 'Home') {
      event.preventDefault();
      onExpandedChange(true);
    } else if (event.key === 'ArrowDown' || event.key === 'End') {
      event.preventDefault();
      onExpandedChange(false);
    }
  };

  return (
    <motion.section
      className="chat-expanded-sheet"
      role="region"
      aria-label="Chats"
      drag="y"
      dragListener={false}
      dragControls={controls}
      dragConstraints={{ top: 0, bottom: 192 }}
      dragElastic={0.045}
      dragMomentum={false}
      dragDirectionLock
      onDragEnd={snapFromDrag}
      initial={false}
      animate={{ y: expanded ? 0 : 192 }}
      transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 430, damping: 40, mass: 0.82 }}
    >
      <button
        type="button"
        className="chat-sheet-handle"
        aria-label={expanded ? 'Drag down to show favorites' : 'Drag up to show all chats'}
        aria-expanded={expanded}
        onPointerDown={event => controls.start(event)}
        onKeyDown={handleKeyDown}
        onClick={event => {
          // Preserve keyboard and assistive-technology activation without making a tap expand the panel.
          if (event.detail === 0) onExpandedChange(!expanded);
        }}
      >
        <span aria-hidden="true" />
      </button>

      <label className="chat-sheet-search">
        <span aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="10.8" cy="10.8" r="6.5" /><path d="m16 16 4 4" /></svg></span>
        <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search chats" aria-label="Search chats" />
      </label>

      <div className="chat-sheet-list">
        {visible.map(chat => (
          <button
            key={chat.name}
            className="chat-sheet-row"
            onClick={() => app.act({ action: 'chat', label: `Chat with ${chat.name}`, person: chat.name }, chat.name)}
          >
            <img src={`/assets/${chat.image}`} alt="" />
            <span className="chat-sheet-details">
              <strong>{chat.name}</strong>
              <small>{chat.service}</small>
            </span>
            <span className="chat-sheet-meta">
              <b className={chat.status === 'Online' ? 'online' : 'offline'}>{chat.status}</b>
              {unreadCount(app, chat.name) > 0 && <small className="chat-sheet-unread">{unreadCount(app, chat.name)} new</small>}
              <small>{chat.time}</small>
            </span>
            <BrandIcon name="chevron" />
          </button>
        ))}
        {!visible.length && <p className="chat-sheet-empty">No chats match that name.</p>}
      </div>
    </motion.section>
  );
}
