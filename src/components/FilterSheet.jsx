import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useDragControls, useReducedMotion } from "motion/react";
import { useApp } from "../context/ScreenContext.jsx";
import { Button, Field } from "./Primitives.jsx";
import { services, localDate, helperDirectory, matchesHelper } from "../data/workflow.js";
export default function FilterSheet() {
  const ref = useRef(null),dragControls=useDragControls(),reduced=useReducedMotion();
  const app = useApp();
  const navigate = useNavigate();
  const [draft, setDraft] = useState(app.filters);
  const matches=[...helperDirectory,...app.workflow.team.filter(h=>h.active!==false)].filter(h=>matchesHelper(h,draft)).length;
  const set = (key, value) => setDraft((v) => ({ ...v, [key]: value }));
  useEffect(() => {
    const el = ref.current;
    el.focus();
    const handler = (e) => {
      if (e.key === "Escape") navigate("/helpers");
      if (e.key === "Tab") {
        const list = [...el.querySelectorAll("button,input,select")];
        if (
          e.shiftKey &&
          (document.activeElement === list[0] || document.activeElement === el)
        ) {
          e.preventDefault();
          list.at(-1).focus();
        } else if (!e.shiftKey && document.activeElement === list.at(-1)) {
          e.preventDefault();
          list[0].focus();
        }
      }
    };
    el.addEventListener("keydown", handler);
    return () => el.removeEventListener("keydown", handler);
  }, [navigate]);
  return (
    <div className="filter-backdrop" onClick={e=>{if(e.target===e.currentTarget)navigate("/helpers")}}>
      <motion.section
        ref={ref}
        tabIndex={-1}
        className="filter-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Filter Helpers"
        drag="y"
        dragListener={false}
        dragControls={dragControls}
        dragConstraints={{top:0,bottom:0}}
        dragElastic={{top:0,bottom:.25}}
        onDragEnd={(_,info)=>{if(info.offset.y>85||info.velocity.y>600)navigate("/helpers")}}
        initial={reduced?false:{ y: 120 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 32, stiffness: 300 }}
      >
        <div className="filter-title" style={{touchAction:"none"}} onPointerDown={e=>{if(!e.target.closest("button"))dragControls.start(e)}}>
          <button
            aria-label="Close filters"
            onClick={() => navigate("/helpers")}
          >
            ×
          </button>
          <h2>Filter Helpers</h2>
          <button
            onClick={() =>
              setDraft({
                service: "Cleaning",
                budget: 600,
                rating: 0,
                date: "",
              })
            }
          >
            Reset
          </button>
        </div>
        <div className="filter-banner">
          <h3>
            Find the
            <br />
            Right Helper
            <br />
            for you
          </h3>
          <img src="/assets/b713a.png" alt="" />
        </div>
        <div className="filter-body">
          <h3>Service</h3>
          <p>Choose the service you need</p>
          <div className="chips">
            {services.map((s) => (
              <button
                key={s}
                aria-pressed={draft.service === s}
                onClick={() => set("service", s)}
              >
                {s}
              </button>
            ))}
          </div>
          <h3>Availability</h3>
          <p>Sun-Thu, 9:00 AM - 5:00 PM</p>
          <Field
            label="Preferred date"
            type="date"
            min={localDate()}
            value={draft.date}
            onChange={(e) => set("date", e.target.value)}
          />
          <label className="field">
            <span>Daily budget · EGP {draft.budget}</span>
            <input
              aria-label="Maximum daily budget"
              type="range"
              min="300"
              max="10000"
              step="25"
              value={draft.budget}
              onChange={(e) => set("budget", +e.target.value)}
            />
          </label>
          <label className="field">
            <span>Minimum rating</span>
            <select
              value={draft.rating}
              onChange={(e) => set("rating", +e.target.value)}
            >
              <option value="0">All helpers</option>
              <option value="4.5">4.5 and above</option>
              <option value="4.8">4.8 and above</option>
            </select>
          </label>
          <div className="filter-results" aria-live="polite"><p>{matches} matching {matches===1?"helper":"helpers"} within your budget</p><Button
            onClick={() => {
              app.setFilters(draft);
              app.setService(draft.service);
              navigate("/helpers");
            }}
          >
            Show {matches} helpers
          </Button></div>
        </div>
      </motion.section>
    </div>
  );
}
