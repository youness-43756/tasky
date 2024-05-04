"use client"
import { useRouter } from "next/navigation";
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

export default function LoginForm() {
    const [isLoading, setisLoading] = useState(false);

    const form = useForm({
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: ""
        }
    })
    const [message, setMessage] = useState({ username: "", password: "" });

    const onsubmit = async (values: FormProps) => {
        const validation = loginSchema(values);
        if (validation.username === "" && validation.password === "") {
            const formData = { username: values.username, password: values.password }
            setMessage(validation);
            setisLoading(prev => !prev);

            //!
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            })

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
        } else {
            setMessage(validation);
        }

    }
    return (
        <FormWrapper
            title="Login"
            backhref="/auth/sign-in"
            backlabel="Don't have an account? Create one!"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="username..." {...field} />
                                    </FormControl>
                                    <FormMessage>
                                        {message.username && message.username}
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


