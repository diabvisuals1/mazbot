import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useApp } from '../context/ScreenContext.jsx';
import Dialog from '../components/Dialog.jsx';
import '../styles/monitoring.css';

function Icon({ name = 'arrow', ...props }) {
  const paths = { camera: <><rect x="3" y="6" width="13" height="12" rx="4"/><path d="m16 10 5-3v10l-5-3Z"/></>, arrow: <path d="M5 12h14m-5-5 5 5-5 5"/>, chat: <><path d="M20 11a8 8 0 0 1-8 8H5l-3 2V11a9 9 0 0 1 18 0Z"/><path d="M7 9h8m-8 4h5"/></>, spark: <path d="m12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7Z"/>, clock: <><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></>, wifi: <><path d="M3 8a14 14 0 0 1 18 0M6 12a9 9 0 0 1 12 0m-9 4a4 4 0 0 1 6 0"/><circle cx="12" cy="20" r=".5"/></>, person: <><circle cx="12" cy="8" r="3"/><path d="M6 20v-3a6 6 0 0 1 12 0v3"/></> };
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}
const positions = { living: [76, 43], kitchen: [28, 64], bedroom: [42, 26], entrance: [17, 45] };
export default function MonitoringPage() {
  const app = useApp(), go = useNavigate(), reduced = useReducedMotion();
  const devices = app.workflow.devices || [], online = devices.filter(d => d.online).length;
  const [selected, setSelected] = useState(null), [closing, setClosing] = useState(false), [activityOpen, setActivityOpen] = useState(false);
  const closeTimer = useRef();
  const camera = devices.find(d => d.id === selected?.room);
  const finishClose = () => { clearTimeout(closeTimer.current); setSelected(null); setClosing(false); };
  const close = () => { if (closing) return; setClosing(true); closeTimer.current = setTimeout(finishClose, reduced ? 0 : 360); };
  useEffect(() => () => clearTimeout(closeTimer.current), []);
  const show = (room, helper = false) => { clearTimeout(closeTimer.current); setClosing(false); setSelected({ room, helper }); };
  const openRoom = () => go('/monitoring/cameras?room=' + camera.id);
  const ask = () => go('/flow/assistant', { state: { prompt: selected?.helper ? 'What is my helper doing?' : `Tell me about the ${camera.name} camera.` } });
  const chat = () => app.act({ action: 'chat', person: 'Souad Ibrahim' });
  return <main className="monitor-home">
    <section className="monitor-map" aria-label="Interactive home map">
      <div className="monitor-map-title"><div><span className="monitor-eyebrow">A LITTLE CLOSER TO HOME</span><h2>{app.profile.name || 'Your'}’s home</h2></div><span className="monitor-demo">Demo home</span></div>
      <div className="monitor-house">
        <img className="monitor-house-art" src="/assets/0713a.png" alt="Your home layout with kitchen, bedroom and living room" draggable="false"/>
        {devices.map((d, i) => <button key={d.id} className={'monitor-pin ' + (d.online ? '' : 'is-offline')} style={{ left: (positions[d.id]?.[0] || 50) + '%', top: (positions[d.id]?.[1] || 50) + '%', '--pin-delay': `${i * -.65}s` }} aria-label={`${d.name} camera, ${d.online ? 'connected' : 'offline'}`} aria-haspopup="dialog" onClick={() => show(d.id)}><span className="monitor-pin-shape"><Icon name="camera"/></span><span className="monitor-pin-shadow"/></button>)}
        <button className="monitor-pin monitor-helper-pin" style={{ left: '59%', top: '57%', '--pin-delay': '-.4s' }} aria-label="Souad's activity in Living Room" aria-haspopup="dialog" onClick={() => show('living', true)}><span className="monitor-pin-shape"><Icon name="person"/></span><span className="monitor-pin-shadow"/></button>
      </div>
      <div className="monitor-map-legend"><span><i/>{online} connected</span><span><i className="offline"/>{devices.length - online} offline</span><span><i className="helper"/>Helper</span></div>
      <p className="monitor-map-hint">Tap a pin. See what’s happening.</p>
    </section>

    <div className="monitor-quick-grid">
      <motion.button whileTap={reduced ? undefined : { scale: .97 }} className="monitor-ai-card" onClick={() => go('/flow/assistant')}>
        <span className="monitor-eyebrow">YOUR HOME, EXPLAINED</span><img src="/assets/05d09.png" alt="Mazbot assistant"/><span className="monitor-ai-cta">Ask AI <span><Icon name="arrow"/></span></span>
      </motion.button>
      <section className="monitor-helper-card"><div className="monitor-helper-heading"><span className="monitor-eyebrow">HELPER ACTIVITY</span><span className="monitor-sample">Sample visit</span></div><div className="monitor-helper-identity"><img src="/assets/e91be.png" alt="Souad Ibrahim"/><div><h3>Souad Ibrahim</h3><p>Living Room</p></div></div><strong>Tidying up the<br/>living room</strong><button onClick={() => show('living', true)}>View activity <Icon name="arrow"/></button></section>
    </div>

    <motion.button whileTap={reduced ? undefined : { scale: .98 }} className="monitor-cameras-card" onClick={() => go('/monitoring/cameras')}>
      <div><span className="monitor-eyebrow">YOUR EYES AT HOME</span><h2>{online} cameras<br/>online<span className="monitor-online-dot"/></h2><p>{devices.length - online ? `${devices.length - online} needs attention` : 'All cameras connected'}</p><span className="monitor-camera-cta">View cameras <Icon name="arrow"/></span></div><img src="/assets/9d2af.png" alt=""/>
    </motion.button>

    <section className="monitor-activity-card"><button className="monitor-activity-toggle" aria-expanded={activityOpen} aria-controls="monitor-activity-log" onClick={() => setActivityOpen(v => !v)}><span className="monitor-activity-icon"><Icon name="clock"/></span><span><strong>Home activity</strong><small>Your visit, at a glance</small></span><span className={'monitor-activity-chevron ' + (activityOpen ? 'is-open' : '')}><Icon name="arrow"/></span></button><AnimatePresence initial={false}>{activityOpen && <motion.div id="monitor-activity-log" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:reduced?0:.22}} style={{overflow:'hidden'}}><ol className="monitor-timeline"><li><time>10:05</time><span><strong>Souad arrived</strong><small>Ready for today’s visit</small></span></li><li><time>10:12</time><span><strong>Kitchen complete</strong><small>Surfaces and counters tidied</small></span></li><li><time>10:30</time><span><strong>Living room in progress</strong><small>Tidying and dusting</small></span></li></ol><button className="monitor-chat-action" onClick={chat}><Icon name="chat"/>Message Souad<Icon name="arrow"/></button><p className="monitor-log-note">Sample activity · not a live tracking feed</p></motion.div>}</AnimatePresence></section>

    {selected && camera && createPortal(<div className="monitor-room-sheet"><Dialog title={selected.helper ? 'Helper activity' : camera.name} sheet closing={closing} onClose={close} onExited={finishClose}>
      <div className={'monitor-room-state ' + (camera.online ? '' : 'is-offline')}><Icon name="wifi"/><div><strong>{camera.online ? 'Camera connected' : 'Camera offline'}</strong><p>{camera.online ? 'Available in this demo home' : 'Check power and Wi-Fi to reconnect'}</p></div><span className="monitor-state-dot"/></div>
      {camera.id === 'living' ? <div className="monitor-room-helper"><img src="/assets/e91be.png" alt="Souad Ibrahim"/><div><span className="monitor-eyebrow">IN THIS ROOM</span><h3>Souad Ibrahim</h3><p>Tidying and dusting the living room</p><small>Arrived at 10:05 AM · sample activity</small></div></div> : <div className="monitor-room-empty"><Icon name="person"/><div><strong>{camera.online ? 'No helper activity in this room' : 'Room activity unavailable'}</strong><p>{camera.online ? 'Souad’s sample visit is in the Living Room.' : 'Activity cannot be checked while this camera is offline.'}</p></div></div>}
      <button className="monitor-sheet-primary" onClick={openRoom}>{camera.online ? 'Explore room in 360°' : 'Check this camera'}<Icon name="arrow"/></button><button className="monitor-sheet-secondary" onClick={ask}><Icon name="spark"/>Ask Mazbot about this room</button>
      <p className="monitor-log-note">Demo home · camera status and activity are simulated.</p>
    </Dialog></div>, document.querySelector('.device'))}
  </main>;
}
