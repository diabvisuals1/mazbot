import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { useApp } from '../context/ScreenContext.jsx';
import '../styles/cameras.css';

const Room360 = lazy(() => import('../components/Room360.jsx'));
function CameraIcon({ offline = false }) { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="13" height="12" rx="4"/><path d="m16 10 5-3v10l-5-3"/>{offline && <path d="m3 3 18 18"/>}</svg>; }
const roomDetails = { living: { label: 'Your everyday space', color: 'mint', icon: 'sofa' }, kitchen: { label: 'At the heart of home', color: 'peach', icon: 'kitchen' }, entrance: { label: 'Every hello, covered', color: 'sand', icon: 'door' }, bedroom: { label: 'Your quiet corner', color: 'mint', icon: 'bed' } };
function RoomArt({ kind }) { return <svg width="64" height="55" viewBox="0 0 64 55" fill="none" aria-hidden="true">{kind === 'sofa' ? <><rect x="12" y="16" width="40" height="24" rx="8" fill="#83a99c"/><rect x="8" y="27" width="48" height="17" rx="6" fill="#a1c0ae"/><rect x="8" y="26" width="8" height="17" rx="4" fill="#537c70"/><rect x="48" y="26" width="8" height="17" rx="4" fill="#537c70"/><path d="M15 44v5m34-5v5" stroke="#876c4f" strokeWidth="4"/><rect x="18" y="18" width="13" height="13" rx="4" fill="#ebdfc9"/></> : kind === 'kitchen' ? <><rect x="10" y="17" width="44" height="30" rx="3" fill="#b69c7e"/><rect x="8" y="16" width="48" height="5" rx="2" fill="#f7f0df"/><rect x="14" y="25" width="18" height="17" rx="2" fill="#315b59"/><path d="M38 26h10M39 32v9" stroke="#f5dfc3" strokeWidth="2" strokeLinecap="round"/><path d="M43 15v-5a4 4 0 0 1 8 0" stroke="#315b59" strokeWidth="3" strokeLinecap="round"/></> : kind === 'door' ? <><rect x="15" y="7" width="34" height="42" rx="3" fill="#c6aa87"/><rect x="20" y="12" width="24" height="37" rx="2" fill="#e1c6a2"/><rect x="24" y="16" width="16" height="21" rx="2" fill="#d4b58c"/><circle cx="39" cy="34" r="2" fill="#315b59"/><path d="M11 49h42" stroke="#8c785c" strokeWidth="3" strokeLinecap="round"/></> : <><rect x="10" y="18" width="44" height="24" rx="5" fill="#9bb4a5"/><rect x="8" y="29" width="48" height="17" rx="4" fill="#d6c4a5"/><rect x="12" y="23" width="18" height="11" rx="4" fill="#fff9eb"/><rect x="34" y="23" width="18" height="11" rx="4" fill="#fff9eb"/><rect x="10" y="33" width="44" height="9" rx="3" fill="#b7cbbc"/><path d="M13 45v5m38-5v5" stroke="#8c785c" strokeWidth="3"/></>}</svg>; }

export default function CamerasPage() {
  const { workflow } = useApp(), navigate = useNavigate(), reduced = useReducedMotion();
  const devices = workflow.devices || [], [params, setParams] = useSearchParams(), route = useParams();
  const [filter, setFilter] = useState('all'), [recheck, setRecheck] = useState(false), [checked, setChecked] = useState(false);
  const timer = useRef(null), detailRef = useRef(null);
  const selectedId = params.get('room') || route.id;
  const selected = devices.find(device => device.id === selectedId);
  const online = devices.filter(device => device.online).length, offline = devices.length - online;
  const shown = devices.filter(device => filter === 'all' || (filter === 'online' ? device.online : !device.online));
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => { setChecked(false); setRecheck(false); clearTimeout(timer.current); }, [selected?.id]);
  useEffect(() => {
    if (!selected) return;
    const frame = requestAnimationFrame(() => detailRef.current?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' }));
    return () => cancelAnimationFrame(frame);
  }, [selected?.id, reduced]);
  const choose = id => setParams({ room: id });
  return <main className="cameras-page">
    <div className="cameras-intro"><div><span className="cameras-eyebrow">A LITTLE CLOSER TO HOME</span><h2>Your home.<br/><em>Every angle.</em></h2></div><img src="/assets/9d2af.png" alt=""/></div>
    <div className="cameras-summary"><span><i/>{online} online</span><span className="is-offline"><i/>{offline} offline</span><small>Demo home</small></div>
    <div className="cameras-tabs" role="group" aria-label="Filter cameras">{[['all','All rooms',devices.length],['online','Online',online],['offline','Offline',offline]].map(([value, label, count]) => <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}<span>{count}</span></button>)}</div>
    <div className="camera-grid">{shown.map(device => {
      const detail = roomDetails[device.id] || roomDetails.living;
      return <motion.button key={device.id} whileTap={reduced ? undefined : { scale: .97 }} className={`camera-tile ${detail.color}${selected?.id === device.id ? ' selected' : ''}`} aria-pressed={selected?.id === device.id} aria-label={`${device.name}, ${device.online ? 'online, open 360 design preview' : 'offline, view connection help'}`} onClick={() => choose(device.id)}><span className={'camera-tile-status' + (!device.online ? ' is-offline' : '')}><i/>{device.online ? 'Online' : 'Offline'}</span><RoomArt kind={detail.icon}/><strong>{device.name}</strong><span className="camera-tile-link">{device.online ? 'Explore room' : 'Check connection'}<span aria-hidden="true">↗</span></span></motion.button>;
    })}</div>
    {!shown.length && <div className="cameras-empty"><CameraIcon/><h3>No {filter === 'all' ? '' : filter} cameras</h3><p>{filter === 'offline' ? 'All your preview devices are connected.' : 'Choose another filter to see your rooms.'}</p></div>}
    {selectedId && !selected && <div className="cameras-empty"><h3>Room not found</h3><button onClick={() => navigate('/monitoring/cameras')}>Back to your cameras</button></div>}
    <section ref={detailRef} className="camera-details" aria-label="Camera details">
      {selected ? <motion.div key={selected.id} initial={{ opacity: 0, y: reduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .22 }}><div className="camera-detail-title"><div><span className="cameras-eyebrow">{selected.online ? 'LOOK AROUND' : 'CONNECTION HELP'}</span><h3>{selected.name}</h3></div><button aria-label="Close camera details" onClick={() => route.id ? navigate('/monitoring/cameras') : setParams({})}><svg width="19" height="19" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div>
      {selected.online ? <><Suspense fallback={<div className="camera-view-loading" role="status"><CameraIcon/><span>Preparing your room…</span></div>}><Room360 key={selected.id} room={selected.id} roomName={selected.name}/></Suspense><div className="camera-connection-row"><CameraIcon/><div><strong>Camera connected</strong><span>Sample device status · {selected.name}</span></div><i/></div><p className="camera-preview-note">A 3D recreation of your room design. Live footage will appear when your cameras are connected.</p></> : <div className="camera-offline"><span className="camera-offline-icon"><CameraIcon offline/></span><h4>Let’s get this camera back.</h4><p>{selected.name} is offline in your demo home. There is no preview available.</p><ol><li><span>1</span>Check that the camera has power.</li><li><span>2</span>Make sure it’s on your home Wi-Fi.</li><li><span>3</span>Restart the camera, then check again.</li></ol><button disabled={recheck} onClick={() => { setRecheck(true); setChecked(false); timer.current = setTimeout(() => { setRecheck(false); setChecked(true); }, 650); }}>{recheck ? 'Checking saved status…' : 'Check status again'}<span aria-hidden="true">↻</span></button>{checked && <p className="camera-recheck" role="status">Still offline in this demo. A live camera connection is needed to refresh its status.</p>}</div>}
      </motion.div> : <div className="camera-select-hint"><span>↗</span><p><strong>Step inside your home.</strong>Choose an online camera to explore its 360° room design.</p></div>}
    </section>
    <button className="camera-assistant-link" onClick={() => navigate('/flow/assistant')}><span><strong>A question about your home?</strong><small>Let’s work it out together.</small></span><span>Ask AI ↗</span></button>
  </main>;
}
