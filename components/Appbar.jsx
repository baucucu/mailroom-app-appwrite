import { SignInButton, SignedIn, SignedOut, UserButton, OrganizationSwitcher } from '@clerk/nextjs'
export default function AppBar() {
    return (
        <header className="flex justify-end p-4 bg-gray-800 text-white h-16 border-b items-center">
            <UserButton />
        </header>
    );
}