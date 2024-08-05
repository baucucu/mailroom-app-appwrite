'use client'
import { useEffect } from "react"
import { useUser, useOrganization } from "@clerk/nextjs"
export default function Page({ params }) {
    const { user } = useUser();
    const { organization } = useOrganization();
    useEffect(() => {
        console.log({ params, user, organization });
    }, [user, organization])
    if (user && organization) {
        return (
            <div>
                <h1>Main App Page</h1>
                <p>Path: {params.org_id}</p>
                <p>User: {user.firstName}</p>
                <p>Organization: {organization.name}</p>
            </div>
        );
    } else {
        return (
            <div>
                <p>Please sign in to view this page.</p>
            </div>
        );
    }
}