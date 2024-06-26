"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useCreateAssignor from "../hooks/useCreateAssignor";
import style from "./page.module.css";

const formSchema = z
  .object({
    document: z.string({ required_error: "document is required" }),
    email: z.string({ required_error: "email is required" }).email(),
    password: z.string({ required_error: "password is required" }).min(6),
    confirm_password: z.string().min(6).optional(),
    phone: z.string({ required_error: "phone is required" }),
    name: z.string({ required_error: "name is required" }).min(5),
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "Password doesn't match",
    path: ["confirm_password"],
  });

export default function RegisterAssignor() {


  const { push } = useRouter();

  const {
    mutate: mutateCreateAssignor,
    isError,
    isSuccess: isCreatedSuccess,
  } = useCreateAssignor();




  useEffect(() => {
    if (isCreatedSuccess) {
      alert("Assignor created successfully");
      push("/");
    }

    if(isError) {
      alert("Assignor not created, try again.");
    }
  }, [isCreatedSuccess]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      document: "",
      email: "",
      password: "",
      confirm_password: "",
      phone: "",
      name: "",
    },
  });

  const handleAssignorCreate = (values: z.infer<typeof formSchema>) => {
    delete values.confirm_password;
    return mutateCreateAssignor(values);
  };

  return (
    <main
      className={`flex flex-col items-center justify-center gap-12 p-24 ${style.container}`}
    >
  
      <h1 className="text-4xl font-bold">Create your account</h1>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAssignorCreate)}
            className="space-y-8"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="document"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="document" {...field} />
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
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="phone" {...field} />
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
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="confirm_password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className={style.button}
              disabled={!form.formState.isValid}
            >
              Register
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
