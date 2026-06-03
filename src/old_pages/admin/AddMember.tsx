"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useAdminStore } from "@/lib/store";

const formSchema = z.object({
  name: z.string().min(2, "Name is required."),
  role: z.string().min(2, "Role is required."),
  department: z.string().min(2, "Department is required."),
  contact: z.string().min(10, "Contact must be at least 10 digits."),
  email: z.string().email("Invalid email address.").optional().or(z.literal("")),
});

export default function AddMember() {
  const { addMember } = useAdminStore();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", role: "", department: "", contact: "", email: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addMember(values);
    toast.success("Team member added successfully!");
    form.reset();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-border/40 shadow-sm">
        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Full Name</FormLabel>
                  <FormControl><Input className="h-12 text-lg" placeholder="e.g. John Doe" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Email</FormLabel>
                    <FormControl><Input className="h-12 text-lg" placeholder="john@example.com" type="email" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="contact" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Contact Number</FormLabel>
                    <FormControl><Input className="h-12 text-lg" placeholder="Phone number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="role" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Role</FormLabel>
                    <FormControl><Input className="h-12 text-lg" placeholder="e.g. Librarian" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="department" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Department</FormLabel>
                    <FormControl><Input className="h-12 text-lg" placeholder="e.g. Main Library" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="pt-6">
                <Button type="submit" size="lg" className="w-full text-lg h-14">Add Member</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
