'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useOrganization } from "@clerk/nextjs"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"

const InviteSchema = z.object({
  invites: z.array(z.object({
    email: z.string().email({ message: "Invalid email address" }),
    role: z.enum(["org:member", "org:admin"], {
      required_error: "Please select a role",
    }),
  })).min(1, { message: "At least one invite is required" }),
})

export function InviteUsers() {

  const [dialogOpen, setDialogOpen] = useState(false)
  const { organization } = useOrganization()
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(InviteSchema),
    defaultValues: {
      invites: [{ email: '', role: 'org:member' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "invites",
  })

  function onSubmit(data) {
    console.log('Invites to be sent:', data.invites, { organization })
    // Implement the logic to send invites
    const promises = data.invites.map(async (invite) => {
      // Call Clerk API to send invite
      const response = await organization.inviteMember({
        emailAddress: invite.email,
        role: invite.role,
      })

      return response
    })
    Promise.all(promises).then((data) => {
      console.log("invites sent: ", data)
      toast({
        title: "Invites sent",
        description: data.map(invite => {
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{invite.emailAddress}</code>
          </pre>
        }),
      })
      //reset form
      form.reset()
      form.clearErrors()
      //close dialog
      setDialogOpen(false)

    }).catch((error) => {
      toast({
        title: "Error sending invites",
        description: error.message,
      })
    })
  }



  return (
    <Dialog open={dialogOpen}>
      <Button variant="outline" onClick={() => setDialogOpen(true)}>Invite Users</Button>
      {/* <DialogTrigger asChild>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Invite Users to your organization</DialogTitle>
          <DialogDescription>Enter the email addresses and roles of the users you want to invite.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-start space-x-2">
                <FormField
                  control={form.control}
                  name={`invites.${index}.email`}
                  render={({ field }) => (
                    <FormItem>
                      {index === 0 && <FormLabel>Email</FormLabel>}
                      <FormControl>
                        <Input
                          className="w-80"
                          placeholder="Enter email address"
                          {...field}
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField

                  control={form.control}
                  name={`invites.${index}.role`}
                  render={({ field }) => (
                    <div className="flex items-end space-x-2">
                      <FormItem>
                        {index === 0 && <FormLabel>Role</FormLabel>}
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="org:member">Member</SelectItem>
                            <SelectItem value="org:admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                      {fields.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} >
                          <MinusIcon className="h-4 w-4" />
                        </Button>
                      )}
                      {index === fields.length - 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => append({ email: '', role: 'org:member' })} >
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  )}
                />
              </div>
            ))}
            <DialogFooter>
              <Button type="submit">Send Invites</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

// PlusIcon and MinusIcon components remain the same

// PlusIcon and MinusIcon components remain the same

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

function MinusIcon(props) {
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
    </svg>
  );
}