import { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { FormPage } from "./components/FormPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "form">("landing");

  useEffect(() => {
    // Simple routing based on URL path
    const path = window.location.pathname;
    if (path === "/form") {
      setCurrentPage("form");
    } else {
      setCurrentPage("landing");
    }

    // Handle browser back/forward
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === "/form") {
        setCurrentPage("form");
      } else {
        setCurrentPage("landing");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Override link clicks to handle internal routing
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      
      if (link && link.href.includes("/form")) {
        e.preventDefault();
        window.history.pushState({}, "", "/form");
        setCurrentPage("form");
      } else if (link && link.href.includes("/#")) {
        // Let anchor links work naturally
        return;
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="min-h-screen">
      {currentPage === "landing" ? <LandingPage /> : <FormPage />}
    </div>
  );
}
