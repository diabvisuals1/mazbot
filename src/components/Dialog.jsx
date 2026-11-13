import React from "react";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
export default function Dialog({ title, onClose, children, wide = false, sheet = false, closing = false, onExited, active = true }) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const reduced = useReducedMotion();
  const Backdrop = sheet ? "div" : motion.div;
  const Panel = sheet ? "section" : motion.section;
  useEffect(() => {
    if (!active) return;
    const prior = document.activeElement;
    const dialog = ref.current;
    dialog.focus({preventScroll:true});
    const key = (e) => {
      if (e.key === "Escape") { e.preventDefault(); closeRef.current(); }
      if (e.key === "Tab") {
        const els = [
          ...dialog.querySelectorAll("button,input,select,textarea,a[href]"),
        ].filter((e) => !e.disabled && !e.closest('[inert]') && !e.hidden);
        if (!els.length) {
          e.preventDefault();
          return;
        }
        if (
          e.shiftKey &&
          (document.activeElement === els[0] ||
            document.activeElement === dialog)
        ) {
          e.preventDefault();
          els.at(-1).focus({preventScroll:true});
        } else if (!e.shiftKey && document.activeElement === els.at(-1)) {
          e.preventDefault();
          els[0].focus({preventScroll:true});
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      prior?.focus({preventScroll:true});
    };
  }, [active]);
  return (
    <Backdrop
      className={"dialog-backdrop" + (sheet ? " store-sheet-backdrop" + (closing ? " is-closing" : "") : "")}
      {...(!sheet ? {initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:reduced?0:.16}} : {})}
      onClick={onClose}
    >
      <Panel
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={"dialog " + (wide ? "viewer-dialog" : "") + (sheet ? " store-filter-sheet" : "")}
        {...(!sheet ? {initial:reduced?false:{y:24,opacity:0},animate:{y:0,opacity:1},exit:{y:reduced?0:16,opacity:0},transition:{duration:reduced?0:.24,ease:[.22,1,.36,1]}} : {})}
        onAnimationEnd={e => { if (sheet && closing && e.target === e.currentTarget) onExited?.(); }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dialog-title">
          <h2>{title}</h2>
          <button type="button" className="dialog-close" aria-label="Close dialog" onClick={onClose}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button>
        </div>
        {children}
      </Panel>
    </Backdrop>
  );
}
