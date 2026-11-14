import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/ScreenContext.jsx";
const items = [
  ["Home", "/", "1b54f.svg"],
  ["Store", "/store", "297a1.svg"],
  ["Monitoring", "/monitoring", "6f250.svg"],
  ["Schedule", "/schedule", "be0b9.svg"],
  ["Profile", "/account", "c94ae.svg"],
];
export default function Navigation() {
  const app = useApp();
  const reduced=useReducedMotion();
  const cartCount=app.cart.reduce((n,p)=>n+p.quantity,0);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  if (app.workflow.role !== 'owner') {
    const entries = app.workflow.role === 'helper'
      ? [['Home','/helper/home','⌂'],['Requests','/helper/requests','▤'],['Jobs','/helper/jobs','♧'],['Schedule','/schedule','▦'],['Profile','/account','⇄']]
      : [['Home','/company/dashboard','⌂'],['Helpers','/company/helpers','♧'],['Requests','/company/requests','▤'],['Services','/company/active','▦'],['Profile','/account','⇄']];
    return <nav className="persona-nav" aria-label="Main navigation">{entries.map(([label,path,icon])=><motion.button whileTap={reduced?undefined:{scale:.94}} key={path} aria-current={pathname===path?'page':undefined} onClick={()=>navigate(path)}>{pathname===path&&<motion.span layoutId="persona-nav" className="persona-highlight" transition={{type:"spring",stiffness:420,damping:34}}/>}<span><img src={"/assets/"+({Home:"1b54f.svg",Requests:"be0b9.svg",Jobs:"297a1.svg",Schedule:"be0b9.svg",Roles:"c94ae.svg",Profile:"c94ae.svg",Helpers:"c94ae.svg",Services:"6f250.svg"}[label])} alt=""/></span>{label}</motion.button>)}</nav>;
  }
  const selected = pathname.startsWith("/store")
    ? "Store"
    : pathname.startsWith("/monitoring") || pathname === '/flow/assistant' || pathname === '/flow/devices' || pathname.startsWith('/flow/device/')
      ? "Monitoring"
      : pathname === "/schedule"
        ? "Schedule"
        : pathname === "/account"
          ? "Profile"
          : "Home";
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {items.map(([label, path, icon]) => (
        <motion.button
          key={label}
          onClick={() => navigate(path)}
          aria-current={selected === label ? "page" : undefined}
          whileTap={reduced?undefined:{ scale: 0.94 }}
        >
          <span className={selected === label ? "nav-active" : "nav-inactive"}>
            {selected === label && (
              <motion.span
                layoutId="nav-highlight"
                className="nav-highlight"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <img src={"/assets/" + icon} alt="" />
            <span>{label}</span>{label==="Store"&&cartCount>0&&<motion.b key={cartCount} initial={reduced?false:{scale:.5}} animate={{scale:1}} className="nav-cart-count" aria-label={cartCount+" items in cart"}>{cartCount}</motion.b>}
          </span>
        </motion.button>
      ))}
    </nav>
  );
}
