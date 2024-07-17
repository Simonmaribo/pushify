import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { Modal } from '../ui/Modal'
import { toast } from 'sonner'
import { useState } from 'react'
import Button from '../ui/Button'
import Copyable from '../molecules/Copyable'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem } from '../ui/Form'
import { FormInput } from '../ui/Input'
import http, { getError } from '@/queries/http'
import useWorkspace from '@/hooks/use-workspace'

const schema = z.object({
	name: z.string().max(50, 'Name is too long').nonempty('Name is required'),
})

export default NiceModal.create(() => {
	const modal = useModal()
	const { workspace } = useWorkspace()
	const [submitting, setSubmitting] = useState(false)
	const [apiKey, setAPIKey] = useState<string | null>(null)

	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
		},
	})

	async function handleSubmit(data: z.infer<typeof schema>) {
		if (submitting) return
		setSubmitting(true)
		await http
			.post(`/workspace/${workspace?.id}/api`, data)
			.then((res) => {
				if (res.data.key) {
					setAPIKey(res.data.key)
				}
			})
			.catch((error) => {
				toast.error(getError(error))
				setSubmitting(false)
			})
	}

	return (
		<Modal modal={modal} className="p-0" headerClassName="px-6 pt-6">
			{apiKey ? (
				<>
					<div className="text-center p-8 flex flex-col gap-2 items-center justify-center">
						<h2 className="text-2xl font-semibold text-slate-900">
							API Key created
						</h2>
						<p className="text-gray-500 text-sm max-w-xs mx-auto">
							For security reasons, this key will not be shown
							again. Please copy it now.
						</p>
					</div>
					<div className="bg-slate-50 border-t border-gray-300 p-4 gap-2">
						<div className="mx-auto max-w-xs flex flex-col items-center justify-center gap-4">
							<div className="p-3.5 border border-gray-300 bg-white rounded-lg w-full flex items-center justify-between">
								<p className="text-gray-500 text-sm">
									{apiKey}
								</p>
								<Copyable text={apiKey} />
							</div>
							<Button
								onClick={() => modal.remove()}
								variant="secondary"
								className="w-full"
							>
								Done
							</Button>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="text-center p-8 flex flex-col gap-2 items-center justify-center">
						<h2 className="text-2xl font-semibold text-slate-900">
							Create API Key
						</h2>
						<p className="text-gray-500 text-sm max-w-xs mx-auto">
							Please enter a name for your API Key to distinguish
							it from others.
						</p>
					</div>
					<div className="bg-slate-50 border-t border-gray-300 p-4 gap-2">
						<Form {...form}>
							<form
								className="mx-auto max-w-xs flex flex-col items-center justify-center gap-4"
								onSubmit={form.handleSubmit(handleSubmit)}
							>
								<FormField
									name="name"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormInput
												{...field}
												placeholder="API Key Name"
											/>
										</FormItem>
									)}
								/>
								<Button
									type="submit"
									variant="secondary"
									className="w-full"
									loading={submitting}
									disabled={submitting}
								>
									Create
								</Button>
							</form>
						</Form>
					</div>
				</>
			)}
		</Modal>
	)
})
