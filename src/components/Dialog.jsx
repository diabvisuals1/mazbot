import React from "react";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
export default function Dialog({ title, onClose, children, wide = false }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const prior = document.activeElement;
    const dialog = ref.current;
    dialog.focus();
    const key = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const els = [
          ...dialog.querySelectorAll("button,input,select,textarea,a[href]"),
        ].filter((e) => !e.disabled);
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
          els.at(-1).focus();
        } else if (!e.shiftKey && document.activeElement === els.at(-1)) {
          e.preventDefault();
          els[0].focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      prior?.focus();
    };
  }, [onClose]);
  return (
    <motion.div
      className="dialog-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : .16 }}
      onClick={onClose}
    >
      <motion.section
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={"dialog " + (wide ? "viewer-dialog" : "")}
        initial={reduced ? false : { y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: reduced ? 0 : 16, opacity: 0, transition: { duration: reduced ? 0 : .14 } }}
        transition={{ duration: reduced ? 0 : .24, ease: [.22, 1, .36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dialog-title">
          <h2>{title}</h2>
          <button aria-label="Close dialog" onClick={onClose}>
            ×
          </button>
        </div>
        {children}
      </motion.section>
    </motion.div>
  );
}
