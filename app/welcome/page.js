"use client";
import { useAuth, useOrganizationList, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import OrganizationsGrid from "./OrganizationsGrid";

const Onboarding = () => {
  const auth = useAuth();
  const router = useRouter();

  const userMembershipsParams = {
    memberships: {
      pageSize: 5,
      keepPreviousData: true,
    },
  };
  const { isLoaded, userMemberships } = useOrganizationList({
    userMemberships: userMembershipsParams,
  });

  if (!isLoaded) {
    return <>Loading</>;
  }
  return <OrganizationsGrid memberships={userMemberships} />;
};

export default Onboarding;

const JoinedOrganizations = () => {
  const { user } = useUser();
  const userMembershipsParams = {
    memberships: {
      pageSize: 5,
      keepPreviousData: true,
    },
  };
  const { isLoaded, userMemberships } = useOrganizationList({
    userMemberships: userMembershipsParams,
  });

  if (!isLoaded) {
    return <>Loading</>;
  }

  return (
    <>
      <h1>Joined organizations</h1>
      <table>
        <thead>
          <tr>
            <th>Identifier</th>
            <th>Organization</th>
            <th>Joined</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {userMemberships?.data?.map((mem) => (
            <tr key={mem.id}>
              <td>{mem.publicUserData.identifier}</td>
              <td>{mem.organization.name}</td>
              <td>{mem.createdAt.toLocaleDateString()}</td>
              <td>{mem.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button
          disabled={
            !userMemberships?.hasPreviousPage || userMemberships?.isFetching
          }
          onClick={() => userMemberships?.fetchPrevious?.()}
        >
          Previous
        </button>

        <button
          disabled={
            !userMemberships?.hasNextPage || userMemberships?.isFetching
          }
          onClick={() => userMemberships?.fetchNext?.()}
        >
          Next
        </button>
      </div>
    </>
  );
};
