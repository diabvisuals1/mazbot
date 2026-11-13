import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "motion/react";
import App from "./App.jsx";
import "./styles/fonts.css";
import "./styles/design.css";
import "./styles/app.css";
import "./styles/flow.css";
import "./styles/experience.css";
import "./styles/brand-pages.css";
import "./styles/phone-frame.css";
import "./styles/chat-motion.css";
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </BrowserRouter>
  </React.StrictMode>,
);
