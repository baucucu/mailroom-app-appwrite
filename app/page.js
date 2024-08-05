"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useOrganization } from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      <header className="flex justify-between p-4">
        <AppLogo />
        <AppNav />
        <AuthState />
      </header>
      <h1>Welcome</h1>
    </main>
  );
}

function AppLogo() {
  return (
    <Link href="/">
      <h1 className="text-2xl font-bold">Mailroom</h1>
    </Link>
  );
}

function AppNav() {
  return (
    <div className="flex align-middle items-center">
      <ul className="flex gap-3">
        <li>
          <Link href="#">About</Link>
        </li>
        <li>
          <Link href="#">Services</Link>
        </li>
      </ul>
    </div>
  );
}

function AuthState() {
  const { isLoaded, organization } = useOrganization();
  return (
    <div className="flex gap-3 align-middle items-center">
      <SignedIn>
        <Link
          href={`/app/${organization?.id}`}
          className={`flex gap-3 rounded-md px-2 py-2 text-sm font-medium hover:bg-muted hover:text-foreground transition-all duration-300 ease-in-out`}
          prefetch={false}
        >
          <LayoutDashboardIcon />
          Get started
        </Link>
        <UserButton />
      </SignedIn>

      <SignedOut>
        <SignInButton path="/app/welcome" forceRedirectUrl="/app/welcome" />
      </SignedOut>
    </div>
  );
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
  );
}
