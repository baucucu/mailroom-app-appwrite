import { SignInButton, SignedIn, SignedOut, UserButton, OrganizationSwitcher } from '@clerk/nextjs'
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
export default function AppBar({ isScreenSmall, isSidebarOpen, toggleSidebarOpen }) {
    return (
        <header className={`flex justify-end p-4 bg-background h-16 border-b items-center`}>
            {/* {isScreenSmall ? (
                <Button variant="ghost" size="icon" onClick={toggleSidebarOpen}>
                    <Bars3Icon className="h-6 w-6" />
                </Button>
            ) : null} */}
            <UserButton />
        </header>
    );
}