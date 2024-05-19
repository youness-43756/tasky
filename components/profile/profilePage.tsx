"use client"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormProps, ProfilePageProps } from "@/lib/dataType/dType";
import { LoginButton } from "../auth/login-button";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import clsx from "clsx";

export default function ProfilePage({ data }: ProfilePageProps) {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm({
        defaultValues: {
            name: data?.name,
            email: data?.email,
            image: ""
        }
    });
    const onsubmit = async (values: FormProps) => {
        //? Optional Chaining and Nullish Coalescing: Use optional chaining (?.) and nullish coalescing (??) to handle cases where values.image might be undefined.

        let newImage: string = "";
        setIsLoading(prev => !prev);

        if (!values.email || !values.name) {
            toast.error('')
            setIsLoading(prev => !prev);
            return;
        }
        if (values.image) {
            const img: string[] = values.image.split("\\") ?? [];
            const lastEl: string = img.pop() ?? "";
            newImage = lastEl;
        }

        try {
            const res = await fetch('/api/auth/updateProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...values, id: data.id, image: newImage ? newImage : data.image }),
            });
            if (!res.ok) {
                setIsLoading(prev => !prev);
                console.error(res);
                toast.error("Invalid Info");
                return;
            }
            const result = await res.json();
            setIsLoading(prev => !prev);
            console.log(result);
            toast.success(result.message);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <main className=' min-h-screen py-4'>
            <h1 className="sm:text-3xl font-medium mb-10">Update profile</h1>

            <LoginButton mode="dashboard">
                <Button>Back</Button>
            </LoginButton>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
                    <div className="gap-2 grid grid-cols-2">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full name</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="name" {...field} />
                                        </FormControl>
                                        <FormMessage>
                                            {/* {message.password && message.password} */}
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
                                            <Input type="text" placeholder="example321@gmail.com..."  {...field} />
                                        </FormControl>
                                        <FormMessage>
                                            {/* {message.email && message.email} */}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />

                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <FormControl>
                                            <Input type="file" {...field} />
                                        </FormControl>
                                        <FormMessage>
                                            {/* {message.password && message.password} */}
                                        </FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <Button variant={"lime"} disabled={isLoading}>
                        {/* <span className={clsx({ "hidden": isLoading, "block": !isLoading })}>Update</span>
                        <LoaderCircle className={clsx("animate-spin", {
                            "hidden": !isLoading,
                            "block": isLoading,
                        })} /> */}
                        <LoaderCircle className={clsx("animate-spin mr-2 h-5 w-5", {
                            "hidden": !isLoading,
                            "block": isLoading,
                        })} />
                        Update
                    </Button>
                </form>
            </Form>
        </main>
    )
}
