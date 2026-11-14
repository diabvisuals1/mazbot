import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { useApp } from '../context/ScreenContext.jsx';
import '../styles/cameras.css';

const Room360 = lazy(() => import('../components/Room360.jsx'));
const photos = { living: '/assets/living-room.png', entrance: '/assets/42188.png', kitchen: '/assets/0a6af.png', bedroom: '/assets/8ed18.png' };
function CameraIcon({ offline = false }) { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="13" height="12" rx="4"/><path d="m16 10 5-3v10l-5-3"/>{offline && <path d="m3 3 18 18"/>}</svg>; }
function PlayIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.6c0-1 1.1-1.6 1.9-1.1l10 6.4c.8.5.8 1.7 0 2.2l-10 6.4A1.3 1.3 0 0 1 8 18.4Z"/></svg>; }

export default function CamerasPage() {
  const app = useApp(), { workflow } = app, navigate = useNavigate(), reduced = useReducedMotion();
  const devices = workflow.devices || [], [params, setParams] = useSearchParams(), route = useParams();
  const [recheck, setRecheck] = useState(false), [checked, setChecked] = useState(false);
  const timer = useRef(null), mainRef = useRef(null);
  const selectedId = params.get('room') || route.id;
  const selected = devices.find(device => device.id === selectedId);
  const online = devices.filter(device => device.online).length, offline = devices.length - online;
  const living = devices.find(device => device.id === 'living') || devices[0];
  const otherRooms = devices.filter(device => device.id !== living?.id);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    setChecked(false); setRecheck(false); clearTimeout(timer.current);
    const frame = requestAnimationFrame(() => mainRef.current?.closest('.app-scroll')?.scrollTo({ top: 0, behavior: 'instant' }));
    return () => cancelAnimationFrame(frame);
  }, [selectedId]);
  const choose = id => setParams({ room: id });
  const close = () => route.id ? navigate('/monitoring/cameras') : setParams({});
  const press = reduced ? undefined : { scale: .98 };
  return <main ref={mainRef} className="cameras-page">
    {selectedId ? <section className="camera-details" aria-label="Camera details">
      <button className="camera-return" onClick={close}><span aria-hidden="true">‹</span>All cameras</button>
      {selected ? <motion.div key={selected.id} initial={{ opacity: 0, y: reduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .22 }}>
        <div className="camera-detail-title"><div><span className="cameras-eyebrow">{selected.online ? 'LOOK AROUND' : 'CONNECTION HELP'}</span><h2>{selected.name}</h2></div><span className={'camera-status-pill' + (!selected.online ? ' is-offline' : '')}>{selected.online ? 'Online' : 'Offline'}</span></div>
        {selected.online ? <><Suspense fallback={<div className="camera-view-loading" role="status"><CameraIcon/><span>Preparing your room…</span></div>}><Room360 key={selected.id} room={selected.id} roomName={selected.name}/></Suspense><div className="camera-connection-row"><CameraIcon/><div><strong>Camera connected</strong><span>Sample device status · {selected.name}</span></div><i/></div><p className="camera-preview-note">A 3D recreation of your room design. Live footage will appear when your cameras are connected.</p></> : <div className="camera-offline"><span className="camera-offline-icon"><CameraIcon offline/></span><h3>Let’s get this camera back.</h3><p>{selected.name} is offline in your demo home. There is no preview available.</p><ol><li><span>1</span>Check that the camera has power.</li><li><span>2</span>Make sure it’s on your home Wi-Fi.</li><li><span>3</span>Restart the camera, then check again.</li></ol><button disabled={recheck} onClick={() => { setRecheck(true); setChecked(false); timer.current = setTimeout(() => { setRecheck(false); setChecked(true); }, 650); }}>{recheck ? 'Checking saved status…' : 'Check status again'}<span aria-hidden="true">↻</span></button>{checked && <p className="camera-recheck" role="status">Still offline in this demo. A live camera connection is needed to refresh its status.</p>}</div>}
        <button className="camera-detail-assistant" onClick={() => navigate('/flow/assistant')}>Ask your home assistant <span aria-hidden="true">↗</span></button>
      </motion.div> : <div className="cameras-empty"><CameraIcon/><h2>Room not found</h2><p>Choose one of your cameras to continue.</p></div>}
    </section> : <>
      <div className="camera-status-bar"><img src="/assets/9d2af.png" alt=""/><strong>{online} Cameras Online</strong><span className="camera-status-divider"/><button onClick={() => app.setModal('alerts')} aria-label={offline ? offline + ' offline cameras, view alerts' : 'View camera connection status'}><i className={offline ? 'offline' : ''}/>{offline ? offline + ' offline' : 'Connected'}</button></div>
      {living ? <motion.button className="camera-main-preview" whileTap={press} onClick={() => choose(living.id)} aria-label={living.name + (living.online ? ', open 360 design preview' : ', offline, view connection help')}><img src={photos[living.id] || photos.living} alt={living.name + ' design reference'}/><span className="camera-room-chip"><i className={!living.online ? 'offline' : ''}/>{living.name}</span><span className="camera-demo-chip">Design preview</span><span className="camera-play">{living.online ? <PlayIcon/> : <CameraIcon offline/>}</span></motion.button> : <div className="cameras-empty"><CameraIcon/><h2>No cameras yet</h2><p>Your connected rooms will appear here.</p></div>}
      <div className="camera-room-row">{otherRooms.map(device => <motion.button key={device.id} whileTap={press} className="camera-room-card" onClick={() => choose(device.id)} aria-label={device.name + (device.online ? ', online, open 360 design preview' : ', offline, view connection help')}><span className="camera-room-photo"><img src={photos[device.id] || photos.living} alt=""/><span className="camera-small-play">{device.online ? <PlayIcon/> : <CameraIcon offline/>}</span></span><strong><i className={!device.online ? 'offline' : ''}/>{device.name}</strong><span className={'camera-status-pill' + (!device.online ? ' is-offline' : '')}>{device.online ? 'Online' : 'Offline'}</span></motion.button>)}</div>
      <motion.button whileTap={press} className="camera-ai-insight" onClick={() => navigate('/flow/assistant')}><img src="/assets/05d09.png" alt=""/><span><strong>Your home, at a glance.</strong><small>{offline ? online + ' cameras online. Let’s check the other ' + offline + '.' : 'Your cameras are connected in this demo.'}</small><b>Ask AI <span aria-hidden="true">↗</span></b></span></motion.button>
      <div className="camera-quick-actions"><motion.button whileTap={press} onClick={() => app.setModal('alerts')}><img src="/assets/265f7.png" alt=""/><span>Recent Alerts</span>{offline > 0 && <i className="camera-alert-count">{offline}</i>}</motion.button><motion.button whileTap={press} onClick={() => app.setModal('settings')}><img src="/assets/c7808.png" alt=""/><span>Camera settings</span></motion.button></div>
      <p className="camera-demo-note">Demo home · Sample camera statuses</p>
    </>}
  </main>;
}
