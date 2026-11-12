import React from 'react';
import {motion,useReducedMotion} from 'motion/react';
import {useNavigate} from 'react-router-dom';
import {BrandVisual,BrandIcon} from './BrandVisual.jsx';
import {Button} from './Primitives.jsx';
export default function NotificationScreen({app,onClose}){
 const go=useNavigate(),reduced=useReducedMotion();
 const items=[...app.bookings.slice(-5).reverse().map(b=>({key:'booking-'+b.id,title:`${b.service} · ${b.status}`,detail:`${b.helper||app.person} · ${b.date||'Booking update'}`,to:'/flow/bookings/'+b.id,visual:'booking'})),...app.workflow.orders.slice(-4).reverse().map(o=>({key:'order-'+o.id,title:`Order ${o.status}`,detail:'Your store order has an update',to:'/orders/'+o.id,visual:'order'}))];
 return <motion.div className="notification-content" initial={reduced?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:.22,delay:reduced?0:.12}}>{items.length?<><p className="notification-section-title">Recent activity</p><div className="notification-list">{items.map(item=><button className="notification-item" key={item.key} onClick={()=>{onClose();go(item.to)}}><BrandVisual context={item.visual}/><span><strong>{item.title}</strong><small>{item.detail}</small></span><BrandIcon name="chevron"/></button>)}</div></>:<div className="notification-empty"><BrandVisual context="notifications"/><h2>You're all caught up</h2><p>Booking and order updates will show here.</p><Button secondary onClick={onClose}>Back to MAZBOT</Button></div>}</motion.div>;
}
