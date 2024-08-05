"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { useOrganization } from "@clerk/nextjs";

import { InviteUsers } from "@/components/component/invite-users";

export default function MembersTable() {
  const { isLoaded, memberships, invitations, organization } = useOrganization({
    organization: true,
    memberships: true,
    invitations: true,
  });

  useEffect(() => {
    if (isLoaded) {
      console.log({ invitations })
    }
  }, [isLoaded, invitations]);

  const [activeTab, setActiveTab] = useState("memberships");

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Members</h1>
        <InviteUsers />
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="memberships">Memberships</TabsTrigger>
            <TabsTrigger value="invitations">Invitations</TabsTrigger>
          </TabsList>
          <TabsContent value="memberships">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {memberships?.data?.length > 0 &&
                  memberships?.data?.map((membership) => (
                    <UsersTableRow key={membership.id} user={membership} />
                  ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="invitations">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invitations?.data?.length > 0 &&
                  invitations?.data?.map((invitation) => (
                    <InvitationTableRow key={invitation.id} invitation={invitation} />
                  ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function InvitationTableRow({ invitation }) {
  console.log({ invitation })
  if (!invitation) {
    return <p>Loading...</p>
  }
  return (
    <TableRow>
      <TableCell>{invitation.emailAddress}</TableCell>
      <TableCell>
        <Badge>{invitation.role.split(":")[1]}</Badge>
      </TableCell>
      <TableCell>
        <Badge>
          {invitation.status}
        </Badge>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoveHorizontalIcon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Remove</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

function UsersTableRow({ user }) {
  console.log({ user });
  let fullName = "";
  let initials = "";
  if (user.publicUserData.firstName && user.publicUserData.lastName) {
    fullName =
      user.publicUserData?.firstName + " " + user.publicUserData?.lastName;
    initials =
      user.publicUserData?.firstName[0] + user.publicUserData?.lastName[0];
  }
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.publicUserData.imageUrl} alt={initials} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{fullName}</div>
            <div className="text-muted-foreground text-sm">
              {user.publicUserData?.identifier}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>{user.publicUserData?.identifier}</TableCell>
      <TableCell>
        <Badge>{user.role.split(":")[1]}</Badge>
      </TableCell>
      {/* <TableCell>
        <Badge variant="danger">Suspended</Badge>
      </TableCell> */}
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoveHorizontalIcon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Remove</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

function MoveHorizontalIcon(props) {
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
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}
