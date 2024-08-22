import { Button } from "@/components/ui/button";
import {
  BuildingStorefrontIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-center h-16 bg-primary text-primary-foreground">
          <PlusCircleIcon className="w-10 h-10" />
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">Add Organization</h3>
        <p className="text-muted-foreground">
          Click to add a new organization to your list.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="mt-4 w-full">Add Organization</Button>
      </CardFooter>
    </Card>
  );
}

function OrganizationCard({ name, id, role, desccription, setActive }) {
  function changeOrgAndRedirect(id) {
    setActive({ organization: id });
    window.location.href = `/app`;
  }
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center justify-center h-16 bg-secondary text-secondary-foreground">
          <BuildingStorefrontIcon className="w-10 h-10" />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-muted-foreground">{desccription}</p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          // variant="outline"
          onClick={() => changeOrgAndRedirect(id)}
        >
          View
        </Button>
      </CardFooter>
    </Card>
  );
}
