import {HelperCard} from '../components/HelperCard.jsx';
import {AssistantEntry} from './BookingForm.jsx';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useApp} from '../context/ScreenContext.jsx';
import {helperDirectory,matchesHelper} from '../data/workflow.js';
export default function HelpersList(){
 const app=useApp(),go=useNavigate();
 const all=[...helperDirectory,...app.workflow.team];
 const list=all.filter(h=>matchesHelper(h,app.filters));
 return <section className="helpers-live"><header><h2>{app.service==='Cleaning'?'Cleaners':app.service+' helpers'}</h2><span>{list.length} helpers</span><button onClick={()=>go('/helpers/filters')} aria-label="Filter helpers">Filters</button></header><AssistantEntry/><div className="helpers-live-list">{list.map(h=><HelperCard key={h.id} helper={h}/>)}</div>{!list.length&&<div className="helpers-live-empty"><h3>No helpers match these filters</h3><p>Adjust your filters to see more helpers.</p><button onClick={()=>go('/helpers/filters')}>Adjust filters</button></div>}</section>
}
