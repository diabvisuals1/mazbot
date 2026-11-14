import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { AnimatedNumber, LivingArt } from "../components/Experience.jsx";
import { useApp } from "../context/ScreenContext.jsx";
import { BrandVisual, BrandIcon } from "../components/BrandVisual.jsx";
import { Header, Button, Field } from "../components/Primitives.jsx";
export function Booking() {
  const app = useApp(),
    navigate = useNavigate();
  const [form, setForm] = useState(
    app.bookingDraft || { date: app.filters.date || "", time: "10:00", address: "", notes: "" },
  );
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const set = (k, v) => {
    const next = { ...form, [k]: v };
    setForm(next);
    app.setBookingDraft(next);
  };
  const submit = (e) => {
    e.preventDefault();
    let errs = {};
    const today = new Date().toLocaleDateString("en-CA");
    if (!form.date || form.date < today)
      errs.date = "Choose today or a future date.";
    if (form.address.trim().length < 8)
      errs.address = "Enter your full service address.";
    if (!form.time) errs.time = "Choose a start time.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    app.setBookings([
      ...app.bookings,
      {
        ...form,
        id: Date.now(),
        helper: app.person,
        service: app.service,
        price: app.helperPrice,
        status: "Requested",
      },
    ]);
    setDone(true);
  };
  return (
    <>
      <Header title={done ? "Request saved" : "Book a helper"} />
      <main className="new-content">
        {done ? (
          <motion.div
            className="success-card"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <img src="/assets/a362e.png" alt="" />
            <h2>Your request is ready</h2>
            <p>
              {app.person} · {app.service}
            </p>
            <p>
              {form.date} at {form.time}
            </p>
            <Button onClick={() => navigate("/schedule")}>View schedule</Button>
            <Button secondary onClick={() => navigate("/")}>
              Back home
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={submit}>
            <div className="helper-summary">
              <img src={app.helperImage} alt="" />
              <div>
                <h2>{app.person}</h2>
                <p>{app.service}</p>
                <strong>
                  EGP {app.helperPrice}
                  <small> / day</small>
                </strong>
              </div>
            </div>
            <h2>Service details</h2>
            <Field
              label="Date"
              type="date"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              error={errors.date}
            />
            <Field
              label="Start time"
              type="time"
              value={form.time}
              onChange={(e) => set("time", e.target.value)}
              error={errors.time}
            />
            <Field
              label="Home address"
              autoComplete="street-address"
              placeholder="Street, building, apartment and area"
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              error={errors.address}
            />
            <label className="field">
              <span>Anything your helper should know?</span>
              <textarea
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="Optional instructions"
              />
            </label>
            <Button type="submit">Request booking</Button>
          </form>
        )}
      </main>
    </>
  );
}
export function Schedule() {
  const app = useApp();
  const navigate = useNavigate();
  return (
    <>
      <Header title="Schedule" />
      <main className="new-content">
        <h2>Your home, organized</h2>
        <article className="schedule-card">
          <img src="/assets/a362e.png" alt="" />
          <div>
            <h3>Cleaning</h3>
            <p>Today · 10:05 AM – 11:30 AM</p>
            <span className="pill">In progress</span>
          </div>
          <Button onClick={() => navigate("/monitoring/tracking")}>
            Track service
          </Button>
        </article>
        <AnimatePresence>
          {app.bookings.map((b) => (
            <motion.article
              layout
              exit={{ opacity: 0, height: 0 }}
              key={b.id}
              className="schedule-card"
            >
              <div>
                <h3>
                  {b.service} · {b.helper}
                </h3>
                <p>
                  {b.date} · {b.time}
                </p>
                <p>{b.address}</p>
                <span className="pill">{b.status}</span>
              </div>
              <Button
                secondary
                onClick={() =>
                  app.setBookings(app.bookings.filter((x) => x.id !== b.id))
                }
              >
                Cancel request
              </Button>
            </motion.article>
          ))}
        </AnimatePresence>
        {!app.bookings.length && (
          <p className="empty">Your new requests will appear here.</p>
        )}
        <Button onClick={() => navigate("/services")}>Find a helper</Button>
      </main>
    </>
  );
}
export function Account() {
  const app = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState(app.profile.name);
  const [saved, setSaved] = useState(false);
  return (
    <>
      <Header title="Profile" />
      <main className="new-content">
        <div className="profile-avatar">
          <img src="/assets/8a4ec.svg" alt="" />
        </div>
        <h2>Hello, {app.profile.name}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (name.trim()) {
              app.setProfile({ ...app.profile, name: name.trim() });
              setSaved(true);
            }
          }}
        >
          <Field
            label="Your name"
            required
            maxLength={40}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSaved(false);
            }}
          />
          <Button type="submit">Save profile</Button>
          {saved && <p role="status">Profile saved.</p>}
        </form>
        <h3>Saved items</h3>
        <p>{app.saved.length} favorites saved.</p>
        <Button secondary onClick={() => app.setModal("favorites")}>
          View favorites
        </Button>
        <div className="account-links">{[['Switch account type','/roles','helper'],['Account details','/complete-profile','profile'],['Order history','/orders','order'],['Support','/flow/support','support']].map(([label,to,context])=><button key={to} onClick={()=>navigate(to)}><BrandVisual context={context}/><span>{label}</span><BrandIcon name="chevron"/></button>)}</div>
      </main>
    </>
  );
}
export function Conversation() {
  const app = useApp();
  const reduced=useReducedMotion(),list=useRef(null),composer=useRef(null),stickToBottom=useRef(true);
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const booking = app.bookings.find(b=>b.id===app.workflow.selectedBooking && b.helper===app.person);
  const thread = booking ? 'booking:'+booking.id : app.person;
  const messages = app.messages[thread] || [];
  const [showLatest,setShowLatest]=useState(false);
  useEffect(()=>{const el=list.current;if(!el||!stickToBottom.current)return;const frame=requestAnimationFrame(()=>el.scrollTo({top:el.scrollHeight,behavior:reduced?'auto':'smooth'}));return()=>cancelAnimationFrame(frame);},[messages.length,reduced]);
  const onMessageScroll=()=>{const el=list.current;if(!el)return;const near=el.scrollHeight-el.scrollTop-el.clientHeight<64;stickToBottom.current=near;setShowLatest(!near&&messages.length>1);};
  const recipient = app.workflow.role==='helper' ? booking?.owner || 'Home owner' : app.person;
  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    app.setMessages(current=>({
      ...current,
      [thread]: [...(current[thread]||[]), { id: globalThis.crypto?.randomUUID?.()||Date.now(), text: text.trim(), own: true, sender: app.workflow.role, createdAt: new Date().toISOString() }],
    }));
    stickToBottom.current=true;
    setShowLatest(false);
    setText("");
  };
  return (
    <>
      <Header title={recipient} subtitle="Conversation" />
      <main className="conversation">
        <div className="chat-intro">
          <img src={app.helperImage} alt="" />
          <h3>{recipient}</h3>
          <p>Ask about services and availability.</p>
        </div>
        <div className="message-list" ref={list} onScroll={onMessageScroll} role="log" aria-label={'Messages with '+recipient} aria-live="polite" aria-relevant="additions text">
          <p className="message incoming">
            Hello! How can I help with your home today?
          </p>
          {messages.map((m) => (
            <motion.p
              initial={reduced?false:{ y: 7, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{duration:.18,ease:[.22,1,.36,1]}}
              className={'message '+(!m.sender||m.sender===app.workflow.role?'outgoing':'incoming')}
              key={m.id}
            >
              {m.text}
            </motion.p>
          ))}
          {messages.length>0&&<p className="message-saved">Saved</p>}
        </div>
        {showLatest&&<motion.button className="chat-jump-latest" initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1}} aria-label="Jump to latest message" onClick={()=>{stickToBottom.current=true;setShowLatest(false);list.current?.scrollTo({top:list.current.scrollHeight,behavior:reduced?'auto':'smooth'})}}>↓</motion.button>}
        {!messages.length&&<div className="chat-suggestions">{["Are you available this week?","What services do you offer?","Can we discuss the booking?"].map(t=><button key={t} onClick={()=>{setText(t);composer.current?.focus()}}>{t}</button>)}</div>}
        <form className="composer" onSubmit={send}>
          <input
            ref={composer}
            aria-label="Message"
            placeholder="Write a message…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={1000}
          />
          <Button type="submit" disabled={!text.trim()}>
            Send
          </Button>
        </form>
        <Button onClick={() => navigate(booking ? '/flow/bookings/'+booking.id : app.workflow.role==='owner'?'/booking':'/helper/requests')}>{booking ? 'View booking request' : app.workflow.role==='owner'?'Continue to booking':'View requests'}</Button>
      </main>
    </>
  );
}
export function Cart() {
  const reduced=useReducedMotion();
  const app = useApp(),
    navigate = useNavigate();
  const [done, setDone] = useState(false);
  const total = app.cart.reduce((s, p) => s + p.price * p.quantity, 0);
  return (
    <>
      <Header title="Your cart" />
      <main className="new-content">
        {done ? (
          <div className="success-card">
            <h2>Order details saved</h2>

            <Button onClick={() => navigate("/store")}>Back to store</Button>
          </div>
        ) : (
          <>
            <h2>Home & Care Store</h2>
            {app.cart.length ? (
              <AnimatePresence initial={false}>{app.cart.map((p) => (
                <motion.article layout="position" initial={reduced?false:{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={reduced?{}:{opacity:0,height:0,marginBottom:0,padding:0}} className="cart-card" key={p.key}>
                  <img src={p.image} alt={p.name} />
                  <div>
                    <h3>{p.name}</h3>
                    {p.addons?.length > 0 && (
                      <small>{p.addons.join(", ")}</small>
                    )}
                    <p>EGP {p.price.toLocaleString()}</p>
                    <div className="stepper">
                      <button
                        aria-label={"Decrease " + p.name + " quantity"}
                        onClick={() => app.updateCart(p.key, -1)}
                      >
                        −
                      </button>
                      <AnimatedNumber value={p.quantity}/>
                      <button
                        aria-label={"Increase " + p.name + " quantity"}
                        onClick={() => app.updateCart(p.key, 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="text-button"
                      onClick={() =>
                        app.setCart(app.cart.filter((x) => x.key !== p.key))
                      }
                    >
                      Remove
                    </button>
                  </div>
                </motion.article>
              ))}</AnimatePresence>
            ) : (
              <div className="empty">
                <img src="/assets/9d2af.png" alt="" />
                <p>Your cart is waiting for a little home care.</p>
                <Button onClick={() => navigate("/store")}>
                  Explore store
                </Button>
              </div>
            )}
            {app.cart.length > 0 && (
              <>
                <div className="total">
                  <strong>Total</strong>
                  <strong><AnimatedNumber prefix="EGP " value={total}/></strong>
                </div>
                <Button
                  onClick={() => navigate('/checkout')}
                >
                  Continue to checkout
                </Button>
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}

export function CategoryPage({ name }) {
 const app=useApp(), navigate=useNavigate();
 const items=name==='Nursing supplies'
 ? [{key:'Blood pressure monitor',name:'Blood pressure monitor',price:300,image:'/assets/8edef.png',description:'Monitor blood pressure at home'}]
 : [{key:'Cleaning spray bottle',name:'Cleaning spray bottle',price:150,image:'/assets/4d9d1.png',description:'A refillable spray bottle for everyday home cleaning'}];
 return <><Header title={name}/><main className="new-content"><h2>{name}</h2>{items.map(item=><article className="category-product" key={item.key}><img src={item.image} alt={item.name}/><h3>{item.name}</h3><p>EGP {item.price}</p><Button onClick={()=>{app.setProduct(item);app.setQuantity(1);app.setAddons([]);navigate('/store/product');}}>View product</Button></article>)}<Button secondary onClick={()=>navigate('/store')}>Back to store</Button></main></>;
}
