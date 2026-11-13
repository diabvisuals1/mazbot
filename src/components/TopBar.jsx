import TopbarCart,{CartIcon} from './TopbarCart.jsx';
import React from 'react';
import {motion,useReducedMotion} from 'motion/react';
import {useLocation,useNavigate} from 'react-router-dom';
import {useApp} from '../context/ScreenContext.jsx';
import NotificationScreen from './NotificationScreen.jsx';
export default function TopBar(){
 const app=useApp(),go=useNavigate(),{pathname}=useLocation(),reduced=useReducedMotion(),isStore=pathname.startsWith('/store'),cartOpen=isStore&&app.modal==='cart-sheet',open=cartOpen||(pathname!=='/roles'&&app.modal==='notifications');
 const cartCount=app.cart.reduce((sum,p)=>sum+p.quantity,0);
 const titles={'/helpers':'Find A Helper','/helpers/filters':'Find A Helper','/services':'Find A Helper','/store':'Store','/schedule':'Schedule','/account':'Profile','/helpers/profile':'Helper Profile','/chats':'Chats','/monitoring':'Monitoring'};
 const home=['/','/helper/home','/company/dashboard'].includes(pathname);
 const title=open?(cartOpen?'Your cart':'Notifications'):home?'Hello, '+app.profile.name:pathname==='/chats/all'?'Chats':titles[pathname]||pathname.split('/').filter(Boolean).at(-1)?.replaceAll('-',' ');
 const dismiss=()=>app.setModal(null);
 return <motion.header className={'shared-topbar'+(open?' notifications-open':'')} animate={{height:open?'100%':129,borderBottomLeftRadius:open?0:35,borderBottomRightRadius:open?0:35}} transition={reduced?{duration:0}:{type:'spring',stiffness:190,damping:27,mass:1.05}}>
  <div className="shared-topbar-row"><button aria-label={open?(cartOpen?'Close cart':'Close notifications'):app.chatListExpanded?'Collapse chat list':home?'Open profile':'Go back'} onClick={()=>open?dismiss():app.chatListExpanded?app.setChatListExpanded(false):home?go('/account'):go(-1)}><img src={open||!home?'/assets/top-back.svg':'/assets/home-avatar.svg'} alt=""/></button><div><h1>{title}</h1><p>{open?(cartOpen?cartCount+' items':'Your latest updates'):new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short'})}</p></div>{pathname==='/roles'?<span className="topbar-spacer" aria-hidden="true"/>:isStore?<button className="topbar-cart-toggle" aria-label={'Cart, '+cartCount+' items'} aria-expanded={cartOpen} onClick={()=>cartOpen?dismiss():app.setModal('cart-sheet')}><CartIcon/>{cartCount>0&&<span className="topbar-cart-badge">{cartCount}</span>}</button>:open?<span className="notification-bell"><img className="top-bell" src="/assets/top-notifications.svg" alt=""/></span>:<button aria-label="Notifications" onClick={()=>app.setModal('notifications')}><img className="top-bell" src="/assets/top-notifications.svg" alt=""/></button>}</div>
  {cartOpen?<TopbarCart app={app} onClose={dismiss}/>:open&&<NotificationScreen app={app} onClose={dismiss}/>}
 </motion.header>;
}
