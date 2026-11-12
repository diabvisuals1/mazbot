import React from 'react';
import {motion,useReducedMotion} from 'motion/react';
import {useLocation,useNavigate} from 'react-router-dom';
import {useApp} from '../context/ScreenContext.jsx';
import NotificationScreen from './NotificationScreen.jsx';
export default function TopBar(){
 const app=useApp(),go=useNavigate(),{pathname}=useLocation(),reduced=useReducedMotion(),open=app.modal==='notifications';
 const titles={'/helpers':'Find A Helper','/services':'Services','/store':'Store','/schedule':'Schedule','/account':'Profile','/helpers/profile':'Helper Profile','/chats':'Chats','/monitoring':'Monitoring'};
 const home=['/','/helper/home','/company/dashboard'].includes(pathname);
 const title=open?'Notifications':home?'Hello, '+app.profile.name:pathname==='/chats/all'?'Chats':titles[pathname]||pathname.split('/').filter(Boolean).at(-1)?.replaceAll('-',' ');
 const dismiss=()=>app.setModal(null);
 return <motion.header className={'shared-topbar'+(open?' notifications-open':'')} animate={{height:open?'100%':129,borderBottomLeftRadius:open?0:35,borderBottomRightRadius:open?0:35}} transition={reduced?{duration:0}:{type:'spring',stiffness:190,damping:27,mass:1.05}}>
  <div className="shared-topbar-row"><button aria-label={open?'Close notifications':app.chatListExpanded?'Collapse chat list':home?'Open profile':'Go back'} onClick={()=>open?dismiss():app.chatListExpanded?app.setChatListExpanded(false):home?go('/account'):go(-1)}><img src={open||!home?'/assets/top-back.svg':'/assets/home-avatar.svg'} alt=""/></button><div><h1>{title}</h1><p>{open?'Your latest updates':new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short'})}</p></div>{open?<span className="notification-bell"><img className="top-bell" src="/assets/top-notifications.svg" alt=""/></span>:<button aria-label="Notifications" onClick={()=>app.setModal('notifications')}><img className="top-bell" src="/assets/top-notifications.svg" alt=""/></button>}</div>
  {open&&<NotificationScreen app={app} onClose={dismiss}/>}
 </motion.header>;
}
