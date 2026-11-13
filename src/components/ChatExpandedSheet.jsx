import React,{useState} from 'react';
import {motion,useDragControls,useReducedMotion} from 'motion/react';
import {BrandIcon} from './BrandVisual.jsx';
const chats=[
 {name:'Souad Ibrahim',service:'Housekeeper · Cook',status:'Online',time:'12:42 PM',image:'b2a63.png'},
 {name:'Fatma EL-Sayed',service:'Housekeeper · Cook',status:'Online',time:'9:25 PM',image:'e91be.png'},
 {name:'Shaimaa Ali',service:'Housekeeper · Cook',status:'Offline',time:'29/5/2025',image:'6a1c3.png'},
 {name:'Amal Mostafa',service:'Housekeeper · Cook',status:'Online',time:'27/5/2025',image:'8526c.png'},
 {name:'Eman Ragab',service:'Nanny',status:'Offline',time:'26/5/2025',image:'6ceb4.png'},
 {name:'Hoda Mahmoud',service:'Elderly care · Nursing',status:'Online',time:'22/5/2025',image:'867ad.png'},
];
const unreadCount=(app,name)=>Object.entries(app.chatMeta?.unread||{}).find(([person])=>person.toLowerCase()===name.toLowerCase())?.[1]||0;
export default function ChatExpandedSheet({app,onClose}){
 const [query,setQuery]=useState(''),controls=useDragControls(),reduced=useReducedMotion();
 const visible=chats.filter(chat=>chat.name.toLowerCase().includes(query.toLowerCase()));
 return <motion.section className="chat-expanded-sheet" role="region" aria-label="Chats" drag="y" dragListener={false} dragControls={controls} dragConstraints={{top:0,bottom:192}} dragElastic={.08} onDragEnd={(_,info)=>{if(info.offset.y>92||info.velocity.y>650)onClose()}} initial={reduced?false:{y:192}} animate={{y:0}} exit={reduced?{y:192}:{y:192,transition:{duration:.24,ease:[.4,0,1,1]}}} transition={reduced?{duration:0}:{duration:.34,ease:[.22,1,.36,1]}}>
  <div className="chat-sheet-handle" onPointerDown={e=>controls.start(e)}><span/><button aria-label="Close full chat list" onPointerDown={e=>e.stopPropagation()} onClick={onClose}><span/></button></div>
  <label className="chat-sheet-search"><span aria-hidden="true">⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search chats" aria-label="Search chats"/><span aria-hidden="true">☷</span></label>
  <div className="chat-sheet-list">{visible.map(chat=><button key={chat.name} className="chat-sheet-row" onClick={()=>app.act({action:'chat',label:'Chat with '+chat.name,person:chat.name},chat.name,true)}><img src={'/assets/'+chat.image} alt=""/><span className="chat-sheet-details"><strong>{chat.name}</strong><small>{chat.service}</small></span><span className="chat-sheet-meta"><b className={chat.status==='Online'?'online':'offline'}>{chat.status}</b>{unreadCount(app,chat.name)>0&&<small className="chat-sheet-unread">{unreadCount(app,chat.name)} new</small>}<small>{chat.time}</small></span><BrandIcon name="chevron"/></button>)}{!visible.length&&<p className="chat-sheet-empty">No chats match that name.</p>}</div>
 </motion.section>;
}
