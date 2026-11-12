import React from 'react';

export default function PageSkeleton({path=''}) {
 const auth=/^\/(start|onboarding|auth|signup|verify|forgot-password)/.test(path);
 const product=path==='/store/product';
 const list=/chats|helpers|schedule|orders/.test(path);
 return <div className={'page-skeleton '+(auth?'skeleton-auth':'')} role="status" aria-label="Loading page" aria-busy="true">
  <div aria-hidden="true">
   <div className="sk sk-heading" />
   {auth ? <><div className="sk sk-illustration"/><div className="sk sk-line"/><div className="sk sk-line short"/>{[0,1,2].map(i=><div key={i} className="sk sk-field"/>)}<div className="sk sk-action"/></> : <>
    <div className={'sk '+(product?'sk-product':'sk-banner')}/>
    <div className="sk sk-line short"/>
    <div className={list?'sk-list':'sk-grid'}>{[0,1,2,3].map(i=><div className="sk-card" key={i}><div className="sk sk-thumb"/><div className="sk-copy"><div className="sk sk-line"/><div className="sk sk-line short"/></div></div>)}</div>
   </>}
  </div>
 </div>;
}
