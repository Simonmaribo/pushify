import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/Dropdown'
import Tooltip from '@/components/ui/Tooltip'
import { prettyDate, timeDifference } from '@/helpers/date'
import { cn } from '@/helpers/utils'
import useWorkspace from '@/hooks/use-workspace'
import { MdOutlineQrCodeScanner } from 'react-icons/md'
import { Channel } from '@/queries/workspace/channels/getChannel'
import { useQueryClient } from '@tanstack/react-query'
import { MoreHorizontal, Trash } from 'lucide-react'
import { useState } from 'react'
import { FaToggleOff, FaToggleOn } from 'react-icons/fa'
import http, { getError } from '@/queries/http'
import { toast } from 'sonner'

export default function SubscriptionCodeRow({
	item,
}: {
	item: Channel['codes'][0]
}) {
	const [submitting, setSubmitting] = useState(false)
	const queryClient = useQueryClient()
	const { workspace } = useWorkspace()

	async function handleDelete() {
		if (submitting) return
		setSubmitting(true)
		await http
			.delete(
				`/workspace/${workspace?.id}/channels/${item.channelId}/code/${item.id}`
			)
			.then(() => {
				queryClient.invalidateQueries({
					queryKey: ['channels', item.channelId],
				})
				toast.success('Code removed successfully')
			})
			.catch((error) => toast.error(getError(error)))
			.finally(() => setSubmitting(false))
	}

	async function handleToggle(type: 'disable' | 'enable') {
		if (submitting) return
		setSubmitting(true)
		await http
			.post(
				`/workspace/${workspace?.id}/channels/${item.channelId}/code/${item.id}/toggle`
			)
			.then(() => {
				queryClient.invalidateQueries({
					queryKey: ['channels', item.channelId],
				})
				toast.success(
					`Code ${type === 'disable' ? 'disabled' : 'enabled'} successfully`
				)
			})
			.catch((error) => toast.error(getError(error)))
			.finally(() => setSubmitting(false))
	}

	return (
		<tr>
			<td className="py-3 h-10 truncate border-b border-gray-200 px-3 text-sm">
				<div className="group flex items-center gap-3">
					<MdOutlineQrCodeScanner
						size={24}
						className={cn('text-gray-700')}
					/>
					<span className="max-w-[190px] truncate text-gray-800 font-bold">
						{item.code}
					</span>
				</div>
			</td>
			<td className="h-10 truncate border-b border-gray-200 px-3 text-sm text-gray-500">
				<span className="inline-flex select-none items-center whitespace-nowrap font-medium bg-[#0000330f] text-[#00005503]1 text-xs h-6 px-2 rounded">
					{item.default
						? 'Default code'
						: item.expiresAt
							? `In ${timeDifference(new Date(item.expiresAt), new Date())}`
							: 'Never'}
				</span>
			</td>
			<td className="h-10 truncate border-b border-gray-200 px-3 text-sm text-gray-500">
				<span
					className={cn(
						'inline-flex select-none items-center whitespace-nowrap font-medium bg-[#0000330f] text-[#00005503]1 text-xs h-6 px-2 rounded',
						item.enabled
							? 'bg-emerald-100 text-emerald-900'
							: 'bg-rose-100 text-rose-900'
					)}
				>
					{item.enabled ? 'Enabled' : 'Disabled'}
				</span>
			</td>
			<td className="text-right h-10 truncate border-b border-gray-200 px-3 text-sm text-gray-500">
				<button data-state="closed" className="cursor-auto">
					<Tooltip content={prettyDate(item.createdAt)}>
						<time
							className="text-current"
							dateTime={new Date(item.createdAt)?.toISOString()}
						>
							{timeDifference(
								new Date(),
								new Date(item.createdAt)
							)}{' '}
							ago
						</time>
					</Tooltip>
				</button>
			</td>
			<td className="text-center h-10 truncate border-b border-gray-200 px-3 text-sm">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button
							className="h-6 w-6 rounded bg-transparent border-none text-[#00005503]1 hover:bg-[#0009321f] dark:hover:bg-[#0009321f] focus-visible:bg-gray-200 disabled:hover:bg-[#00005503] inline-flex items-center justify-center border disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 focus-visible:ring-2 focus-visible:ring-[#00062e32] focus-visible:outline-none cursor-pointer align-middle"
							type="button"
						>
							<MoreHorizontal size={15} />
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						{!item.default && (
							<DropdownMenuItem
								className="text-rose-500 hover:text-rose-700 focus:text-rose-700"
								onClick={handleDelete}
							>
								<Trash className="mr-2 h-4 w-4" />
								<span>Remove code</span>
							</DropdownMenuItem>
						)}
						{item.default && item.enabled == true ? (
							<DropdownMenuItem
								onClick={() => handleToggle('disable')}
							>
								<FaToggleOff className="mr-2 h-4 w-4" />
								<span>Disable code</span>
							</DropdownMenuItem>
						) : item.default && item.enabled == false ? (
							<DropdownMenuItem
								onClick={() => handleToggle('enable')}
							>
								<FaToggleOn className="mr-2 h-4 w-4" />
								<span>Enable code</span>
							</DropdownMenuItem>
						) : null}
					</DropdownMenuContent>
				</DropdownMenu>
			</td>
		</tr>
	)
}
