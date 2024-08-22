"use client";
import Sidebar from "@/components/Sidebar";
import AppHeader from "@/components/Appbar";
import { useState, useEffect } from "react";

export default function Layout({ children }) {
  const [isScreenSmall, setScreenSmall] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  function toggleSidebarOpen() {
    setIsSidebarOpen((prevState) => !prevState);
  }

  // Check if screen size is small and update state
  function handleResize() {
    setScreenSmall(window.innerWidth < 640);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebarOpen={toggleSidebarOpen}
        isScreenSmall={isScreenSmall}
        className="fixed left-0 top-0 h-full"
      />
      <div className="flex flex-col flex-grow">
        <AppHeader
          isScreenSmall={isScreenSmall}
          toggleSidebarOpen={toggleSidebarOpen}
          isSidebarOpen={isSidebarOpen}
          className="fixed top-0 right-0 left-0 z-10"
        />
        <main className="flex-grow overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}