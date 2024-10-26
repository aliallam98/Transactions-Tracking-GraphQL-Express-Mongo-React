"use client";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Input } from "@/components/ui/input";
import { RegisterSchema } from "../../schemas";
import CardWrapper from "./card-wrapper";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { useState } from "react"; //useTransition
import { Label } from "../ui/label";
import { SIGN_UP } from "@/graphql/mutations/userMutation";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [signUpFn, { loading: isPending, data }] = useMutation(SIGN_UP);
  const [clientError, setClientError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate()
  // const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      username: "",
      gender: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    console.log(values);
    setClientError("");
    setSuccess("");

    signUpFn({
      variables: {
        input: values,
      },
    })
    .then(()=> {
       navigate("/login")
    })
    .catch((error) => setClientError(error.message));

    if (isPending) return "loading";

    // startTransition(() => {
    //   register(values).then((res) => {
    //     res.success ? setSuccess(res.message) : setclientError(res.message);
    //   });
    // });
  }

  return (
    <CardWrapper
      headerLabel="Create An Account"
      backButtonLabel="Already have an account"
      backButtonHref="/login"
      // showSocial
      type="Sign Up"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} disabled={isPending} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    {...field}
                    type="password"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center"
                  >
                    <Label htmlFor="option-one">Gender: </Label>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Male"
                        id="option-one"
                        className="border-neutral-400"
                      />
                      <Label htmlFor="option-one">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Female"
                        id="option-two"
                        className="border-neutral-400"
                      />
                      <Label htmlFor="option-two">Female</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={clientError} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Sign Up
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
