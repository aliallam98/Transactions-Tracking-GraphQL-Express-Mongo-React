import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
    })
    .email({
      message: "Enter valid email",
    }),

  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
    })
    .email({
      message: "Enter valid email",
    }),

  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  gender: z.string().min(1, {
    message: "gender is required",
  }),
});
export const TransitionSchema = z.object({
  description: z.string().min(1, {
    message: "description is required",
  }),
  paymentType: z.string().min(1, {
    message: "Payment Type is required",
  }),
  category: z.string().min(1, {
    message: "category is required",
  }),
  amount: z.string().min(1, {
    message: "amount is required",
  }),
  location: z.string(),
  date: z.date(),
});
