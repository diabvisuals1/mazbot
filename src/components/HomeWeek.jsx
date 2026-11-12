import React from 'react';
import {motion,useReducedMotion} from 'motion/react';
import {localDate} from '../data/workflow.js';
export default function HomeWeek({selected,onSelect,bookings}){
 const reduced=useReducedMotion();
 return <div className="home-week" aria-label="Your week">{Array.from({length:7},(_,i)=>{const date=new Date();date.setDate(date.getDate()+i);const key=localDate(date),count=bookings.filter(b=>b.date===key&&!['Cancelled','Declined','Ended','Refunded'].includes(b.status)).length;return <motion.button type="button" key={key} whileTap={reduced?undefined:{scale:.94}} aria-pressed={selected===key} aria-label={date.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})+', '+count+' bookings'} onClick={()=>onSelect(key)}>{selected===key&&<motion.span className="week-selected" layoutId="week-selected" transition={{type:'spring',stiffness:400,damping:32}}/>}<span>{date.toLocaleDateString('en-GB',{weekday:'short'})}</span><strong>{date.getDate()}</strong></motion.button>})}</div>;
}
