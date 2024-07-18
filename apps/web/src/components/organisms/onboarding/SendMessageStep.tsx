import { useOnboarding } from '@/contexts/OnboardingContext'
import useWorkspace from '@/hooks/use-workspace'
import { useState } from 'react'
import CodeBlock from '../CodeBlock'
import { NODE_AXIOS } from '@/components/organisms/CodeBlock/code-examples/channel-api'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@/components/ui/Button'
import { Form } from '@/components/ui/Form'
import { toast } from 'sonner'
import { Pushify } from '@pushify/js'

const schema = z.object({
	title: z.union([
		z
			.string()
			.max(255, 'Title must be less than 178 characters')
			.optional(),
		z.literal(''),
	]),
	body: z.union([
		z
			.string()
			.max(2000, 'Body must be less than 2.000 characters')
			.optional(),
		z.literal(''),
	]),
})

export default function SendMessageStep() {
	const [submitting, setSubmitting] = useState(false)
	const { workspace } = useWorkspace()
	const { setStep, channel, apiKey, showAPIKey } = useOnboarding()
	const [success, setSuccess] = useState(false)

	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			title: '[STRIPE] New Payment',
			body: 'A new payment has been received from John Doe for $12.00',
		},
	})

	async function sendMessage(data: z.infer<typeof schema>) {
		if (submitting || success) return
		setSubmitting(true)
		const pushify = new Pushify({
			key: apiKey as string,
			baseURL: `http://localhost:5999`,
		})

		await pushify
			.send({
				channel: channel?.id as string,
				title: data.title as string,
				body: data.body as string,
			})
			.then(() => {
				setSubmitting(false)
				setSuccess(true)
				setStep(4)
			})
			.catch((error) => {
				setSubmitting(false)
				toast.error(error)
			})

		/*await http
			.post(`/workspace/${workspace?.id}/send`, {
				message: {
					title: data.title,
					body: data.body,
				},
				channel: channel?.id,
			})
			.then(() => {
				setSubmitting(false)
				setSuccess(true)
				setStep(4)
			})
			.catch((err) => {
				setSubmitting(false)
				toast.error(getError(err))
			})*/
	}

	return (
		<div className="flex flex-col gap-2">
			<p className="text-sm">
				Send a message using the API or using the dashboard. Lets test
				the connection that you have created.
			</p>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(sendMessage)}
					className="flex flex-col gap-2"
				>
					<CodeBlock
						className="mt-4"
						wrapLongLines={false}
						examples={[
							{
								language: 'nodejs',
								title: 'Node.js (With Axios)',
								code: NODE_AXIOS.replace(
									'[CHANNEL_ID]',
									channel?.id || 'c_12345678'
								)
									.replace(`[TITLE]`, form.getValues('title'))
									.replace(
										`[MESSAGE]`,
										form.getValues('body')
									)
									.replace(
										`[API_KEY]`,
										showAPIKey
											? apiKey || 'sk_12345678'
											: `•••••••••••••••••••••••••••••`
									),
							},
						]}
					/>
					<Button
						type="submit"
						variant="secondary"
						className="w-fit"
						loading={submitting}
						disabled={submitting || success}
					>
						Send test message
					</Button>
				</form>
			</Form>
		</div>
	)
}
