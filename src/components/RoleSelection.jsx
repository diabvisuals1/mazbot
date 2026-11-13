import React from 'react';
import {motion,useReducedMotion} from 'motion/react';
import {BrandIcon} from './BrandVisual.jsx';
const roles=[
 {id:'owner',title:'House Owner',text:'Find trusted help for your home.',image:'/assets/b713a.png',label:'A little help at home'},
 {id:'helper',title:'House Helper',text:'Put your skills to work.',image:'/assets/auth/on2-chef.svg',label:'Make a difference'},
 {id:'company',title:'Company',text:'Bring your team together.',image:'/assets/roles-company.svg',label:'Grow with MAZBOT'},
];
export default function RoleSelection({onChoose}){
 const reduced=useReducedMotion();
 return <main className="role-selection"><div className="role-intro"><span>WELCOME TO MAZBOT</span><h1>Your next chapter<br/>starts here.</h1><p>How would you like to join?</p></div><div className="role-options">{roles.map((role,i)=><motion.button key={role.id} type="button" className={'role-option role-option--'+role.id} onClick={()=>onChoose(role.id)} initial={reduced?false:{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.28,delay:i*.055}} whileTap={reduced?undefined:{scale:.98}}><span className="role-art"><img src={role.image} alt="" draggable="false"/></span><span className="role-copy"><span className="role-eyebrow">{role.label}</span><strong>{role.title}</strong><span className="role-description">{role.text}</span></span><span className="role-arrow"><BrandIcon name="arrow"/></span></motion.button>)}</div></main>;
}
