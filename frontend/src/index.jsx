import React from "react";
import { createRoot } from "react-dom/client";  // React 18+
import App from "./App.jsx";                    // Your root component
import "./style.css";                           // optional global styles

// Get the root div from index.html
const rootElement = document.getElementById("root");

// Create React root (React 18+ way)
const root = createRoot(rootElement);

// Render the App component inside #root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
