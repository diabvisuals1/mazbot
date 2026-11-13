import React from 'react';
import {motion,useReducedMotion} from 'motion/react';
import {useNavigate} from 'react-router-dom';
export function CartIcon(){return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3h2l2.5 12h11L21 7H6"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>}
export default function TopbarCart({app,onClose}){
 const go=useNavigate(),reduced=useReducedMotion(),total=app.cart.reduce((sum,p)=>sum+p.price*p.quantity,0);
 return <motion.div className="notification-content topbar-cart" initial={reduced?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:.22,delay:reduced?0:.12}}>
 {app.cart.length?<><div className="topbar-cart-items">{app.cart.map(p=><article className="topbar-cart-item" key={p.key}><img src={p.image} alt={p.name}/><div><h2>{p.name}</h2>{p.addons?.length>0&&<small>{p.addons.join(', ')}</small>}<p>EGP {p.price.toLocaleString()}</p><div className="topbar-cart-quantity"><button aria-label={'Decrease '+p.name+' quantity'} onClick={()=>app.updateCart(p.key,-1)}>−</button><span aria-live="polite">{p.quantity}</span><button aria-label={'Increase '+p.name+' quantity'} onClick={()=>app.updateCart(p.key,1)}>+</button><button className="topbar-cart-remove" onClick={()=>app.setCart(old=>old.filter(x=>x.key!==p.key))}>Remove</button></div></div></article>)}</div><div className="topbar-cart-summary"><div><span>Subtotal</span><strong>EGP {total.toLocaleString()}</strong></div><p>Delivery details at checkout.</p><button onClick={()=>{onClose();go('/checkout')}}>Continue to checkout →</button></div></>:<div className="topbar-cart-empty"><CartIcon/><h2>Your cart is waiting</h2><p>Add something useful for your home.</p><button onClick={onClose}>Keep shopping</button></div>}
 </motion.div>;
}
