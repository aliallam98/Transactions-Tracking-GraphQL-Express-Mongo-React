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
import { Input } from "@/components/ui/input";
import { LoginSchema } from "../../schemas";
import CardWrapper from "./card-wrapper";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/graphql/mutations/userMutation";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate()
  // const [isPending, startTransition] = useTransition();



  const [loginFn,{loading:isPending}] = useMutation(LOGIN)


  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    console.log(values);
    setError("");
    setSuccess("");

    loginFn({
      variables:{
        input:values
      }
    })
    .then(()=>{
      navigate("/")
    })
    .catch((error)=>setError(error.message))

    // startTransition(() => {
    //   login(values).then((res) => {
    //     console.log(res);
    //     res.success
    //       ? setSuccess(res.message || "")
    //       : setError(res.message || "");
    //   });
    // });
  }

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account"
      backButtonHref="/signup"
      // showSocial
      type="Login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} disabled={isPending} />
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
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
