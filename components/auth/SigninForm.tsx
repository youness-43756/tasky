"use client"
interface FormProps {
    username: string,
    password: string, confirmPassword: string
}
import { useForm } from "react-hook-form"
import FormWrapper from "./FormWrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { loginSchema } from "@/formValidation/schema";
import { Loader } from "lucide-react";
import clsx from "clsx";
import toast from 'react-hot-toast';


const getUsernamesFromDB = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/accounts", {
            method: "GET",
            cache: "no-store"
        })
        return res.json();
    } catch (error) {
        console.log(error);
    }
}
export default function SigninForm() {
    const [isLoading, setisLoading] = useState(false);
    const [message, setMessage] = useState({ username: "", password: "", confirmPassword: "" })

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
            const allUsernames = await getUsernamesFromDB();
            let onlineUserUsername: string = "";
            if (allUsernames) {
                allUsernames.map((name: any) => {
                    if (name.username !== values.username) {
                        //? Out of Map()
                        return;
                    }
                    toast.error("Username already exists.")
                    return onlineUserUsername = name.username;
                });
                if (!onlineUserUsername) {
                    const formData = { username: values.username, password: values.password };
                    //! post data to database:
                    const res = await fetch("/api/accounts", {
                        method: "POST",
                        body: JSON.stringify({ formData }),
                        headers: {
                            "Content-type": "application/json",
                        },
                    });
                    if (!res.ok) {
                        throw new Error("Failed to create your account!");
                    }
                    toast.success("**Congratulations!** 🎉 You've successfully logged in. Welcome to our platform! 🌟")
                    form.reset();
                }
                setisLoading(prev => !prev);
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
                    <Button size="full" disabled={isLoading}>
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
