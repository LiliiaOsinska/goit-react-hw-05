import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "modern-normalize";
import { Toaster } from "react-hot-toast";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <>
        <App />
        <Toaster position="top-right" />
      </>
    </BrowserRouter>
  </StrictMode>
);
