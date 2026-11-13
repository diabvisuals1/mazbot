import TopbarCart,{CartIcon} from './TopbarCart.jsx';
import React,{useRef} from 'react';
import {motion,useReducedMotion} from 'motion/react';
import {useLocation,useNavigate} from 'react-router-dom';
import {useApp} from '../context/ScreenContext.jsx';
import NotificationScreen from './NotificationScreen.jsx';
export default function TopBar(){
 const app=useApp(),go=useNavigate(),{pathname}=useLocation(),reduced=useReducedMotion(),isStore=pathname.startsWith('/store'),cartOpen=isStore&&app.modal==='cart-sheet',open=cartOpen||(pathname!=='/roles'&&app.modal==='notifications');
 const lastPanel=useRef('notifications');
 if(open) lastPanel.current=cartOpen?'cart':'notifications';
 const account=app.workflow.role==='owner'?app.profile:app.workflow[app.workflow.role];
 const activeConversationBooking=app.bookings.find(item=>item.id===app.workflow.selectedBooking);
 const conversationPerson=app.workflow.role==='helper'?activeConversationBooking?.owner||'Home owner':app.person;
 const cartCount=app.cart.reduce((sum,p)=>sum+p.quantity,0);
 const titles={'/flow/requirements':'Find your match','/booking':'Booking request','/helpers':'Find A Helper','/helpers/filters':'Find A Helper','/services':'Find A Helper','/store':'Store','/schedule':'Schedule','/account':'Profile','/helpers/profile':'Helper Profile','/chats':'Chats','/monitoring':'Monitoring'};
 const home=['/','/helper/home','/company/dashboard'].includes(pathname);
 const title=open?(cartOpen?'Your cart':'Notifications'):home?'Hello, '+app.profile.name:pathname==='/chats/conversation'?conversationPerson:pathname==='/chats/all'?'Chats':titles[pathname]||pathname.split('/').filter(Boolean).at(-1)?.replaceAll('-',' ');
 const subtitle=open?(cartOpen?cartCount+' items':'Your latest updates'):pathname==='/chats/conversation'?'Private conversation':new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short'});
 const dismiss=()=>app.setModal(null);
 return <header className={'shared-topbar'+(open?' notifications-open':'')} style={{height:open?812:129,borderBottomLeftRadius:open?0:35,borderBottomRightRadius:open?0:35,transition:reduced?'none':'height 420ms cubic-bezier(.4,0,.2,1), border-radius 420ms cubic-bezier(.4,0,.2,1)'}}>
  <div className="shared-topbar-row"><button aria-label={open?(cartOpen?'Close cart':'Close notifications'):app.chatListExpanded?'Collapse chat list':home?'Open profile':'Go back'} onClick={()=>open?dismiss():app.chatListExpanded?app.setChatListExpanded(false):home?go('/account'):app.goBack()}><img className={!open&&home?'top-account-avatar':undefined} src={open||!home?'/assets/top-back.svg':account.avatar||'/assets/home-avatar.svg'} alt=""/></button><div><h1>{title}</h1><p>{subtitle}</p></div>{pathname==='/roles'?<span className="topbar-spacer" aria-hidden="true"/>:isStore?<button className="topbar-cart-toggle" aria-label={'Cart, '+cartCount+' items'} aria-expanded={cartOpen} onClick={()=>cartOpen?dismiss():app.setModal('cart-sheet')}><CartIcon/>{cartCount>0&&<span className="topbar-cart-badge">{cartCount}</span>}</button>:pathname==='/account'?<button aria-label="Open chats" onClick={()=>{dismiss();go('/chats')}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-8 8H5l-3 2v-10a9 9 0 0 1 18 0Z"/><path d="M7 9h8M7 13h5"/></svg></button>:<button aria-label="Notifications" aria-expanded={open} onClick={()=>open?dismiss():app.setModal('notifications')}><img className="top-bell" src="/assets/top-notifications.svg" alt=""/></button>}</div>
  <div inert={!open} aria-hidden={!open}>{lastPanel.current==='cart'?<TopbarCart app={app} onClose={dismiss}/>:<NotificationScreen app={app} onClose={dismiss}/>}</div>
 </header>;
}
