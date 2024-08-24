import Button from '@/components/ui/Button'
import { Form, FormField, FormItem } from '@/components/ui/Form'
import { FormInput } from '@/components/ui/Input'
import { useOnboarding } from '@/contexts/OnboardingContext'
import useWorkspace from '@/hooks/use-workspace'
import http, { getError } from '@/queries/http'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaMobile } from 'react-icons/fa'
import { toast } from 'sonner'
import * as z from 'zod'
import { IoWarningOutline } from 'react-icons/io5'
import Tooltip from '@/components/ui/Tooltip'

const schema = z.object({
	name: z.string().nonempty('Name is required'),
})

export default function ChannelStep() {
	const [submitting, setSubmitting] = useState(false)
	const { workspace } = useWorkspace()
	const queryClient = useQueryClient()
	const { setStep, channel, setChannel } = useOnboarding()

	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
		},
	})

	async function createChannel(formData: z.infer<typeof schema>) {
		if (submitting) return
		setSubmitting(true)
		await http
			.post(`/workspace/${workspace?.id}/channels`, {
				...formData,
			})
			.then(
				({
					data,
				}: {
					data: {
						id: string
						name: string
						code: string
					}
				}) => {
					queryClient.invalidateQueries({
						queryKey: ['channels'],
					})
					setChannel(data)
					setStep(2)
				}
			)
			.catch((err: any) => {
				setSubmitting(false)
				toast.error(getError(err))
			})
	}

	return (
		<div className="flex flex-col gap-2">
			<p className="text-sm">
				Create a channel to start receiving messages. A channel is a
				connection between your workspace and a device. A channel can be
				subscribed to by multiple devices.
			</p>

			{!channel ? (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(createChannel)}
						className="flex flex-col gap-2"
					>
						<FormField
							name="name"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormInput
										{...field}
										label="Channel Name"
										placeholder="Stripe Alerts"
										className="rounded-xl"
									/>
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							variant="secondary"
							disabled={submitting}
							loading={submitting}
							className="flex-0 w-fit"
						>
							<div className="flex items-center gap-2">
								<FaMobile size={16} />
								<span>Create channel</span>
							</div>
						</Button>
					</form>
				</Form>
			) : (
				<>
					<div className="p-4 rounded-xl shadow-sm bg-white border border-gray-600/10 transition-all">
						<div className="flex items-center justify-between">
							<div className="flex gap-3 items-start">
								<div className="size-8 rounded-xl flex items-center justify-center bg-main-600">
									<FaMobile
										size={16}
										className="text-white"
									/>
								</div>
								<div>
									<h3 className="text-sm font-semibold text-gray-800">
										{channel.name}
									</h3>
									<p className="text-xs text-gray-600">
										Permanent subscription code:{' '}
										{channel.code}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="flex">
						<Tooltip
							className="bg-gray-800"
							jsx={
								<div className="max-w-[500px] text-white">
									<p className="text-xs">
										By default, a permanent subscription
										code is created for devices to connect
										to the channel. With this code anyone
										can receive the messages you send. You
										can disabled this code and create
										temporary subscription codes in the
										channel settings.
									</p>
								</div>
							}
						>
							<p className="text-rose-500 text-sm font-semibold flex items-center gap-1">
								Security risk!
								<IoWarningOutline />
							</p>
						</Tooltip>
					</div>
				</>
			)}
		</div>
	)
}
