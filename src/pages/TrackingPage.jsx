import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/ScreenContext.jsx';
import { getMonitoringVisit } from '../data/monitoring.js';
import '../styles/tracking.css';

function Icon({ name, ...props }) {
  const paths = {
    chat: <><path d="M20 11a8 8 0 0 1-8 8H5l-3 2V11a9 9 0 0 1 18 0Z"/><path d="M7 9h8m-8 4h5"/></>,
    call: <path d="M7.2 3H4.5A1.5 1.5 0 0 0 3 4.6 17.6 17.6 0 0 0 16.5 21H19a2 2 0 0 0 2-2v-2.2l-4.7-2-2 2a14 14 0 0 1-7.1-7.1l2-2L7.2 3Z"/>,
    issue: <><path d="m12 3 10 18H2L12 3Z"/><path d="M12 9v5m0 3v.1"/></>,
    check: <path d="m6 12 4 4 8-8"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></>,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5"/>,
  };
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}

export default function TrackingPage() {
  const app = useApp(), go = useNavigate(), reduced = useReducedMotion();
  const visit = getMonitoringVisit(app);
  const demoSteps = ['Booking confirmed', 'On the way', 'Arrived', 'Service started', 'Service completed'];
  const savedSteps = ['Request sent', 'Helper accepted', 'Visit confirmed', 'Service started', 'Service completed'];
  const steps = visit.isDemo ? demoSteps : savedSteps;
  const tap = reduced ? undefined : { scale: .97 };
  const selectHelper = () => {
    app.setPerson(visit.helperName);
    app.setHelperImage(visit.image);
    app.setWorkflow(current => ({ ...current, selectedBooking: visit.bookingId }));
  };
  const chat = () => app.act({ action: 'chat', person: visit.helperName, bookingId: visit.bookingId });
  const showModal = name => { selectHelper(); app.setModal(name); };
  const ask = () => go('/flow/assistant', { state: { prompt: visit.isDemo ? 'What is my helper doing?' : `What is the status of my booking with ${visit.helperName}?` } });
  const roomOnline = app.workflow.devices?.find(device => device.id === visit.roomId)?.online;

  return <main className="tracking-page" aria-label="Service tracking">
    <section className="tracking-visit-card" aria-label={`${visit.service} with ${visit.helperName}`}>
      <img className="tracking-helper-photo" src={visit.image} alt={visit.helperName}/>
      <div className="tracking-visit-copy"><h2>{visit.service}</h2><span className={'tracking-status' + (visit.progressIndex < 0 ? ' is-paused' : '')}><i/>{visit.status}</span><p>{visit.startLabel} – {visit.endLabel}</p><small>{visit.helperName}</small></div>
      <img className="tracking-spray" src="/assets/4d9d1.png" alt=""/>
    </section>

    <section className="tracking-progress-card" aria-label="Service progress">
      <div className="tracking-progress-heading"><h2>Service Progress</h2></div>
      <div className="tracking-progress-body">
        <ol className="tracking-timeline">{steps.map((label, i) => <li key={label} className={i < visit.progressIndex ? 'is-done' : i === visit.progressIndex ? 'is-current' : 'is-upcoming'} aria-current={i === visit.progressIndex ? 'step' : undefined}><span className="tracking-step-dot">{i < visit.progressIndex || (i === 4 && visit.progressIndex === 4) ? <Icon name="check"/> : i === visit.progressIndex ? <span/> : null}</span><span>{label}</span></li>)}</ol>
        <motion.button className="tracking-room-vignette" whileTap={tap} aria-label="Explore the living room in 360 degrees" onClick={() => go('/monitoring/cameras?room=' + visit.roomId)}><img src="/assets/15e62.png" alt="3D living room with an orange sofa, plant and floor lamp"/><span>Explore room <Icon name="arrow"/></span></motion.button>
      </div>
    </section>

    <motion.button className="tracking-home-card" whileTap={tap} onClick={() => go('/monitoring/cameras?room=' + visit.roomId)}>
      <svg className="tracking-location-pin" width="23" height="23" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a8 8 0 0 0-8 8c0 5 8 12 8 12s8-7 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/></svg><span className="tracking-home-copy"><strong>At your home</strong><span className="tracking-room-chip"><i className={roomOnline ? '' : 'is-offline'}/>{visit.isDemo ? `${visit.roomName} ${roomOnline ? 'active' : 'offline'}` : 'Explore your room'}<Icon name="arrow"/></span></span><img src="/assets/948ba.png" alt=""/>
    </motion.button>

    <section className="tracking-actions" aria-label="Contact your helper"><motion.button whileTap={tap} onClick={chat}><Icon name="chat"/><span>Chat</span></motion.button><motion.button whileTap={tap} onClick={() => showModal('call')}><Icon name="call"/><span>Call</span></motion.button><motion.button whileTap={tap} onClick={() => showModal('issue')}><Icon name="issue"/><span>Report issue</span></motion.button></section>

    <motion.button className="tracking-ai-card" whileTap={tap} onClick={ask} aria-label="Ask Mazbot about this visit"><img src="/assets/05d09.png" alt=""/><span className="tracking-insight-copy"><span><Icon name="clock"/>{visit.isDemo ? `Cleaner arrived at ${visit.startLabel}` : `${visit.dateLabel ? visit.dateLabel + ' · ' : ''}Scheduled start: ${visit.startLabel}`}</span><span><Icon name="check"/>{visit.isDemo ? `Estimated completion: ${visit.endLabel}` : `Planned end: ${visit.endLabel}`}</span></span><Icon name="arrow"/></motion.button>
  </main>;
}
