import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/ScreenContext.jsx";
import "../styles/helper-profile.css";
export default function HelperProfile() {
 const app=useApp(), navigate=useNavigate();
 const [detail,setDetail]=useState(null);
 const reduced=useReducedMotion();
 const helper=app.workflow.selectedHelper;
 const key=helper?.id||'helper:'+app.person, saved=app.saved.includes(key);
 const rows=[['Services',helper?.services?.join(', ')||app.service,'✦'],['Availability','Sun – Thu, 9:00 AM – 5:00 PM','▦'],['Languages','Arabic, basic English','A'],['Location',helper?.location||'Giza, Egypt','⌖']];
 return <main className="hp">
 <header className="hp-header"><div className="hp-status"><span>9:41</span><img src="/assets/a4ec7.svg" alt=""/></div><div className="hp-title"><button aria-label="Go back" onClick={()=>navigate('/helpers')}>‹</button><h1>Helper Profile</h1><motion.button whileTap={reduced?undefined:{scale:1.2}} aria-pressed={saved} aria-label={saved?'Unsave helper':'Save helper'} onClick={()=>app.setSaved(saved?app.saved.filter(x=>x!==key):[...app.saved,key])}>{saved?'♥':'♡'}</motion.button><button aria-label="Profile options" onClick={()=>setDetail(detail==='options'?null:'options')}>⋮</button></div></header>
 <div className="hp-content"><section className="hp-hero"><img className="hp-avatar" src={app.helperImage} alt={app.person}/><div className="hp-bio"><h2>{app.person}</h2><p>{app.service} <b>{helper?.rating||'New'} <i>★</i></b></p><small>Reliable, neat, and always on time.</small><div className="hp-stats"><div><em>▣</em><strong>{helper?.jobs||0}<small>Jobs</small></strong></div><div><em>▦</em><strong>{helper?.experience||0}<small>Years</small></strong></div></div></div></section>
 <h2 className="hp-section">Quick Actions</h2><div className="hp-actions"><button onClick={()=>navigate('/booking')}><img src="/assets/a362e.png" alt=""/><span><strong>Book now</strong><small>Hire this helper</small></span><b>›</b></button><button onClick={()=>navigate('/chats/conversation')}><img src="/assets/ce296.png" alt=""/><span><strong>Chat</strong><small>Ask about details</small></span><b>›</b></button></div>
 <h2 className="hp-section">Details</h2><div className="hp-list">{rows.map(([title,text,icon])=><button key={title} onClick={()=>setDetail(detail===title?null:title)} aria-expanded={detail===title}><span className="hp-icon">{icon}</span><span><strong>{title}</strong><small>{text}</small><AnimatePresence initial={false}>{detail===title&&<motion.small initial={reduced?false:{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={reduced?{}:{height:0,opacity:0}} className="hp-expanded">{title==='Services'?`EGP ${app.helperPrice} per day`:text}</motion.small>}</AnimatePresence></span><b>›</b></button>)}</div>
 <h2 className="hp-section">Trust &amp; Reviews</h2><div className="hp-list">{[['Customer Reviews','Read recent feedback','★','reviews'],['Background Check','Verified documents and profile','✓','checks']].map(([title,text,icon,modal])=><button key={title} onClick={()=>app.setModal(modal)}><span className="hp-icon">{icon}</span><span><strong>{title}</strong><small>{text}</small></span><b>›</b></button>)}</div>
 {detail==='options'&&<div className="hp-list"><button onClick={()=>app.setModal('issue')}>Report an issue <b>›</b></button></div>}
 <button className="hp-book" onClick={()=>navigate('/booking')}>Request booking <span>→</span></button></div></main>;
}
