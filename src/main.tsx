import { createRoot } from "react-dom/client";
import { ConvexProvider } from "convex/react";
import client from "./lib/convex";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ConvexProvider client={client}>
    <App />
  </ConvexProvider>
);
