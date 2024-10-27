"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
import { useState } from "react";
import { FormError } from "./auth/form-error";
import { FormSuccess } from "./auth/form-success";
import { TransitionSchema } from "@/schemas";
import { Textarea } from "./ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@apollo/client";
import { CREATE_TRANSACTION } from "@/graphql/mutations/transactionMutation";

interface IProps {
  type: "Create" | "Update";
}
const TransactionForm = ({ type }: IProps) => {
  const [clientError, setClientError] = useState("");
  const [success, setSuccess] = useState("");
  const [createTransactionFn,{loading:isPending}] = useMutation(CREATE_TRANSACTION)
  // const [isPending, startTransition] = useTransition();


  const form = useForm<z.infer<typeof TransitionSchema>>({
    resolver: zodResolver(TransitionSchema),
    defaultValues: {
      description: "",
      paymentType: "",
      category: "",
      amount: "0",
      location: "",
      date: new Date(),
    },
  });


  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof TransitionSchema>) {
    setClientError("");
    setSuccess("");
    console.log(values);
    
    createTransactionFn({
      variables:{
        input: values
      }
    }).then(()=>{})
      .catch((error)=>setClientError(error.message))

    // startTransition(() => {
    //   login(values).then((res) => {
    //     console.log(res);
    //     res.success ? setSuccess(res.message || "") : setError(res.message || "");
    //   });
    // });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-lg mx-auto bg-white text-black p-4 rounded-md "
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Put description here   "
                  className="resize-none h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid md:grid-cols-3 gap-x-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="saving">Saving</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Payment Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="aisa">Visa</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel >Amount($)</FormLabel>
                <FormControl>
                  <Input placeholder="Amount" {...field}  disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="md:grid grid-cols-2 gap-x-4 ">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    className="p-2"
                    placeholder="Location"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-center  w-full mt-2 ">
                <FormLabel> Date </FormLabel>
                {/* <CalendarIcon  size={18} className="relative left-48 top-[37px] z-50 text-muted-foreground"/> */}
                <FormControl>
                  <DatePicker
                    className="border rounded-md p-1.5 outline-none w-full"
                    selected={field.value}
                    onChange={field.onChange}
                    showTimeSelect
                    dateFormat="Pp"
                    minDate={new Date()}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
        </div>

        <FormError message={clientError} />
        <FormSuccess message={success} />
        <Button type="submit" className="w-full" disabled={isPending}>
          {type === "Create" ? "Create" : "Update"}
        </Button>
      </form>
    </Form>
  );
};

export default TransactionForm;
