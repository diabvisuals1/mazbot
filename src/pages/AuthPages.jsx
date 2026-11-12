import React,{useEffect,useRef,useState} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import {useApp} from '../context/ScreenContext.jsx';
import Welcome from './auth/2140-2420.jsx';
import On1 from './auth/2140-2443.jsx';
import On2 from './auth/2140-2527.jsx';
import On3 from './auth/2140-2563.jsx';
import Login from './auth/2140-2704.jsx';
import Signup from './auth/2140-2616.jsx';
import Forgot from './auth/2140-2756.jsx';
import Verify from './auth/2140-2666.jsx';
import '../styles/auth-design.css';
import '../styles/auth.css';

const screens={'/start':[Welcome,2420],'/onboarding':[On1,2443],'/onboarding/2':[On2,2527],'/onboarding/3':[On3,2563],'/auth':[Login,2704],'/signup':[Signup,2616],'/forgot-password':[Forgot,2756],'/verify':[Verify,2666]};
export const authPaths=Object.keys(screens);
export default function AuthPages(){const {pathname}=useLocation();return <AuthScreen key={pathname} page={pathname}/>;}
function AuthScreen({page}){
 const app=useApp(),go=useNavigate(),host=useRef(null);
 const [showPassword,setShowPassword]=useState(false),[digits,setDigits]=useState(Array(6).fill('')),[seconds,setSeconds]=useState(29),[dialog,setDialog]=useState(''),[error,setError]=useState('');
 const [Screen,id]=screens[page]||screens['/start'];
 const swipe=useRef(null);
 const swipeStart=e=>{if(!page.startsWith("/onboarding")||e.target.closest("button,a,input"))return;swipe.current={x:e.clientX,y:e.clientY};};
 const swipeEnd=e=>{const p=swipe.current;swipe.current=null;if(!p||Math.abs(e.clientY-p.y)>40||Math.abs(e.clientX-p.x)<65)return;const steps=["/onboarding","/onboarding/2","/onboarding/3"],i=steps.indexOf(page),next=i+(e.clientX<p.x?1:-1);if(next>=0&&next<3)go(steps[next]);};
 const patch=v=>app.setWorkflow(w=>({...w,...v}));
 useEffect(()=>{if(page!=='/verify')return;const timer=setInterval(()=>setSeconds(s=>Math.max(0,s-1)),1000);return()=>clearInterval(timer);},[page]);
 function focusDigit(i){host.current?.querySelector(`[name="digit${i}"]`)?.focus();}
 function changeDigit(i,e){const value=e.target.value.replace(/\D/g,'').slice(-1);setDigits(d=>d.map((v,j)=>j===i?value:v));if(value&&i<5)focusDigit(i+1);}
 function keyDigit(i,e){if(e.key==='Backspace'&&!digits[i]&&i>0)focusDigit(i-1);if(e.key==='ArrowLeft'&&i>0)focusDigit(i-1);if(e.key==='ArrowRight'&&i<5)focusDigit(i+1);}
 function pasteCode(e){e.preventDefault();const code=e.clipboardData.getData('text').replace(/\D/g,'').slice(0,6);setDigits(Array.from({length:6},(_,i)=>code[i]||''));focusDigit(Math.min(code.length,5));}
 function submit(e){
  e.preventDefault();setError('');const values=Object.fromEntries(new FormData(e.currentTarget));
  if(page==='/verify'){
   if(digits.join('')!=='123456'){setError('Use the local preview code: 123456.');return;}
   if(app.workflow.authIntent==='recover'){setDialog('reset');return;}
   patch({authenticated:true,verified:true});go('/complete-profile');return;
  }
  if(!['/auth','/signup','/forgot-password'].includes(page))return;
  const phone=values.phone.replace(/[\s()-]/g,'');if(!/^\+?\d{10,15}$/.test(phone)){setError('Enter a valid phone number (10–15 digits).');return;}
  if(page==='/auth'){patch({phone,authenticated:true});app.setToast('Local preview login — no server authentication.');go('/roles');return;}
  if(page==='/signup')app.setProfile(p=>({...p,name:values.name.trim()}));
  patch({phone,authenticated:false,verified:false,authIntent:page==='/forgot-password'?'recover':'signup'});
  app.setToast('Local preview code: 123456 — no SMS is sent.');go('/verify');
 }
 const ui={page,root:`2140:${id}`,phone:app.workflow.phone,go,submit,showPassword,togglePassword:()=>setShowPassword(s=>!s),digits,changeDigit,keyDigit,pasteCode,seconds,setDialog,resend:()=>{setSeconds(29);app.setToast('Local preview code: 123456 — no SMS is sent.');}};
 return <main className="auth-page" ref={host} onPointerDown={swipeStart} onPointerUp={swipeEnd} onPointerCancel={()=>{swipe.current=null}}><Screen ui={ui}/>{error&&<div className="auth-error" role="alert"><span>{error}</span><button onClick={()=>setError('')} aria-label="Dismiss error">×</button></div>}{dialog&&<div className="auth-dialog-backdrop"><section className="auth-dialog" role="dialog" aria-modal="true" aria-label={dialog==='reset'?'Reset password':'Terms and privacy'}><button className="auth-dialog-close" onClick={()=>setDialog('')} aria-label="Close">×</button>{dialog==='terms'?<><h2>Terms & Privacy Policy</h2><p>This is a local interactive prototype. Your preview profile stays in this browser. Production terms and privacy policy are not available yet.</p><button className="auth-dialog-action" onClick={()=>setDialog('')}>Back to sign up</button></>:<form onSubmit={e=>{e.preventDefault();patch({authIntent:null,verified:true});app.setToast('Preview reset complete. No real account password was changed.');go('/auth');}}><h2>Choose a new password</h2><label>New password<input type="password" name="password" autoComplete="new-password" minLength={6} required/></label><p>Local preview only. Passwords are not stored.</p><button className="auth-dialog-action" type="submit">Return to login</button></form>}</section></div>}</main>;
}
