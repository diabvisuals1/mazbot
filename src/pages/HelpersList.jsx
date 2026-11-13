import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useApp} from '../context/ScreenContext.jsx';
import {helperDirectory,matchesHelper} from '../data/workflow.js';
export default function HelpersList(){
 const app=useApp(),go=useNavigate();
 const all=[...helperDirectory,...app.workflow.team];
 const list=all.filter(h=>matchesHelper(h,app.filters));
 function select(h){app.setPerson(h.name);app.setHelperImage(h.image||'/assets/b2a63.png');app.setHelperPrice(h.price);app.setWorkflow(w=>({...w,selectedHelper:h,selectedBooking:null}));go('/helpers/profile')}
 return <section className="helpers-live"><header><h2>{app.service==='Cleaning'?'Cleaners':app.service+' helpers'}</h2><span>{list.length} helpers</span><button onClick={()=>go('/helpers/filters')} aria-label="Filter helpers">Filters</button></header><div className="helpers-live-list">{list.map(h=><article key={h.id} className="helper-live-card"><img className="helper-live-photo" src={h.image||'/assets/b2a63.png'} alt={h.name}/><div><h3>{h.name}</h3><p>{h.services.join(' ¡¤ ')}</p><strong>EGP {h.price} <small>/ day</small></strong><span className="helper-live-rating">¡ï {h.rating||'New'}</span><button className="helper-live-profile" onClick={()=>select(h)}>View profile ¡ú</button></div><button className="helper-live-save" aria-label={`Save ${h.name}`} aria-pressed={app.saved.includes(h.id)} onClick={()=>app.setSaved(v=>v.includes(h.id)?v.filter(id=>id!==h.id):[...v,h.id])}>{app.saved.includes(h.id)?'?':'?'}</button></article>)}</div>{!list.length&&<div className="helpers-live-empty"><h3>No helpers match these filters</h3><p>Adjust your filters to see more helpers.</p><button onClick={()=>go('/helpers/filters')}>Adjust filters</button></div>}</section>
}
