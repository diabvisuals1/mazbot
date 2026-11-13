import OnboardingFrame from './OnboardingFrame.jsx';
import React from 'react';
import { LivingArt } from '../../components/Experience.jsx';
const artNodes={2420:[2427,2439],2443:[2444,2445,2446,2477,2524,2525,2526],2527:[2560,2561,2562,2506],2563:[2564,2597,2598,2599,2600,2601,2602,2603,2604,2605,2606,2607,2608,2609,2610,2611,2612,2613,2614,2615],2704:[2705,2706,2707,2753,2754,2755],2616:[2617,2646,2648,2654],2756:[2787,2790,2791,2793,2795,2809,2810],2666:[2697,2698,2700,2702,2703]};

// Node IDs keep behavior attached to the exact design control, without invisible overlays.
const links={2421:'/onboarding',2426:'/auth',2448:'/onboarding/2',2554:'/onboarding/3',2557:'/onboarding',2585:'/signup',2594:'/onboarding/2',2645:'/auth',2737:'/forgot-password',2742:'/signup',2786:'/auth',2789:'/signup'};
const submits=new Set([2618,2667,2738,2782]);
const fields={2658:['name','Full Name'],2661:['password','Password'],2665:['phone','Phone number'],2732:['password','Password'],2736:['phone','Phone number'],2781:['phone','Phone number']};
const otpIds=['843','845','846','847','852','853'];
export function enhance(node,ui){
 if(!React.isValidElement(node))return node;
 const props=node.props,id=props['data-node-id'],n=Number(id?.split(':')[1]);
 let children=React.Children.map(props.children,child=>enhance(child,ui));
 if([2473,2548,2590].includes(n))return <div {...props}>{children}<div className="onboarding-pager">{['/onboarding','/onboarding/2','/onboarding/3'].map((path,i)=><button key={path} type="button" aria-label={'Onboarding step '+(i+1)} aria-current={ui.page===path?'step':undefined} onClick={()=>ui.go(path)}/>)}</div></div>;
 if(fields[n]){const [name,label]=fields[n];return <input key={id} className={'auth-input '+(name==='password'?'auth-password':'')} data-node-id={id} name={name} aria-label={label} placeholder={label} type={name==='password'?(ui.showPassword?'text':'password'):name==='phone'?'tel':'text'} autoComplete={name==='password'?(ui.page==='/signup'?'new-password':'current-password'):name==='phone'?'tel':'name'} inputMode={name==='phone'?'tel':undefined} required minLength={name==='password'?6:name==='name'?2:undefined}/>;}
 if(id?.startsWith('I2140:2696;')&&otpIds.includes(id.split(':').at(-1))){const i=otpIds.indexOf(id.split(':').at(-1));return <input {...props} key={id} className={props.className+' auth-otp'} name={'digit'+i} aria-label={'Code digit '+(i+1)} inputMode="numeric" autoComplete={i===0?'one-time-code':'off'} value={ui.digits[i]} maxLength={1} required pattern="[0-9]" onChange={e=>ui.changeDigit(i,e)} onKeyDown={e=>ui.keyDigit(i,e)} onPaste={ui.pasteCode}/>;}
 if(links[n])return <a {...props} href={links[n]} onClick={e=>{e.preventDefault();ui.go(links[n]);}}>{children}</a>;
 if(submits.has(n))return <button {...props} type="submit">{children}</button>;
 if(n===2662||n===2733)return <button {...props} type="button" className={props.className+' auth-eye'} aria-label={ui.showPassword?'Hide password':'Show password'} aria-pressed={ui.showPassword} onClick={ui.togglePassword}>{children}</button>;
 if(n===2643)return <button {...props} type="button" onClick={()=>ui.setDialog('terms')}>{children}</button>;
 if(n===2693)return <button {...props} type="button" disabled={ui.seconds>0} onClick={ui.resend} aria-label="Resend verification code"><span style={{color:'rgba(0,55,68,.5)'}}>{ui.seconds?'Resend code in':'Resend code'}</span>{ui.seconds>0&&<> <b>00:{String(ui.seconds).padStart(2,'0')}</b></>}</button>;
 if(n===2691&&ui.phone)children=<><p style={{lineHeight:'normal'}}>We’ve sent a 6-digit code to</p><p style={{lineHeight:'normal'}}>{ui.phone}</p></>;
 if(id===ui.root){const ids=artNodes[n]||[],art=[],rest=[];React.Children.forEach(children,child=>{const number=Number(child?.props?.['data-node-id']?.split(':')[1]);(ids.includes(number)?art:rest).push(child)});if(ui.page.startsWith('/onboarding')){const chrome=rest.filter(c=>['Home Bar','Status Bar'].includes(c?.props?.['data-name']));const content=rest.filter(c=>!chrome.includes(c)&&![2473,2548,2590].includes(Number(c?.props?.['data-node-id']?.split(':')[1]))&&c?.type!=='a');return <OnboardingFrame ui={ui} art={art} content={content} chrome={chrome}/>;}children=[<LivingArt key="art" group style={{position:'absolute',inset:0,transformOrigin:'50% 55%'}}>{art}</LivingArt>,...rest];return <form {...props} className={props.className+' auth-artboard'} onSubmit={ui.submit} aria-label={props['data-name']}>{children}</form>;}
 // SVGs retain their exported intrinsic dimensions. PNG image slots retain Figma sizing.
 if(node.type==='img'&&props.src?.endsWith('.svg'))return React.cloneElement(node,{className:props.className+' auth-svg'});
 return React.cloneElement(node,{},children);
}
