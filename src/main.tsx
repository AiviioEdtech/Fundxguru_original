import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Admin from "./admin/Admin";
import Apply from "./apply/Apply";
import ArticlePage from "./blog/ArticlePage";
import BlogIndex from "./blog/BlogIndex";

// Query params, not hash routes: Supabase's OTP/magic-link redirect appends
// the session tokens as a URL hash fragment, which would collide with a hash route.
const params = new URLSearchParams(window.location.search);
const isAdmin = params.get("admin") === "1";
const isApply = params.get("apply") === "1";
const isBlog = params.get("blog") === "1";
const articleSlug = params.get("article");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isAdmin ? (
      <Admin />
    ) : isApply ? (
      <Apply />
    ) : articleSlug ? (
      <ArticlePage slug={articleSlug} />
    ) : isBlog ? (
      <BlogIndex />
    ) : (
      <App />
    )}
  </StrictMode>
);
