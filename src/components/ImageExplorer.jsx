import React,{useRef,useState} from 'react';
import {animate,motion,useMotionValue,useReducedMotion} from 'motion/react';
import {LivingArt} from './Experience.jsx';
import {Button} from './Primitives.jsx';
import {clamp,pinchTransform} from './imageGestures.js';
import {useApp} from '../context/ScreenContext.jsx';

export function ImageExplorer({src,alt,cover=false}){
 const [zoom,setZoom]=useState(1),frame=useRef(null),points=useRef(new Map()),gesture=useRef(null),lastTap=useRef(null);
 const x=useMotionValue(0),y=useMotionValue(0),scale=useMotionValue(1),reduced=useReducedMotion();
 const change=value=>{const next=clamp(value,1,2.5);setZoom(next);animate(scale,next,{duration:reduced?0:.18});animate(x,0,{duration:reduced?0:.18});animate(y,0,{duration:reduced?0:.18});};
 const point=e=>{const r=frame.current.getBoundingClientRect();return {x:e.clientX-r.left-r.width/2,y:e.clientY-r.top-r.height/2}};
 const begin=()=>{const p=[...points.current.values()];if(p.length===2)gesture.current={pinch:true,scale:scale.get(),distance:Math.hypot(p[1].x-p[0].x,p[1].y-p[0].y),center:{x:(p[0].x+p[1].x)/2,y:(p[0].y+p[1].y)/2},x:x.get(),y:y.get()};else if(p.length===1)gesture.current={point:p[0],x:x.get(),y:y.get(),time:Date.now(),moved:false};};
 const down=e=>{if(e.button!==0||points.current.size>=2)return;scale.stop();x.stop();y.stop();e.currentTarget.setPointerCapture(e.pointerId);points.current.set(e.pointerId,point(e));begin();};
 const move=e=>{if(!points.current.has(e.pointerId))return;points.current.set(e.pointerId,point(e));const g=gesture.current,p=[...points.current.values()],r=frame.current.getBoundingClientRect();if(g?.pinch&&p.length===2){const v=pinchTransform(g,p[0],p[1],r.width,r.height);scale.set(v.scale);x.set(v.x);y.set(v.y);setZoom(v.scale);}else if(g?.point&&p.length===1){const dx=p[0].x-g.point.x,dy=p[0].y-g.point.y;g.moved ||= Math.hypot(dx,dy)>8;x.set(clamp(g.x+dx,-r.width*(scale.get()-1)/2,r.width*(scale.get()-1)/2));y.set(clamp(g.y+dy,-r.height*(scale.get()-1)/2,r.height*(scale.get()-1)/2));}};
 const end=e=>{const g=gesture.current;if(e.type==='pointerup'&&g&&!g.pinch&&!g.moved&&Date.now()-g.time<250){const p=point(e),last=lastTap.current;if(last&&Date.now()-last.time<300&&Math.hypot(last.x-p.x,last.y-p.y)<25){change(scale.get()>1?1:2);lastTap.current=null;}else lastTap.current={...p,time:Date.now()};}else lastTap.current=null;points.current.delete(e.pointerId);if(points.current.size){begin();gesture.current.moved=true;}else gesture.current=null;};
 return <><div className="image-explorer" ref={frame} onPointerDown={down} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={e=>{points.current.delete(e.pointerId)}}><motion.img src={src} alt={alt} draggable={false} style={{x,y,scale,objectFit:cover?'cover':'contain'}}/></div><div className="image-explorer-controls"><Button secondary aria-label="Zoom out" disabled={zoom<=1} onClick={()=>change(zoom-.25)}>-</Button><button onClick={()=>change(1)} aria-label="Reset image view">{Math.round(zoom*100)}% | Reset</button><Button secondary aria-label="Zoom in" disabled={zoom>=2.5} onClick={()=>change(zoom+.25)}>+</Button></div><p className="flow-note">Pinch to zoom. Drag to explore. Double-tap to reset or zoom in.</p></>;
}
export function ProductArt({product}){
 const app=useApp();
 return <button className="product-art" aria-label={'Explore '+product.name+' image'} onClick={()=>app.setModal('product-preview')}><LivingArt><img data-product-art src={product.image} alt={product.name}/></LivingArt><span>Explore image ↗</span></button>;
}
