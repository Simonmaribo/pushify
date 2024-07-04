import Meta from '@/components/layouts/Meta'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import { ContentDivider } from '@/components/ui/ContentDivider'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/Form'
import { FormInput } from '@/components/ui/Input'
import useUser from '@/hooks/use-user'
import signinWithGoogle from '@/queries/user/signinWithGoogle'
import http, { getError } from '@/queries/http'
import { zodResolver } from '@hookform/resolvers/zod'
import { Turnstile } from '@marsidev/react-turnstile'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaGoogle } from 'react-icons/fa'
import { toast } from 'sonner'
import * as z from 'zod'

const schema = z
	.object({
		email: z.string().email({ message: 'Invalid email' }),
		name: z.string(),
		password: z
			.string()
			.min(6, { message: 'Must be at least 6 characters' }),
		confirmPassword: z.string(),
		cfToken: z.string({
			required_error: 'Invalid captcha token',
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})

export default function RegisterPage() {
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const { user } = useUser({
		redirectIfFound: true,
		redirectTo: '/app',
	})

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: '',
			name: '',
			password: '',
			confirmPassword: '',
			cfToken: process.env.NODE_ENV !== 'development' ? '' : 'test',
		},
	})

	async function onSubmit(data: z.infer<typeof schema>) {
		setError(null)
		if (submitting) return
		setSubmitting(true)
		await http
			.post(`/user/auth/signup`, data)
			.then((res) => {
				if (res.status === 200) {
					toast.success('Account created successfully.')
					window.location.href = '/app'
				}
			})
			.catch((error) => {
				form.setValue('password', '')
				setError(getError(error))
			})
			.finally(() => setSubmitting(false))
	}

	form.watch('cfToken')
	form.watch((data) => {
		setError(null)
	})

	return (
		<div className="h-full md:h-screen w-full bg-white">
			<Meta
				title="Register • Pushify"
				description="All the tools your tech startup needs to start, scale and run - in one platform only"
			/>
			<div className="flex items-center h-full justify-center lg:grid lg:grid-cols-[560px_1fr]">
				<div className="flex items-center justify-center w-full">
					<div className="w-[100%] rounded-xl flex flex-col justify-center gap-10 max-w-md p-6">
						<div className="flex">
							<Link href="https://pushify.net">
								<img
									className="w-[120px]"
									alt="Pushify Logo"
									src="/logos/logo.png"
								/>
							</Link>
						</div>
						<div>
							<h2 className="text-2xl heading font-semibold mb-2 text-gray-800">
								Sign up to Pushify
							</h2>
						</div>
						{error && <Alert color="error">{error}</Alert>}
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="w-full flex flex-col gap-4"
							>
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem className="w-full text-sm font-regular">
											<FormInput
												{...field}
												type="text"
												label="Name"
												placeholder="James Doe"
												disabled={submitting}
												required
											/>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem className="w-full text-sm font-regular">
											<FormInput
												{...field}
												type="email"
												label="Email Address"
												placeholder="jamessmith@gmail.com"
												disabled={submitting}
												required
											/>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem className="w-full text-sm font-regular">
											<FormInput
												{...field}
												type="password"
												label="Password"
												placeholder="••••••••••"
												disabled={submitting}
												required
											/>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="confirmPassword"
									render={({ field }) => (
										<FormItem className="w-full text-sm font-regular">
											<FormInput
												{...field}
												type="password"
												label="Confirm Password"
												placeholder="••••••••••"
												disabled={submitting}
												required
											/>
										</FormItem>
									)}
								/>
								{process.env.NODE_ENV !== 'development' && (
									<FormField
										control={form.control}
										name="cfToken"
										render={({ field }) => (
											<div>
												<Turnstile
													siteKey={`${process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}`}
													onError={() => {
														toast.error(
															'Failed to load reCAPTCHA.'
														)
													}}
													onErrorCapture={() => {
														toast.error(
															'Failed to load reCAPTCHA.'
														)
													}}
													onSuccess={(token) => {
														field.onChange(token)
													}}
												/>
												<FormMessage />
											</div>
										)}
									/>
								)}
								<Button
									type="submit"
									variant={'secondary'}
									className="mt-4 rounded-full"
									disabled={!form.getValues().cfToken}
									loading={submitting}
								>
									Create account
								</Button>
								<ContentDivider className="text-xs text-gray-200">
									Or create account with Google
								</ContentDivider>
								<Button
									className="border-gray-600/10 rounded-full text-gray-600"
									type="button"
									variant="outline"
									before={
										<FaGoogle className="text-gray-800 w-4" />
									}
									onClick={signinWithGoogle}
								>
									Register with Google
								</Button>
								<p className="text-sm text-center font-normal text-gray-600">
									Already have an account?{' '}
									<span>
										<Link
											className="text-gray-800 font-medium"
											href={'/app/auth/login'}
										>
											Sign in
										</Link>
									</span>
								</p>
							</form>
						</Form>
					</div>
				</div>
				<div className="w-full hidden lg:flex h-screen border-l border-gray-600/10">
					<img
						className="h-full w-full object-cover"
						src="/onboarding-screens/large.webp"
						alt="Pushify Onboarding"
					/>
				</div>
			</div>
		</div>
	)
}
