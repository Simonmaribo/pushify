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
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { FaGoogle } from 'react-icons/fa'

const schema = z.object({
	email: z.string().email(),
	password: z.string(),
	cfToken: z.string(),
})

export default function LoginPage() {
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const { user } = useUser({
		redirectIfFound: true,
		redirectTo: '/app',
	})

	const router = useRouter()

	const { error: ssoError } = router.query as { error: string }

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: '',
			password: '',
			cfToken: process.env.NODE_ENV !== 'development' ? '' : 'test',
		},
	})

	async function onSubmit(data: z.infer<typeof schema>) {
		setError(null)
		if (submitting) return
		setSubmitting(true)
		await http
			.post(`/user/auth/signin`, data)
			.then((res) => {
				if (res.status === 200) {
					toast.success('Logged in successfully.')
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
		<div className="h-screen w-full bg-white">
			<Meta
				title="Sign in • Toolbird"
				description="All the tools your tech startup needs to start, scale and run - in one platform only"
			/>
			<div className="flex items-center h-full justify-center lg:grid lg:grid-cols-[560px_1fr]">
				<div className="flex items-center justify-center w-full">
					<div className="w-[100%] flex flex-col gap-10 max-w-md p-6 relative">
						<div className="flex">
							<Link href="https://pushify.net">
								<img
									className="w-[120px]"
									src="/logos/logo.png"
									alt="Pushify Logo"
								/>
							</Link>
						</div>{' '}
						<div>
							<h2 className="text-2xl heading mb-2 font-semibold text-gray-800">
								Sign in to Pushify
							</h2>
						</div>
						{(error || ssoError) && (
							<Alert color="error">{error || ssoError}</Alert>
						)}
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="w-full flex flex-col gap-4"
							>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem className="w-full text-sm font-regular">
											<FormInput
												{...field}
												type="email"
												label="Email address"
												placeholder="example@toolbird.io"
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
									className="mt-4 rounded-full font-regular bg-gray-800"
									disabled={!form.getValues().cfToken}
									loading={submitting}
								>
									Sign In
								</Button>
								<ContentDivider className="text-xs">
									Or sign in with
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
									Sign in with Google
								</Button>
								<p className="text-sm font-normal text-center text-gray-600">
									No account yet?{' '}
									<span>
										<Link
											className="text-gray-800 font-medium"
											href={'/app/auth/register'}
										>
											Sign up for free
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
						alt="Onboarding Screen"
					/>
				</div>
			</div>
		</div>
	)
}
