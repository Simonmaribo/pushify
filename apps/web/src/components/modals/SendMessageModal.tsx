import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { Modal } from '../ui/Modal'
import Button from '../ui/Button'
import { useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormField, FormItem, FormMessage } from '../ui/Form'
import { FormInput } from '../ui/Input'
import http, { getError } from '@/queries/http'
import useWorkspace from '@/hooks/use-workspace'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter } from 'next/router'
import Loading from '@/components/ui/Loading'
import Alert from '@/components/ui/Alert'
import { WorkspaceItem } from '@/queries/user/getWorkspaces'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import getChannelList, {
	ChannelListItem,
} from '@/queries/workspace/channels/getChannelList'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '../ui/Select'
import { Label } from '../ui/Label'
import { BaseTextarea, FormTextarea } from '../ui/Textarea'
import { cn } from '@/helpers/utils'

export default NiceModal.create(({ channelId }: { channelId?: string }) => {
	const modal = useModal()
	const {
		workspace,
		isLoading: isWorkspaceLoading,
		isError: isWorkspaceError,
		error: workspaceError,
	} = useWorkspace()

	const {
		data: channels,
		isLoading: isChannelsLoading,
		isError: isChannelError,
		error: channelError,
	} = useQuery({
		queryKey: ['channels'],
		queryFn: async () =>
			await getChannelList({ workspaceId: workspace?.id }),
	})

	const isLoading = isWorkspaceLoading || isChannelsLoading
	const isError = isWorkspaceError || isChannelError
	const error = workspaceError || channelError

	return (
		<Modal
			modal={modal}
			className="font-medium p-0 gap-0"
			headerClassName="p-4 border-b"
			title="Send a message"
		>
			{isLoading ? (
				<div className="p-4 flex items-center justify-center">
					<Loading size="xs" />
				</div>
			) : isError || !workspace || !channels ? (
				<div className="p-4">
					<Alert title="Error" color="error">
						{`${error || 'An error occurred'}`}
					</Alert>
				</div>
			) : (
				<SendMessageModal
					workspace={workspace}
					channels={channels}
					channelId={channelId}
				/>
			)}
		</Modal>
	)
})

const schema = z.object({
	channelId: z.string(),
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
	url: z.union([
		z.string().url('URL must be a valid URL').optional(),
		z.literal(''),
	]),
})

type SendMessageModalProps = {
	workspace: WorkspaceItem
	channels: ChannelListItem[]
	channelId?: string
}

function SendMessageModal({
	workspace,
	channels,
	channelId,
}: SendMessageModalProps) {
	const [submitting, setSubmitting] = useState(false)
	const modal = useModal()

	const ref = useRef<HTMLTextAreaElement>(null)

	const [showAdvancedSettings, setShowAdvancedSettings] = useState(false)

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			channelId: channelId || '',
			title: '',
			body: '',
			url: '',
		},
	})

	async function onSubmit(data: z.infer<typeof schema>) {
		if (submitting) return
		setSubmitting(true)

		const promise = new Promise(async (resolve, reject) => {
			await http
				.post(`/workspace/${workspace.id}/send`, {
					message: {
						title: data.title,
						body: data.body,
						url: data.url,
					},
					channel: data.channelId,
					channelId: undefined,
				})
				.then(() => {
					modal.remove()
					resolve(data)
				})
				.catch((err) => {
					setSubmitting(false)
					reject(getError(err))
				})
		})

		toast.promise(promise, {
			loading: 'Sending message...',
			success() {
				return `Message sent to ${channel?.devices || 0} devices`
			},
			error(err) {
				return err
			},
		})
	}

	const channel = channels.find((c) => c.id === form.watch('channelId'))

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full flex flex-col gap-6 bg-neutral-50 p-4"
			>
				<FormField
					control={form.control}
					name="channelId"
					render={({ field }) => (
						<FormItem className="w-full flex flex-col">
							<FormItem className="font-normal">
								<Label>Channel</Label>
								<Select
									disabled={
										channelId || submitting ? true : false
									}
									onValueChange={(value) =>
										field.onChange(value)
									}
									defaultValue={field.value}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select board" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Boards</SelectLabel>
											{channels.map((channel) => (
												<SelectItem
													key={channel.id}
													value={channel.id}
												>
													{channel.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormItem>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="w-full flex flex-col">
							<FormInput
								{...field}
								label="Title"
								placeholder="💸 A new payment has been processed"
								disabled={submitting}
							/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="body"
					render={({ field }) => (
						<FormItem className="w-full flex flex-col">
							<Label>Message</Label>
							<BaseTextarea
								{...field}
								textAreaClassName="text-sm w-full font-normal min-h-[36px]"
								ref={ref}
								placeholder="John Doe has just placed an order for $100.00"
								onChange={(value) => {
									field.onChange(value)
									if (ref.current) {
										ref.current.style.height = 'auto'
										ref.current.style.height =
											ref.current.scrollHeight + 'px'
									}
								}}
							/>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div>
					<button
						type="button"
						className="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
						onClick={() =>
							setShowAdvancedSettings(!showAdvancedSettings)
						}
					>
						{showAdvancedSettings ? (
							<ChevronDown size={18} />
						) : (
							<ChevronRight size={18} />
						)}
						<p className="text-sm">Advanced options</p>
					</button>
					{showAdvancedSettings && (
						<div className="flex flex-col gap-4 mt-4">
							<FormField
								control={form.control}
								name="url"
								render={({ field }) => (
									<FormItem className="w-full flex flex-col">
										<FormInput
											{...field}
											label="URL (optional)"
											description="The URL to open when the user taps the notification"
											placeholder="https://example.com"
											disabled={submitting}
										/>
									</FormItem>
								)}
							/>
						</div>
					)}
				</div>

				<div className="flex gap-2">
					<Button
						className="flex-1"
						type="submit"
						loading={submitting}
						variant="secondary"
					>
						{channel
							? `Send message to ${channel.devices || 0} devices`
							: `Select a channel`}
					</Button>
				</div>
			</form>
		</Form>
	)
}
