import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAdminStore } from "@/lib/store";

const formSchema = z.object({
  bookIssueID: z.string().min(1, {
    message: "Book Issue ID is required.",
  }),
});

export default function ReturnBook() {
  const { returnBook } = useAdminStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookIssueID: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const success = returnBook(values.bookIssueID);
    if (success) {
      toast.success("Book returned successfully!");
      form.reset();
    } else {
      toast.error("Invalid Book Issue ID. Please try again.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Return a Book</CardTitle>
          <CardDescription className="text-lg">
            Enter the Book Issue ID to process a return.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="bookIssueID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Book Issue ID</FormLabel>
                    <FormControl>
                      <Input className="h-14 text-lg" placeholder="e.g. ISSUE-1234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="w-full text-lg h-14">Process Return</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
