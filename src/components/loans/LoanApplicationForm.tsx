
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLoan } from "@/context/LoanContext";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  purpose: z.string().min(3, "Purpose must be at least 3 characters"),
  loanType: z.string().min(1, "Loan type is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

const LoanApplicationForm = () => {
  const { applyForLoan } = useLoan();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "50000",
      purpose: "",
      loanType: "Debt Net",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await applyForLoan({
        amount: parseFloat(values.amount),
        purpose: values.purpose,
        loanType: values.loanType as any,
        description: values.description,
      });
      navigate("/loans");
    } catch (error) {
      console.error("Error submitting loan application:", error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">APPLY FOR A LOAN</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Amount (₦)</FormLabel>
                <FormControl>
                  <Input type="number" min="10000" step="10000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purpose of Loan</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="loanType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Debt Net">Debt Net</SelectItem>
                    <SelectItem value="Credit Net">Credit Net</SelectItem>
                    <SelectItem value="Fully Paid">Fully Paid</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Details</FormLabel>
                <FormControl>
                  <Textarea 
                    rows={4}
                    placeholder="Provide more information about your loan request..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full">
            Submit Application
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoanApplicationForm;
