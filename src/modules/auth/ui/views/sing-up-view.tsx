"use client"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { OctagonAlertIcon } from 'lucide-react'
import Link from 'next/link'

import { Input } from '@/components/ui/input'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertTitle } from '@/components/ui/alert'
import { useForm } from 'react-hook-form'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { TypeOf } from 'zod/v3'


const formSchema = z.object({
    name: z.string().min(1, { message: "name is required" }),
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is Required" }),
    confirmPassword: z.string().min(1, { message: "Password is Required" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords Don't match",
    path: ["confirmPassword"]
});
export const SignUpView = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setError(null);
        setLoading(true);
        const { error } = await authClient.signUp.email(
            {
                name: data.name,
                email: data.email,
                password: data.password
            },
            {
                onSuccess: () => {
                    setLoading(false);
                    router.push("/");
                },
                onError: ({ error }) => {
                    setLoading(false);
                    setError(error.message);
                }
            }
        )

    };
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    });
    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form className='p-6 md:p-8' onSubmit={form.handleSubmit(onSubmit)}>
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col items-center text-center'>
                                    <h1 className='text-2xl font-bold'>
                                        Let&apos;t get started
                                    </h1>
                                    <p className='text-muted-foreground text-balanced'>
                                        Create Your Account
                                    </p>
                                </div>
                                <div className='grid gap-3'>
                                    <FormField control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input type='text'
                                                        placeholder='Your Name' {...field}></Input>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}>

                                    </FormField>
                                </div>
                                <div className='grid gap-3'>
                                    <FormField control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type='email'
                                                        placeholder='m@example.com' {...field}></Input>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}>

                                    </FormField>
                                </div>
                                <div className='grid gap-3'>
                                    <FormField control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type='password'
                                                        placeholder='********' {...field}></Input>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}>

                                    </FormField>
                                </div>
                                <div className='grid gap-3'>
                                    <FormField control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input type='password'
                                                        placeholder='********' {...field}></Input>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}>

                                    </FormField>
                                </div>
                                {!!error && (<Alert className='bg-destructive/10 border-none'>
                                    <OctagonAlertIcon className='h-4 w-4 !text-destructive' />
                                    <AlertTitle>{error}</AlertTitle>
                                </Alert>)}
                                <Button type='submit' className='w-full ' disabled={loading}>Sign In</Button>
                                <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                                    <span className='bg-card text-muted-foreground relative z-10 px-2'>
                                        or continue with
                                    </span>
                                </div>
                                <div className='grid grid-cols-2 gap-4'>
                                    <Button variant="outline"
                                        type="button"
                                        className='w-full' disabled={loading}>
                                        Google
                                    </Button>
                                    <Button variant="outline"
                                        type="button"
                                        className='w-full' disabled={loading}>
                                        GitHub
                                    </Button>
                                </div>
                                <div className='text-center text-sm'>
                                    Already a user ?{" "} <Link href={"/sign-in"} className='underline underline-offset-4'>Sign In</Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                    <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
                        <img src='/logo.svg' alt="Logo" className="h-[92px] w-[92px]">
                        </img>
                        <p className="text-2xl font-semibold text-white">Neural Meet</p>
                    </div>
                </CardContent>
            </Card>
            <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
                By clicking continue, you agree to our <Link href='#'>Terms of Service</Link> and <Link href='#'>Privacy Policy</Link>.
            </div>
        </div>
    )
}