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

export default function LoginForm() {
    const form = useForm({
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: ""
        }
    })
    const [message, setMessage] = useState({ username: "", password: "" });

    const onsubmit = (values: FormProps) => {
        const validation = loginSchema(values);
        if (validation.username === "" && validation.password === "") {
            const formData = { username: values.username, password: values.password }
            setMessage(validation);
            form.reset();
            console.log("Send to database: ", formData);
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
                    <Button size={"full"} variant={"sky"}>submit</Button>
                </form>
            </Form>
        </FormWrapper >
    )
}


