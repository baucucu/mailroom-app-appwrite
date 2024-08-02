'use client'
import { useAuth, useOrganizationList } from '@clerk/nextjs';
import { useRouter } from 'next/navigation'
const Onboarding = () => {
    const auth = useAuth();
    const router = useRouter()
    const { userMemberships } = useOrganizationList({ userMemberships: true });
    console.log({ auth, userMemberships })
    if (!auth.isSignedIn) {
        router.push('/')
        return
    }
    if (auth.orgId) {
        router.push('/' + auth.orgId)
        return
    }
    return (
        <div>
            <h1>Welcome!</h1>
            <p>Please complete the onboarding:</p>
            <p>User Id: {auth.userId}</p>
            <p>Org Id: {auth.orgId}</p>

      // onboarding steps here

        </div>
    )
}

export default Onboarding