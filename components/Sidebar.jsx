'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { ChevronDoubleLeftIcon, Cog6ToothIcon, Bars3Icon, UserCircleIcon } from "@heroicons/react/24/outline"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"

export default function Sidebar({ isSidebarOpen, toggleSidebarOpen }) {

    return (
        <div className="flex min-h-screen ">
            <aside className={`inset-y-0 left-0 z-20 hidden h-full ${isSidebarOpen ? 'w-48' : 'w-auto'} flex-col border-r bg-background shadow-lg lg:flex jusitfy-between transition-all duration-300 ease-in-out`}>
                <div className="flex h-16 shrink-0 items-center justify-between border-b px-4">
                    {isSidebarOpen ? <OrganizationSwitcher /> : null}
                    <Button variant="ghost" size="icon" onClick={toggleSidebarOpen}>
                        {isSidebarOpen ? <ChevronDoubleLeftIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                        <span className="sr-only">Toggle sidebar</span>
                    </Button>
                </div>
                <nav className="flex-1 overflow-y-auto px-2 py-4">
                    <NavItem label="Dashboard" href="#" icon={LayoutDashboardIcon} isSidebarOpen={isSidebarOpen} />
                    <NavItem label="Users" href="#" icon={UserCircleIcon} isSidebarOpen={isSidebarOpen} />
                </nav>
                <nav className=" border-t px-2 py-4">
                    <NavItem label="Settings" href="#" icon={Cog6ToothIcon} isSidebarOpen={isSidebarOpen} />
                </nav>
            </aside>
        </div>
    )
}

const NavItem = ({ icon: Icon, label, url = "#", isSidebarOpen }) => {
    return (
        <Link
            href={url}
            className={`flex gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground transition-all duration-300 ease-in-out ${!isSidebarOpen && 'justify-center'}`}
            prefetch={false}
        >
            <Icon className={`h-5 w-5 ${!isSidebarOpen && 'mx-auto'}`} />
            {isSidebarOpen ? <span>{label}</span> : null}
        </Link>
    )
}


function LayoutDashboardIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
    )
}


function MountainIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    )
}

