import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  OrganizationSwitcher
} from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({ children }) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {/* <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
            <OrganizationSwitcher />
          </SignedIn> */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}