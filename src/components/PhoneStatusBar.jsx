import React,{useEffect,useState} from 'react';
export default function PhoneStatusBar(){
 const [now,setNow]=useState(()=>new Date());
 useEffect(()=>{const timer=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(timer)},[]);
 return <div className="phone-status" aria-label="Phone status preview"><time>{now.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}</time><div className="phone-status-icons" aria-label="Full signal, Wi-Fi, battery preview">
 <svg width="17" height="12" viewBox="0 0 17 12" aria-hidden="true" fill="currentColor"><rect y="8" width="3" height="4" rx=".7"/><rect x="4.5" y="5.5" width="3" height="6.5" rx=".7"/><rect x="9" y="3" width="3" height="9" rx=".7"/><rect x="13.5" width="3" height="12" rx=".7"/></svg>
 <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M1 3a11 11 0 0 1 14 0M3.6 5.8a7 7 0 0 1 8.8 0M6.2 8.5a3 3 0 0 1 3.6 0"/><circle cx="8" cy="11" r=".8" fill="currentColor" stroke="none"/></svg>
 <svg width="25" height="12" viewBox="0 0 25 12" aria-hidden="true"><rect x=".5" y=".5" width="21" height="11" rx="2.5" fill="none" stroke="currentColor" opacity=".55"/><rect x="2.5" y="2.5" width="17" height="7" rx="1" fill="currentColor"/><path d="M23 4v4q2-1 0-4" fill="currentColor" opacity=".55"/></svg>
 </div></div>;
}
