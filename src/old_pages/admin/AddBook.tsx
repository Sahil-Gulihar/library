"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { MASTERS } from "@/data/books";
import { useAdminStore } from "@/lib/store";

const formSchema = z.object({
  title: z.string().min(2, "Title is required."),
  master: z.string().min(1, "Master is required."),
  year: z.string().min(4, "Year must be 4 digits."),
  abstract: z.string().min(10, "Please provide a longer description."),
  shelf: z.string().min(2, "Shelf location is required."),
  totalUnits: z.string().optional(),
  versesFile: z.any().optional(),
});

export default function AddBook() {
  const { addBook } = useAdminStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", master: "", year: "", abstract: "", shelf: "", totalUnits: "1" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const totalUnitsNum = parseInt(values.totalUnits || "1", 10);
    addBook({
      title: values.title,
      master: values.master,
      year: parseInt(values.year, 10),
      abstract: values.abstract,
      shelf: values.shelf,
      totalUnits: totalUnitsNum,
      availableUnits: totalUnitsNum,
      languages: [], // Added to satisfy types
      categories: [], // Added to satisfy types
    });
    toast.success("Book added successfully!");
    form.reset();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-border/40 shadow-sm">
        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-lg font-semibold">Title</FormLabel>
                    <FormControl><Input className="h-12 text-lg" placeholder="Book Title" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="master" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Master</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-lg">
                          <SelectValue placeholder="Select Master" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {MASTERS.map(m => (
                          <SelectItem key={m.shortName} value={m.name} className="text-lg py-3">{m.shortName}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="year" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Year</FormLabel>
                    <FormControl><Input className="h-12 text-lg" placeholder="Publication Year" type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="totalUnits" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Total Units</FormLabel>
                    <FormControl><Input className="h-12 text-lg" placeholder="Total Units" type="number" min="1" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="shelf" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Shelf Location</FormLabel>
                    <FormControl><Input className="h-12 text-lg" placeholder="e.g. Shelf A - Row 1" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="abstract" render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-lg font-semibold">Abstract / Description</FormLabel>
                    <FormControl><Textarea className="text-lg resize-none p-4" placeholder="Book description..." rows={5} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="versesFile" render={({ field: { value, onChange, ...field } }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-lg font-semibold">Upload Verses File (JSON/CSV)</FormLabel>
                    <FormControl>
                      <Input 
                        className="h-14 text-lg py-3"
                        type="file" 
                        accept=".json,.csv" 
                        onChange={(e) => onChange(e.target.files)} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <Button type="submit" size="lg" className="w-full text-lg h-14">Save Book</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
