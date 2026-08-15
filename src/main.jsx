import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Views from "./pages/Views.jsx";
import Hire from "./pages/Hire.jsx";
import Compare from "./pages/Compare.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/hire" element={<Hire />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/views" element={<Views />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
