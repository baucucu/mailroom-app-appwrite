'use client'
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDoubleLeftIcon, Cog6ToothIcon, Bars3Icon, UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { OrganizationSwitcher } from "@clerk/nextjs"

export default function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isSmallScreen, setIsSmallScreen] = useState(false)

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 1024)
            setIsSidebarOpen(window.innerWidth >= 1024)
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)

        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    return (
        <>
            {isSmallScreen && !isSidebarOpen && (
                <Button variant="ghost" size="icon" onClick={toggleSidebar} className="fixed top-4 left-4 z-30">
                    <Bars3Icon className="h-6 w-6" />
                </Button>
            )}
            <aside className={`
                ${isSmallScreen ? 'fixed inset-y-0 left-0 z-30' : 'relative'}
                flex flex-col border-r bg-background shadow-lg transition-all duration-300 ease-in-out
                ${isSmallScreen ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
                ${isSmallScreen ? 'w-64' : (isSidebarOpen ? 'w-64' : 'w-16')}
            `}>
                <div className={`flex h-16 shrink-0 items-center border-b px-4 ${isSmallScreen ? 'justify-end' : 'justify-between'}`}>
                    {(isSidebarOpen && !isSmallScreen) && <OrganizationSwitcher />}
                    <Button variant="ghost" size="icon" onClick={toggleSidebar} className={isSmallScreen && !isSidebarOpen ? 'ml-auto' : ''}>
                        {isSmallScreen ?
                            <XMarkIcon className="h-6 w-6" /> :
                            (isSidebarOpen ? <ChevronDoubleLeftIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />)
                        }
                    </Button>
                </div>
                <nav className="flex-1 overflow-y-auto px-2 py-4">
                    <NavItem label="Dashboard" href="#" icon={LayoutDashboardIcon} isSidebarOpen={isSidebarOpen} isSmallScreen={isSmallScreen} />
                    <NavItem label="Users" href="#" icon={UserCircleIcon} isSidebarOpen={isSidebarOpen} isSmallScreen={isSmallScreen} />
                </nav>
                <nav className="border-t px-2 py-4">
                    <NavItem label="Settings" href="#" icon={Cog6ToothIcon} isSidebarOpen={isSidebarOpen} isSmallScreen={isSmallScreen} />
                </nav>
            </aside>
            {isSmallScreen && isSidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={toggleSidebar}></div>
            )}
        </>
    )
}

const NavItem = ({ icon: Icon, label, url = "#", isSidebarOpen, isSmallScreen }) => {
    return (
        <Link
            href={url}
            className={`flex gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground transition-all duration-300 ease-in-out ${(!isSidebarOpen && !isSmallScreen) && 'justify-center'}`}
            prefetch={false}
        >
            <Icon className={`h-5 w-5 ${(!isSidebarOpen && !isSmallScreen) && 'mx-auto'}`} />
            {(isSidebarOpen || isSmallScreen) && <span>{label}</span>}
        </Link>
    )
}

// Assume LayoutDashboardIcon and other icon components are defined elsewhere


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
