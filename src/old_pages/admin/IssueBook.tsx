"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAdminStore } from "@/lib/store";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phoneNo: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  address: z.string().min(5, {
    message: "Address is required.",
  }),
  issuingDate: z.string(),
  returnDate: z.string(),
  department: z.string().min(2, {
    message: "Sewa department is required.",
  }),
  email: z.string().email().optional().or(z.literal("")),
  bookID: z.string().min(1, {
    message: "Book selection is required.",
  }),
});

export default function IssueBook() {
  const { books, issueBook } = useAdminStore();
  
  const today = new Date();
  const defaultReturnDate = new Date(today);
  defaultReturnDate.setDate(today.getDate() + 14);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNo: "",
      address: "",
      issuingDate: today.toISOString().split('T')[0],
      returnDate: defaultReturnDate.toISOString().split('T')[0],
      department: "",
      email: "",
      bookID: "",
    },
  });

  const [openCombobox, setOpenCombobox] = React.useState(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const issueId = issueBook({
      bookId: parseInt(values.bookID, 10),
      name: values.name,
      phoneNo: values.phoneNo,
      issuingDate: values.issuingDate,
      returnDate: values.returnDate,
      department: values.department,
      email: values.email,
    });
    toast.success(`Book issued successfully! ID: ${issueId}`);
    form.reset();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-border/40 shadow-sm">
        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <FormField
                  control={form.control}
                  name="bookID"
                  render={({ field }) => (
                    <FormItem className="flex flex-col md:col-span-2">
                      <FormLabel className="text-lg font-semibold">Select Book</FormLabel>
                      <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openCombobox}
                              className={cn(
                                "w-full justify-between h-14 text-lg",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? books.find((book) => book.id.toString() === field.value)?.title
                                : "Search and select a book..."}
                              <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Search book by name..." className="text-lg h-12" />
                            <CommandList>
                              <CommandEmpty className="py-6 text-center text-lg">No book found.</CommandEmpty>
                              <CommandGroup>
                                {books.map((book) => (
                                  <CommandItem
                                    key={book.id}
                                    value={`${book.title} ${book.id}`}
                                    className={cn(
                                      "text-lg py-3 flex justify-between items-center",
                                      !book.available && "opacity-50 cursor-not-allowed"
                                    )}
                                    disabled={!book.available}
                                    onSelect={() => {
                                      if (book.available) {
                                        form.setValue("bookID", book.id.toString());
                                        setOpenCombobox(false);
                                      }
                                    }}
                                  >
                                    <div className="flex items-center">
                                      <Check
                                        className={cn(
                                          "mr-2 h-5 w-5",
                                          book.id.toString() === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      <span>{book.title} (ID: {book.id})</span>
                                    </div>
                                    {!book.available && (
                                      <span className="text-xs font-semibold uppercase tracking-wider text-destructive ml-2 bg-destructive/10 px-2 py-1 rounded">
                                        Issued
                                      </span>
                                    )}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {field.value && (
                        <FormDescription className="text-primary font-medium text-lg mt-2">
                          Selected Book ID: {field.value}
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Name</FormLabel>
                      <FormControl>
                        <Input className="h-12 text-lg" placeholder="Full Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Phone Number</FormLabel>
                      <FormControl>
                        <Input className="h-12 text-lg" placeholder="Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Email (Optional)</FormLabel>
                      <FormControl>
                        <Input className="h-12 text-lg" placeholder="Email Address" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Sewa Department</FormLabel>
                      <FormControl>
                        <Input className="h-12 text-lg" placeholder="Department" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-lg font-semibold">Address</FormLabel>
                      <FormControl>
                        <Input className="h-12 text-lg" placeholder="Full Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="issuingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Issuing Date</FormLabel>
                      <FormControl>
                        <Input className="h-12 text-lg" type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="returnDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Return Date</FormLabel>
                      <FormControl>
                        <Input className="h-12 text-lg" type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" size="lg" className="w-full text-lg h-14">Issue Book</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
