import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useApp} from '../context/ScreenContext.jsx';
import {topHelpers} from '../data/workflow.js';
import '../styles/helper-profile.css';
export function HelperCard({helper:h}){
 const app=useApp(),go=useNavigate();
 function open(){const service=h.services.includes(app.service)?app.service:h.services[0];app.setPerson(h.name);app.setHelperImage(h.image);app.setHelperPrice(h.price);app.setService(service);app.setWorkflow(w=>({...w,selectedHelper:h,selectedBooking:null}));go('/helpers/profile')}
 return <button className="helper-card" onClick={open} aria-label={'View '+h.name+' profile'}><img src={h.image||'/assets/b2a63.png'} alt=""/><span className="helper-card-body"><span className="helper-card-heading"><strong>{h.name}</strong><small>{h.active===false?'Unavailable':'Available'}</small></span><span className="helper-card-services">{h.services.join(' · ')}</span><span className="helper-card-meta"><span className="helper-card-rating">★ {h.rating||'New'}</span><span>{h.location||'Location to confirm'}</span><span>{h.experience||0} yrs</span><b aria-hidden="true">›</b></span></span></button>
}
export function TopHelpers(){return <div className="top-helper-cards" data-node-id="2051:2271">{topHelpers.map(h=><HelperCard key={h.id} helper={h}/>)}</div>}
