import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/ScreenContext.jsx';
import '../styles/assistant-chat.css';
import { getAssistantReply, restoreAssistantMessages } from '../data/assistant.js';

const STORAGE = 'mazbot:home-assistant-chat:v1';
const MASCOT = '/assets/05d09.png';
const suggestions = [
  { icon: 'spark', title: 'Home check-in', question: 'Give me a home check-in', tone: 'mint' },
  { icon: 'helper', title: 'Helper update', question: 'What is my helper doing?', tone: 'peach' },
  { icon: 'camera', title: 'Camera status', question: 'Are all my cameras connected?', tone: 'white' },
  { icon: 'heart', title: 'Find my match', question: 'Help me find the right helper', tone: 'white' },
];

function Icon({ name, ...props }) {
  const paths = {
    spark: <><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/><path d="m20 3 .5 1.5L22 5l-1.5.5L20 7l-.5-1.5L18 5l1.5-.5L20 3Z"/></>,
    camera: <><rect x="3" y="6" width="18" height="14" rx="4"/><circle cx="12" cy="13" r="3"/><path d="m8 6 1-3h6l1 3"/></>,
    helper: <><circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2M9 16l3 3 3-3"/></>,
    heart: <path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5"/>,
    send: <path d="m12 20 0-16m-7 7 7-7 7 7"/>,
    reset: <><path d="M3 10a9 9 0 1 1 2 9M3 4v6h6"/></>,
    close: <path d="m6 6 12 12M6 18 18 6"/>,
  };
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.spark}</svg>;
}

function readMessages(app) {
  try { return restoreAssistantMessages(JSON.parse(localStorage.getItem(STORAGE)), app); }
  catch { return []; }
}

export default function AssistantChat() {
  const app = useApp(), navigate = useNavigate(), location = useLocation(), reduced = useReducedMotion();
  const [messages, setMessages] = useState(() => {
    const saved = readMessages(app), pending = saved.at(-1);
    // Complete a local reply if navigation interrupted its presentation delay.
    return pending?.role === 'user' ? [...saved, { id: pending.id + '-reply', role: 'assistant', ...getAssistantReply(pending.text, app) }].slice(-40) : saved;
  });
  const [draft, setDraft] = useState(() => typeof location.state?.prompt === 'string' ? location.state.prompt.slice(0, 600) : '');
  const [thinking, setThinking] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [showLatest, setShowLatest] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const listRef = useRef(null), fieldRef = useRef(null), timerRef = useRef(null), clearRef = useRef(null), cancelRef = useRef(null), busyRef = useRef(false), dialogWasOpen = useRef(false);
  const devices = app.workflow.devices || [], online = devices.filter(d => d.online).length;

  useEffect(() => { try { localStorage.setItem(STORAGE, JSON.stringify(messages)); } catch {} }, [messages]);
  useEffect(() => { if (typeof location.state?.prompt === 'string') setDraft(location.state.prompt.slice(0, 600)); }, [location.key]);
  useEffect(() => () => { clearTimeout(timerRef.current); busyRef.current = false; }, []);
  useEffect(() => {
    const field = fieldRef.current, device = field?.closest('.device'), viewport = window.visualViewport;
    if (!field || !device || !viewport) return;
    let frame;
    const measureKeyboard = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = device.getBoundingClientRect();
        const designScale = bounds.width / 375;
        const overlap = designScale > 0 ? (bounds.bottom - viewport.height - viewport.offsetTop) / designScale : 0;
        const covered = document.activeElement === field && overlap > 50;
        if (covered) device.style.setProperty('--assistant-keyboard-inset', `${Math.max(20, Math.ceil(overlap + 12))}px`);
        else device.style.removeProperty('--assistant-keyboard-inset');
        setKeyboardOpen(covered);
      });
    };
    field.addEventListener('focus', measureKeyboard);
    field.addEventListener('blur', measureKeyboard);
    viewport.addEventListener('resize', measureKeyboard);
    viewport.addEventListener('scroll', measureKeyboard);
    window.addEventListener('resize', measureKeyboard);
    measureKeyboard();
    return () => {
      cancelAnimationFrame(frame);
      field.removeEventListener('focus', measureKeyboard);
      field.removeEventListener('blur', measureKeyboard);
      viewport.removeEventListener('resize', measureKeyboard);
      viewport.removeEventListener('scroll', measureKeyboard);
      window.removeEventListener('resize', measureKeyboard);
      device.style.removeProperty('--assistant-keyboard-inset');
    };
  }, []);
  useEffect(() => {
    if (confirmClear) { dialogWasOpen.current = true; cancelRef.current?.focus(); }
    else if (dialogWasOpen.current) { dialogWasOpen.current = false; (messages.length ? clearRef : fieldRef).current?.focus(); }
  }, [confirmClear, messages.length]);
  useEffect(() => {
    const field = fieldRef.current;
    if (field) { field.style.height = '24px'; field.style.height = `${Math.min(76, field.scrollHeight)}px`; }
  }, [draft]);
  useEffect(() => {
    const list = listRef.current;
    if (list && (!showLatest || messages.at(-1)?.role === 'user')) list.scrollTo({ top: list.scrollHeight, behavior: reduced ? 'instant' : 'smooth' });
  }, [messages, thinking, reduced]);

  function send(text = draft) {
    const question = text.trim().slice(0, 600);
    if (!question || busyRef.current) return;
    busyRef.current = true;
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setMessages(old => [...old, { id, role: 'user', text: question }].slice(-40));
    setDraft(''); setThinking(true); setShowLatest(false);
    timerRef.current = setTimeout(() => {
      setMessages(old => [...old, { id: id + '-reply', role: 'assistant', ...getAssistantReply(question, app) }].slice(-40));
      setThinking(false); busyRef.current = false;
    }, reduced ? 200 : 650);
  }
  function dismissClear() { setConfirmClear(false); }
  function clearChat() { clearTimeout(timerRef.current); busyRef.current = false; setThinking(false); setMessages([]); setShowLatest(false); setDraft(''); dismissClear(); }

  return <main className="assistant-chat" data-keyboard-open={keyboardOpen ? 'true' : undefined} aria-label="Mazbot home assistant">
    <div className="assistant-toolbar" inert={confirmClear} aria-hidden={confirmClear || undefined}><span className="assistant-identity"><Icon name="spark" width="12" height="12"/>Mazbot AI</span><span className="assistant-private">Just you & Mazbot</span><button ref={clearRef} type="button" aria-label="Start a new conversation" disabled={!messages.length} onClick={() => setConfirmClear(true)}><Icon name="reset"/></button></div>
    <div className="assistant-transcript" inert={confirmClear} aria-hidden={confirmClear || undefined} ref={listRef} onScroll={e => { const el = e.currentTarget; setShowLatest(el.scrollHeight - el.scrollTop - el.clientHeight > 100); }}>
      {messages.length === 0 ? <div className="assistant-welcome">
        <section className="assistant-intro"><div className="assistant-intro-copy"><span>YOUR HOME, IN THE KNOW</span><h2>A little peace<br/>of mind.</h2><p>Ask away.<br/>I’m here for your home.</p></div><div className="assistant-mascot-halo" aria-hidden="true"/><motion.img className="assistant-mascot" src={MASCOT} alt="Mazbot, your friendly home assistant" animate={reduced ? {} : { y: [0, -5, 0], rotate: [0, -2, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}/><span className="assistant-spark" aria-hidden="true">✦</span></section>
        <button className="assistant-home-context" onClick={() => send('Give me a home check-in')}><span className="assistant-context-icon"><Icon name="camera"/></span><span><strong>Your home, at a glance</strong><small>{online} of {devices.length} cameras online <span>·</span> Your home</small></span><Icon name="arrow"/></button>
        <div className="assistant-suggestion-heading"><h3>Where shall we start?</h3><span>Made for your day</span></div>
        <div className="assistant-suggestions">{suggestions.map(item => <motion.button key={item.title} className={'assistant-suggestion ' + item.tone} whileTap={reduced ? undefined : { scale: .97 }} onClick={() => send(item.question)}><Icon name={item.icon}/><span>{item.title}</span><Icon name="arrow" width="16" height="16"/></motion.button>)}</div>
      </div> : <>
        <p className="assistant-conversation-date">Your home conversation</p>
        <div className="assistant-message-list" role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions">
          {messages.map(message => <motion.article key={message.id} className={'assistant-message is-' + message.role} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .22 }}>
            {message.role === 'assistant' && <div className="assistant-author"><img src={MASCOT} alt=""/><span>Mazbot <small>YOUR HOME COMPANION</small></span></div>}
            <div className="assistant-bubble">{message.role === 'assistant' && message.tag && <span className="assistant-answer-label"><Icon name="spark" width="13" height="13"/>{message.tag}</span>}<p dir="auto">{message.text}</p></div>
            {!!message.actions?.length && <div className="assistant-answer-actions">{message.actions.map(action => <button key={action.to} onClick={() => navigate(action.to)}><span className="assistant-action-icon"><Icon name={action.icon}/></span><span><strong>{action.label}</strong><small>{action.detail}</small></span><Icon name="arrow" width="17" height="17"/></button>)}</div>}
          </motion.article>)}
          {thinking && <div className="assistant-thinking" role="status"><img src={MASCOT} alt=""/><span>Putting it together<span className="assistant-thinking-dots"><i/><i/><i/></span></span></div>}
        </div>
        {!thinking && <div className="assistant-followups" aria-label="Suggested follow-up questions">{suggestions.slice(0, 3).map(item => <button key={item.title} onClick={() => send(item.question)}><Icon name={item.icon} width="14" height="14"/>{item.title}</button>)}</div>}
      </>}
    </div>
    {showLatest && messages.length > 0 && <button className="assistant-latest" inert={confirmClear} aria-hidden={confirmClear || undefined} onClick={() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduced ? 'instant' : 'smooth' }); setShowLatest(false); }}>Latest message <span>↓</span></button>}
    <form className="assistant-composer" inert={confirmClear} aria-hidden={confirmClear || undefined} onSubmit={e => { e.preventDefault(); send(); }}><div className="assistant-input-wrap"><textarea ref={fieldRef} aria-label="Message Mazbot" placeholder="Ask me about your home…" value={draft} maxLength={600} rows={1} enterKeyHint="send" onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); send(); } }} /><motion.button type="submit" aria-label={thinking ? 'Preparing answer' : 'Send message'} disabled={!draft.trim() || thinking} whileTap={reduced ? undefined : { scale: .9 }}><Icon name="send"/></motion.button></div>{draft.length > 500 && <span className="assistant-character-count">{draft.length}/600</span>}</form>
    <AnimatePresence>{confirmClear && <motion.div className="assistant-confirm-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={dismissClear}><section role="alertdialog" aria-modal="true" aria-labelledby="assistant-reset-title" aria-describedby="assistant-reset-description" className="assistant-confirm" onClick={e => e.stopPropagation()} onKeyDown={e => { if (e.key === 'Escape') { e.preventDefault(); dismissClear(); } if (e.key === 'Tab') { const buttons = [...e.currentTarget.querySelectorAll('button')]; const current = buttons.indexOf(document.activeElement); e.preventDefault(); buttons[(current + (e.shiftKey ? buttons.length - 1 : 1)) % buttons.length]?.focus(); } }}><img src={MASCOT} alt=""/><h2 id="assistant-reset-title">A fresh conversation?</h2><p id="assistant-reset-description">This conversation will be cleared. Ready for a fresh start?</p><button onClick={clearChat}>Start fresh <Icon name="spark"/></button><button ref={cancelRef} className="assistant-confirm-cancel" onClick={dismissClear}>Keep this conversation</button></section></motion.div>}</AnimatePresence>
  </main>;
}
