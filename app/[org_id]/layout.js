"use client";
import Sidebar from "@/components/Sidebar";
import AppHeader from "@/components/Appbar";
import { useState, useEffect } from "react";

export default function Layout({ children }) {
  const [isScreenSmall, setScreenSmall] = useState(window.innerWidth < 640);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  function toggleSidebarOpen() {
    setIsSidebarOpen((prevState) => !prevState);
  }

  // Check if screen size is small and update state
  function handleResize() {
    setScreenSmall(window.innerWidth < 640);
  }
  useEffect(() => {
    if (window) {
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div className="flex h-screen bg-zinc-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebarOpen={toggleSidebarOpen}
        isScreenSmall={isScreenSmall}
      />
      <div className="flex flex-col w-full">
        <AppHeader
          isScreenSmall={isScreenSmall}
          toggleSidebarOpen={toggleSidebarOpen}
          isSidebarOpen={isSidebarOpen}
        />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
