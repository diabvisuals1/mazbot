import React, { useLayoutEffect, useRef, useState } from 'react';
import { BrandIcon } from './BrandVisual.jsx';

const PEEK_Y = 192;
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

function readTranslateY(element) {
  const value = getComputedStyle(element).transform;
  if (!value || value === 'none') return 0;
  try { return new DOMMatrixReadOnly(value).m42; } catch { return 0; }
}

export default function ChatExpandedSheet({ app, expanded, onExpandedChange }) {
  const [query, setQuery] = useState('');
  const sheetRef = useRef(null);
  const gesture = useRef(null);
  const expandedRef = useRef(expanded);
  const targetY = useRef(expanded ? 0 : PEEK_Y);
  const initialized = useRef(false);
  const lastTouchAt = useRef(0);
  const reduced = typeof window !== 'undefined' && (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  const visible = chats.filter(chat => chat.name.toLowerCase().includes(query.toLowerCase()));

  expandedRef.current = expanded;

  const setY = (element, value) => {
    const bounded = Math.max(0, Math.min(PEEK_Y, value));
    element.style.setProperty('--chat-sheet-y', `${bounded}px`);
  };

  const animateTo = value => {
    const element = sheetRef.current;
    if (!element) return;
    const target = Math.max(0, Math.min(PEEK_Y, value));
    const offset = readTranslateY(element);
    gesture.current = null;
    element.classList.add('is-dragging');
    setY(element, offset);
    void element.offsetHeight;
    element.classList.remove('is-dragging');
    element.style.transition = reduced ? 'none' : '';
    void element.offsetHeight;
    targetY.current = target;
    setY(element, target);
  };

  const settle = nextExpanded => {
    const target = nextExpanded ? 0 : PEEK_Y;
    expandedRef.current = nextExpanded;
    targetY.current = target;
    onExpandedChange(nextExpanded);
    animateTo(target);
  };

  const startGesture = (kind, clientY) => {
    const element = sheetRef.current;
    if (!element) return;
    const offset = readTranslateY(element);
    element.style.transition = 'none';
    element.classList.add('is-dragging');
    setY(element, offset);
    const bounds = element.getBoundingClientRect();
    gesture.current = {
      kind,
      startY: clientY,
      lastY: clientY,
      lastAt: performance.now(),
      velocity: 0,
      startOffset: offset,
      scale: bounds.height / (element.offsetHeight || bounds.height) || 1,
    };
  };

  const moveGesture = (kind, clientY) => {
    const active = gesture.current;
    const element = sheetRef.current;
    if (!active || active.kind !== kind || !element) return;
    const now = performance.now();
    const localY = clientY / active.scale;
    const previousLocalY = active.lastY / active.scale;
    active.velocity = (localY - previousLocalY) / Math.max(1, now - active.lastAt) * 1000;
    active.lastY = clientY;
    active.lastAt = now;
    setY(element, active.startOffset + (clientY - active.startY) / active.scale);
  };

  const endGesture = kind => {
    const active = gesture.current;
    if (!active || active.kind !== kind) return;
    const distance = (active.lastY - active.startY) / active.scale;
    const nextExpanded = distance < -58 || active.velocity < -430
      ? true
      : distance > 58 || active.velocity > 430
        ? false
        : expandedRef.current;
    settle(nextExpanded);
  };

  useLayoutEffect(() => {
    const element = sheetRef.current;
    if (!element) return;
    const target = expanded ? 0 : PEEK_Y;
    if (!initialized.current) {
      element.classList.add('is-dragging');
      setY(element, target);
      void element.offsetHeight;
      element.classList.remove('is-dragging');
      targetY.current = target;
      initialized.current = true;
    } else if (targetY.current !== target) {
      animateTo(target);
    }
  }, [expanded, reduced]);

  const handlePointerDown = event => {
    // Touch input is handled from native touch events so dragging stays tied to the finger.
    if (event.pointerType === 'touch') return;
    startGesture('pointer', event.clientY);
    try { event.currentTarget.setPointerCapture(event.pointerId); } catch {}
  };

  const handleTouchStart = event => {
    if (event.touches.length !== 1) return;
    lastTouchAt.current = Date.now();
    startGesture('touch', event.touches[0].clientY);
  };

  const handleKeyDown = event => {
    if (event.key === 'ArrowUp' || event.key === 'Home') {
      event.preventDefault();
      settle(true);
    } else if (event.key === 'ArrowDown' || event.key === 'End') {
      event.preventDefault();
      settle(false);
    }
  };

  return (
    <section ref={sheetRef} className="chat-expanded-sheet" role="region" aria-label="Chats">
      <button
        type="button"
        className="chat-sheet-handle"
        aria-label={expanded ? 'Drag down to show favorites' : 'Drag up to show all chats'}
        aria-expanded={expanded}
        onPointerDown={handlePointerDown}
        onPointerMove={event => moveGesture('pointer', event.clientY)}
        onPointerUp={() => endGesture('pointer')}
        onPointerCancel={() => endGesture('pointer')}
        onTouchStart={handleTouchStart}
        onTouchMove={event => {
          if (event.touches.length === 1) moveGesture('touch', event.touches[0].clientY);
        }}
        onTouchEnd={() => endGesture('touch')}
        onTouchCancel={() => endGesture('touch')}
        onKeyDown={handleKeyDown}
        onClick={event => {
          if (event.detail === 0 && Date.now() - lastTouchAt.current > 700) settle(!expandedRef.current);
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
    </section>
  );
}
