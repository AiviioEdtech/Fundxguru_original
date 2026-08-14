import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Admin from "./admin/Admin";

// A query param, not a hash route: Supabase's magic-link redirect appends the
// session tokens as a URL hash fragment, which would collide with a "#admin" route.
const isAdmin = new URLSearchParams(window.location.search).get("admin") === "1";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isAdmin ? <Admin /> : <App />}
  </StrictMode>
);
