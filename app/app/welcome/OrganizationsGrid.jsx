/**
 * v0 by Vercel.
 * @see https://v0.dev/t/n5aJ7JSXC9D
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Component({ memberships, setActive }) {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <AddOrganizationCard />
        {memberships?.data?.map((membership) => (
          <OrganizationCard
            key={membership.id}
            name={membership.organization.name}
            id={membership.organization.id}
            role={membership.role}
            desccription={membership.organization.description}
            setActive={setActive}
          />
        ))}
      </div>
    </div>
  );
}

function AddOrganizationCard() {
  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center justify-center h-32 bg-primary text-primary-foreground">
        <PlusIcon className="w-10 h-10" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Add Organization</h3>
        <p className="text-muted-foreground">
          Click to add a new organization to your list.
        </p>
        <Button className="mt-4 w-full">Add Organization</Button>
      </div>
    </div>
  );
}

function OrganizationCard({ name, id, role, desccription, setActive }) {
  function changeOrgAndRedirect(id) {
    setActive({ organization: id });
    window.location.href = `/app/${id}`;
  }
  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center justify-center h-32 bg-secondary text-secondary-foreground">
        <BuildingIcon className="w-10 h-10" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-muted-foreground">{desccription}</p>
        <div className="flex items-center justify-between mt-4">
          <Button
            asChildvariant="outline"
            onClick={() => changeOrgAndRedirect(id)}
          >
            {/* <Link href={`/${id}`} > */}
            View
            {/* </Link> */}
          </Button>
          {/* <Button variant="danger">Leave</Button> */}
        </div>
      </div>
    </div>
  );
}

function BuildingIcon(props) {
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
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
