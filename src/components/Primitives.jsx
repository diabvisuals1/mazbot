import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router-dom";
export function Button({ children, secondary = false, ...props }) {
  const reduced=useReducedMotion();
  return (
    <motion.button
      whileTap={reduced?undefined:{ scale: 0.97 }}
      className={"btn " + (secondary ? "secondary" : "")}
      {...props}
    >
      {children}
    </motion.button>
  );
}
export function Header({ title, subtitle = "" }) {
  const navigate = useNavigate();
  return (
    <header className="new-header">
      <div className="status-bar">
        <span>9:41</span>
        <img src="/assets/a4ec7.svg" alt="" />
      </div>
      <div>
        <button
          className="back"
          aria-label="Go back"
          onClick={() => navigate(-1)}
        >
          <img src="/assets/0af7b.svg" alt="" />
        </button>
        <section>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </section>
        <span className="header-spacer" />
      </div>
    </header>
  );
}
export function Field({ label, error, ...props }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input {...props} aria-label={label} aria-invalid={!!error} />
      {error && <small role="alert">{error}</small>}
    </label>
  );
}
