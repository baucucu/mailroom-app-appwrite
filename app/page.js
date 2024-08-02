import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      <SignedOut>
        <SignInButton signUpForceRedirectUrl="/welcome" forceRedirectUrl="/welcome" />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </main>
  );
}
