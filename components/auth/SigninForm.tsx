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

export default function SigninForm() {
    const route = useRouter()
    const [message, setMessage] = useState({ username: "", password: "", confirmPassword: "" })
    const [isLoading, setisLoading] = useState(false);

    const form = useForm({
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
        }
    })
    const onsubmit = async (values: FormProps) => {
        const validation = loginSchema(values);
        if (validation.username === "" && validation.password === "" && validation.confirmPassword === ""
            && values.password === values.confirmPassword
        ) {
            setMessage(validation);
            setisLoading(prev => !prev);
            const formData: object = { username: values.username, password: values.password }
            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    toast.error(errorData.message);
                    setisLoading(prev => !prev);
                    return;
                }
                const data = await response.json();
                if (!data.success) {
                    toast.error(data.message);
                    setisLoading(prev => !prev);
                    return;
                }
                toast.success(data.message);
                form.reset();
                setisLoading(prev => !prev);
            } catch (error: any) {
                console.error('Registration failed:', error.message);
            }
        } else {
            setMessage(validation);
        }
    }
    return (
        <FormWrapper
            title="Sign In"
            backhref="/"
            backlabel="Already have an account? Login here!"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="johndoe123" {...field} />
                                    </FormControl>
                                    <FormMessage>
                                        {message.username}
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
