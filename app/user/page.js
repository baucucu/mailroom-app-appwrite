'use client'
import { useOrganization, useSession, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function User() {
    const { isLoaded, session, isSignedIn } = useSession();
    const { organization } = useOrganization();
    const { user } = useUser();
    useEffect(() => {
        console.log({ user, organization })
    }, [session, organization, user]);
    if (!isLoaded) {
        return <p>Loading...</p>;
    }
    if (!isSignedIn) {
        return <p>Please sign in to view this page</p>;
    }
    return <p>Welcome, {user.firstName}@{organization.name}</p>;
}