// Import React and ReactDOM
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import "react-spring-bottom-sheet/dist/style.css";
import "./css/app.scss";

import { ResizeObserver } from "@juggle/resize-observer";
window.ResizeObserver = ResizeObserver;

// Import App Component
import App from "./components/app";
import "intersection-observer";
import appConfig from "../app-config.json";
import "./clarity";
import "zmp-sdk/apis";

if (!(window as any).APP_CONFIG) {
  (window as any).APP_CONFIG = appConfig;
}

const root = createRoot(document.getElementById("app")!);
root.render(createElement(App));
