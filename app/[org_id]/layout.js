'use client'
import Sidebar from '@/components/Sidebar';
import AppHeader from '@/components/Appbar';
import { useState } from 'react';

export default function Layout({ children }) {
    const [isScreenSmall, setScreenSmall] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    function toggleSidebarOpen() {
        setIsSidebarOpen(prevState => !prevState);
    }

    return (
        <div className="flex h-screen bg-zinc-100">
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebarOpen={toggleSidebarOpen} isScreenSmall={isScreenSmall} />
            <div className="flex flex-col w-full">
                <AppHeader />
                <main className="p-4">{children}</main>
            </div>
        </div>
    );
}