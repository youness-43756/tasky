"use client"
import { useState } from "react";
import { useForm } from "react-hook-form"
import FormWrapper from "./FormWrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { loginSchema } from "@/lib/formValidation/schema";
import { FormProps } from "@/lib/dataType/dType";
import { toast } from "react-hot-toast";
import clsx from "clsx";
import { Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const route = useRouter();
    const [isLoading, setisLoading] = useState(false);
    const [message, setMessage] = useState({ email: "", password: "" });
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const onsubmit = async (values: FormProps) => {
        const validation = loginSchema(values);
        if (validation.email === "" && validation.password === "") {
            setMessage(validation);
            setisLoading(prev => !prev);
            try {
                const res = await signIn('credentials', {
                    email: values.email,
                    password: values.password,
                    call: "login",
                    redirect: false
                })
                if (res?.error) {
                    toast.error("Account not found. Sign up now!");
                    setisLoading(prev => !prev);
                    return;
                }
                route.push('/dashboard');
                toast.success("Login successful! Welcome back!");
                form.reset();
                setisLoading(prev => !prev);
                return;
            } catch (error) {
                console.log("Failed :", error);
                return;
            }

            // //!
            // const response = await fetch('/api/auth/login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(formData),
            // })

            // if (!response.ok) {
            //     const errorData = await response.json();
            //     toast.error(errorData.message);
            //     setisLoading(prev => !prev);
            //     return;
            // }

            // const data = await response.json();
            // if (!data.success) {
            //     toast.error(data.message);
            //     setisLoading(prev => !prev);
            //     return;
            // }
            // toast.success(data.message);
            // form.reset();
            // setisLoading(prev => !prev);
        } else {
            setMessage(validation);
        }

    }
    return (
        <FormWrapper
            title="Login to your account"
            backhref="/auth/sign-in"
            backlabel="Don't have an account? Create one!"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="example321@gmail.com..." {...field} />
                                    </FormControl>
                                    <FormMessage>
                                        {message.email && message.email}
                                    </FormMessage>
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
                                        <Input type="password" placeholder="******" {...field} />
                                    </FormControl>
                                    <FormMessage>
                                        {message.password && message.password}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button size="full" variant={"lime"} disabled={isLoading}>
                        <span className={clsx({ "hidden": isLoading, "block": !isLoading })}>Login</span>
                        <Loader className={clsx("animate-spin", {
                            "hidden": !isLoading,
                            "block": isLoading,
                        })} />
                    </Button>
                </form>
            </Form>
        </FormWrapper >
    )
}


