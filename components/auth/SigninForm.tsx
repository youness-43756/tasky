"use client"
import { useForm } from "react-hook-form"
import FormWrapper from "./FormWrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { loginSchema } from "@/lib/formValidation/schema";
import { Loader } from "lucide-react";
import clsx from "clsx";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { FormProps } from "@/lib/dataType/dType";
import { signIn } from "next-auth/react";

export default function SigninForm() {
    const route = useRouter()
    const [message, setMessage] = useState({ email: "", name: "", password: "", confirmPassword: "" })
    const [isLoading, setisLoading] = useState(false);
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    })
    const onsubmit = async (values: FormProps) => {
        const validation = loginSchema(values);
        if (validation.email === "" && validation.name === "" && validation.password === "" && validation.confirmPassword === ""
            && values.password === values.confirmPassword
        ) {
            setMessage(validation);
            setisLoading(prev => !prev);
            try {
                const res = await signIn('credentials', {
                    ...values,
                    call: "sign-in",
                    redirect: false,
                })
                if (res?.error) {
                    toast.error("Invalid name or password!");
                    setisLoading(prev => !prev);
                    return;
                }
                route.push('/dashboard');
                toast.success("User registered successfully.");
                form.reset();
                setisLoading(prev => !prev);
                return;
            } catch (error: any) {
                toast.error("Something went wrong!");
            }
            // const formData: object = { name: values.name, password: values.password }
            // try {
            //     const response = await fetch('/api/auth/register', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify(formData),
            //     });
            //     if (!response.ok) {
            //         const errorData = await response.json();
            //         toast.error(errorData.message);
            //         setisLoading(prev => !prev);
            //         return;
            //     }
            //     const data = await response.json();
            //     if (!data.success) {
            //         toast.error(data.message);
            //         setisLoading(prev => !prev);
            //         return;
            //     }
            //     toast.success(data.message);
            //     form.reset();
            //     setisLoading(prev => !prev);
            // } catch (error: any) {
            //     console.error('Registration failed:', error.message);
            // }
        } else {
            setMessage(validation);
        }
    }
    return (
        <FormWrapper
            title="Sign In to your account"
            backhref="/auth/login"
            backlabel="Already have an account? Login here!"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full name</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="johndoe123" {...field} />
                                    </FormControl>
                                    <FormMessage>
                                        {message.name}
                                    </FormMessage>
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
                                        <Input type="text" placeholder="example321@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage>
                                        {message.email}
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
                                        {message.password}
                                    </FormMessage>

                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="******" {...field} />
                                    </FormControl>
                                    <FormMessage>
                                        {message.confirmPassword}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button size="full" variant={"lime"} disabled={isLoading}>
                        <span className={clsx({ "hidden": isLoading, "block": !isLoading })}>Register</span>
                        <Loader className={clsx("animate-spin", {
                            "hidden": !isLoading,
                            "block": isLoading,
                        })} />
                    </Button>
                </form>
            </Form>
        </FormWrapper>
    )
}
