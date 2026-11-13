import React from "react";
import { createContext, useContext } from "react";
import config from "../data/controls.json";
import catalog from "../data/catalog.json";
import helperLayout from "../data/helper-layout.json";
import { helperDirectory, matchesHelper } from "../data/workflow.js";
export const ScreenContext = createContext(null);
export function useApp() {
  return useContext(ScreenContext);
}
export function useScreen(screen) {
  const app = useApp();
  return {
    ...app,
    bind(id) {
      if (config.hides.includes(id)) return { hidden: true };
      const control = config.controls[id];
      const result = {};
      const helper = catalog.helpers[helperLayout[id]];
      if (helper) {
        const matched = helperDirectory.find((entry) => entry.name === helper.name) || helper;
        if (!matchesHelper(matched, app.filters)) result.hidden = true;
        const preceding = Object.entries(catalog.helpers).filter(
          ([key, h]) =>
            key.startsWith("2051:") &&
            Number(key.split(":")[1]) < 1594 &&
            h.rowY < helper.rowY &&
            !matchesHelper(helperDirectory.find((entry) => entry.name === h.name) || h, app.filters),
        ).length;
        if (preceding) result.style = { translate: `0 -${preceding * 111}px` };
      }
      const product = catalog.products[id];
      if (product && app.savedOnly && !app.saved.includes(id))
        result.hidden = true;
      if (
        config.rows[id] &&
        app.onlineOnly &&
        config.rows[id].text.includes("Offline")
      )
        result.hidden = true;
      if (
        product &&
        app.query &&
        !product.name.toLowerCase().includes(app.query.toLowerCase())
      )
        result.hidden = true;
      if (
        config.rows[id] &&
        app.query &&
        !config.rows[id].text.toLowerCase().includes(app.query.toLowerCase())
      )
        result.hidden = true;
      if (control) {
        const activate = (e) => {
          e.stopPropagation();
          app.act(control, id);
        };
        Object.assign(result, {
          role: "button",
          tabIndex: 0,
          "aria-label": control.label,
          "data-interactive": true,
          onClick: activate,
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              activate(e);
            }
          },
        });
        if (control.action === "save") {
          result["aria-pressed"] = app.saved.includes(control.key);
          result["data-saved"] = app.saved.includes(control.key);
        }
        if (control.action === "day")
          result["data-selected"] = control.day === app.day;
      }
      return result;
    },
  };
}
