import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { Modal } from '../ui/Modal'
import Button from '../ui/Button'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormField, FormItem } from '../ui/Form'
import { FormInput } from '../ui/Input'
import http, { getError } from '@/queries/http'
import useWorkspace from '@/hooks/use-workspace'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter } from 'next/router'
import Loading from '@/components/ui/Loading'
import Alert from '@/components/ui/Alert'
import { WorkspaceItem } from '@/queries/user/getWorkspaces'

export default NiceModal.create(() => {
	const modal = useModal()
	const {
		workspace,
		isLoading: isWorkspaceLoading,
		isError: isWorkspaceError,
		error: workspaceError,
	} = useWorkspace()

	return (
		<Modal
			modal={modal}
			className="font-medium p-0 gap-0"
			headerClassName="p-4 border-b"
			title="Add Channel"
		>
			{isWorkspaceLoading ? (
				<div className="p-4 flex items-center justify-center">
					<Loading size="xs" />
				</div>
			) : isWorkspaceError || !workspace ? (
				<div className="p-4">
					<Alert title="Error" color="error">
						{`${workspaceError || 'An error occurred'}`}
					</Alert>
				</div>
			) : (
				<CreateChannelModal workspace={workspace} modal={modal} />
			)}
		</Modal>
	)
})

const schema = z.object({
	name: z.union([
		z
			.string()
			.max(255, 'Domain must be less than 255 characters')
			.optional(),
		z.literal(''),
	]),
})

type CreateWebsiteModalProps = {
	workspace: WorkspaceItem
	modal: ReturnType<typeof useModal>
}

function CreateChannelModal({ workspace, modal }: CreateWebsiteModalProps) {
	const [submitting, setSubmitting] = useState(false)
	const queryClient = useQueryClient()
	const router = useRouter()

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
		},
	})

	async function onSubmit(data: z.infer<typeof schema>) {
		if (submitting) return
		setSubmitting(true)

		const promise = new Promise(async (resolve, reject) => {
			await http
				.post(`/workspace/${workspace.id}/channels`, {
					...data,
				})
				.then(
					({
						data,
					}: {
						data: {
							id: string
						}
					}) => {
						queryClient.invalidateQueries({
							queryKey: ['channels'],
						})
						modal.remove()
						router.push(`/app/${workspace.id}/channels/${data.id}`)
						resolve(data)
					}
				)
				.catch((err) => {
					setSubmitting(false)
					reject(getError(err))
				})
		})

		toast.promise(promise, {
			loading: 'Creating channel...',
			success() {
				return 'Channel created'
			},
			error(err) {
				return err
			},
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full flex flex-col gap-6 bg-neutral-50 p-8"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="w-full flex flex-col">
							<FormInput
								{...field}
								label="Channel Name"
								placeholder="Water Plants Notifications"
								disabled={submitting}
							/>
						</FormItem>
					)}
				/>

				<div className="flex gap-2">
					<Button
						className="flex-1"
						type="submit"
						loading={submitting}
						variant="secondary"
					>
						Create channel
					</Button>
				</div>
			</form>
		</Form>
	)
}
