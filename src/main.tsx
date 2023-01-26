import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";
import { RecoilRoot, atom } from "recoil";

import Layout from "./components/Layout";
import Pokemon from "./pages/Pokemon";

export const crtEffectState = atom({
  key: "crtEffect", // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

export const crtTxtEffectState = atom({
  key: "crtTxtEffect", // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <RecoilRoot>
        <Layout>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/pokemon/:id" element={<Pokemon />} />
          </Routes>
        </Layout>
      </RecoilRoot>
    </Router>
  </React.StrictMode>
);
