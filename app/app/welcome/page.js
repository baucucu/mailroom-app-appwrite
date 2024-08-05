"use client";
import { useAuth, useOrganizationList, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import OrganizationsGrid from "./OrganizationsGrid";

const Onboarding = () => {
  const auth = useAuth();
  const router = useRouter();

  const userMembershipsParams = {
    memberships: {
      // pageSize: 5,
      keepPreviousData: true,
    },
  };
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: userMembershipsParams,
  });

  if (!isLoaded) {
    return <>Loading</>;
  }
  return (
    <OrganizationsGrid memberships={userMemberships} setActive={setActive} />
  );
};

export default Onboarding;
