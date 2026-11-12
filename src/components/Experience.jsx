import React, {useEffect, useRef, useState} from 'react';
import {animate, motion, useReducedMotion, AnimatePresence} from 'motion/react';
import {useLocation} from 'react-router-dom';
import {useApp} from '../context/ScreenContext.jsx';

const spring={type:'spring',stiffness:360,damping:26};
export function AnimatedNumber({value,prefix='',className=''}){
 const reduced=useReducedMotion(),previous=useRef(value),[display,setDisplay]=useState(value);
 useEffect(()=>{if(reduced){setDisplay(value);previous.current=value;return;}const animation=animate(previous.current,value,{duration:.32,onUpdate:v=>setDisplay(Math.round(v))});previous.current=value;return()=>animation.stop();},[value,reduced]);
 return <span className={'animated-number '+className} aria-label={prefix+value.toLocaleString()}>{prefix}{display.toLocaleString()}</span>;
}

// Artwork preserves the design. Feedback belongs to the control or state change.
export function LivingArt({children,className='',style,group=false}){
 return <div className={'living-art '+className} style={{...style,pointerEvents:group?'none':undefined}}>{children}</div>;
}

export default function Experience(){
 const {pathname}=useLocation(),app=useApp(),reduced=useReducedMotion();
 const [flight,setFlight]=useState(null),previousCart=useRef(app.cart.reduce((n,p)=>n+p.quantity,0));
 useEffect(()=>{
  const device=document.querySelector('.device');if(!device)return;
  const selector='[data-interactive],.hp button,.flow-service-grid button,.flow-role,.stepper button,.text-button,.auth-page a,.auth-page button,.chips button';
  const active=new Map();let origin=null;
  const down=e=>{if(reduced)return;const el=e.target.closest(selector);if(!el||el.disabled)return;origin={x:e.clientX,y:e.clientY};el.dataset.pressFeedback='true';active.get(el)?.stop();active.set(el,animate(el,{'--press-scale':.965},{duration:.09}));};
  const release=()=>{active.forEach((control,el)=>{control.stop();animate(el,{'--press-scale':1},spring)});active.clear();};
  const move=e=>{if(origin&&Math.hypot(e.clientX-origin.x,e.clientY-origin.y)>10){release();origin=null;}};
  device.addEventListener('pointermove',move);device.addEventListener('scroll',release,true);
  device.addEventListener('pointerdown',down);window.addEventListener('pointerup',release);window.addEventListener('pointercancel',release);
  return()=>{device.removeEventListener('pointermove',move);device.removeEventListener('scroll',release,true);device.removeEventListener('pointerdown',down);window.removeEventListener('pointerup',release);window.removeEventListener('pointercancel',release);active.forEach((a,el)=>{a.stop();el.style.removeProperty('--press-scale');});};
 },[pathname,reduced]);
 useEffect(()=>{
  const count=app.cart.reduce((n,p)=>n+p.quantity,0);
  if(count>previousCart.current&&!reduced){
   const target=document.querySelector('.cart-hotspot')||document.querySelector('.bottom-nav button:nth-child(2)');
   const device=document.querySelector('.device'),source=document.querySelector('[data-product-art]')||document.querySelector('.screen-canvas img[src="'+app.product.image+'"]');
   if(device&&target&&source){const a=source.getBoundingClientRect(),b=target.getBoundingClientRect(),d=device.getBoundingClientRect();setFlight({id:Date.now(),image:app.product.image,x:a.x-d.x+a.width/2-24,y:a.y-d.y+a.height/2-24,toX:b.x-d.x+b.width/2-24,toY:b.y-d.y+b.height/2-24});}
   if(target)animate(target,{scale:[1,1.18,1]},{duration:.4,delay:.3});
  }
  previousCart.current=count;
 },[app.cart,app.product.image,reduced]);
 return <AnimatePresence>{flight&&<motion.img key={flight.id} className="cart-flight" src={flight.image} alt="" initial={{x:flight.x,y:flight.y,opacity:1,scale:1}} animate={{x:flight.toX,y:flight.toY,opacity:[1,1,0],scale:.25}} transition={{duration:.65,ease:[.22,1,.36,1]}} onAnimationComplete={()=>setFlight(null)}/>}</AnimatePresence>;
}
