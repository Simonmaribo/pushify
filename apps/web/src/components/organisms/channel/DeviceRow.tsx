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
import http, { getError } from '@/queries/http'
import { Channel } from '@/queries/workspace/channels/getChannel'
import { useQueryClient } from '@tanstack/react-query'
import { MoreHorizontal, Trash } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function DeviceRow({
	item,
	channelId,
}: {
	item: Channel['subscribers'][0]
	channelId: string
}) {
	const [submitting, setSubmitting] = useState(false)
	const queryClient = useQueryClient()
	const { workspace } = useWorkspace()

	async function handleDelete() {
		if (submitting) return
		setSubmitting(true)
		await http
			.delete(
				`/workspace/${workspace?.id}/channels/${channelId}/devices/${item.id}`
			)
			.then(() => {
				queryClient.invalidateQueries({
					queryKey: ['channels', channelId],
				})
				toast.success('Device removed successfully')
			})
			.catch((error: any) => toast.error(getError(error)))
			.finally(() => setSubmitting(false))
	}

	return (
		<tr>
			<td className="py-3 h-10 truncate border-b border-gray-200 px-3 text-sm">
				<div className="group flex items-center gap-3">
					{item?.device?.devicePlatform == 'IOS' ? '' : '🤖'}
					<span className="max-w-[190px] truncate text-gray-800 font-bold">
						{item.device.deviceModelName}
					</span>
				</div>
			</td>
			<td className="h-10 truncate border-b border-gray-200 px-3 text-sm text-gray-500">
				<span className="max-w-[190px] truncate text-gray-800 font-medium">
					{item.device.deviceName || ' '}
				</span>
			</td>
			<td className="h-10 truncate border-b border-gray-200 px-3 text-sm text-gray-500">
				<span
					className={cn(
						'inline-flex select-none items-center whitespace-nowrap font-medium bg-[#0000330f] text-[#00005503]1 text-xs h-6 px-2 rounded',
						item.device.pushNotifications
							? 'bg-emerald-100 text-emerald-900'
							: 'bg-rose-100 text-rose-900'
					)}
				>
					{item.device.pushNotifications
						? 'Activated'
						: 'Not activated'}
				</span>
			</td>
			<td className="h-10 truncate border-b border-gray-200 px-3 text-sm text-gray-500">
				<Tooltip content={prettyDate(item.createdAt)}>
					<time
						className="text-current"
						dateTime={new Date(item.createdAt)?.toISOString()}
					>
						{timeDifference(new Date(), new Date(item.createdAt))}{' '}
						ago
					</time>
				</Tooltip>
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
						<DropdownMenuItem
							className="text-rose-500 hover:text-rose-700 focus:text-rose-700"
							onClick={handleDelete}
						>
							<Trash className="mr-2 h-4 w-4" />
							<span>Remove device</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</td>
		</tr>
	)
}
