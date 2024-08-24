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
import { APIListItem } from '@/queries/workspace/api/getAPIKeys'
import { useQueryClient } from '@tanstack/react-query'
import { MoreHorizontal, Trash } from 'lucide-react'
import { useState } from 'react'
import { IoDocumentLockOutline } from 'react-icons/io5'
import { toast } from 'sonner'

export default function APIListRow({ item: key }: { item: APIListItem }) {
	const [submitting, setSubmitting] = useState(false)
	const queryClient = useQueryClient()
	const { workspace } = useWorkspace()

	async function handleDelete() {
		if (submitting) return
		setSubmitting(true)
		await http
			.delete(`/workspace/${workspace?.id}/api/${key.id}`)
			.then(() => {
				toast.success('API Key removed successfully')
				queryClient.invalidateQueries({
					queryKey: ['api-keys'],
				})
			})
			.catch((error: any) => {
				toast.error(getError(error))
			})
	}

	return (
		<tr>
			<td className="py-3 h-10 truncate border-b border-gray-200 px-3 text-sm">
				<div className="group flex items-center gap-3">
					<IoDocumentLockOutline
						size={24}
						className={cn(
							'text-gray-700',
							key.lastUsedAt && 'text-emerald-600'
						)}
					/>
					<span className="max-w-[190px] truncate">{key.name}</span>
				</div>
			</td>
			<td className="h-10 truncate border-b border-gray-200 px-3 text-sm text-gray-500">
				<span className="inline-flex select-none items-center whitespace-nowrap font-medium bg-[#0000330f] text-[#00005503]1 text-xs h-6 px-2 rounded">
					{key.key}
				</span>
			</td>
			<td className="h-10 truncate border-b border-gray-200 px-3 text-sm">
				{key.permission}
			</td>
			<td className="h-10 truncate border-b border-gray-200 px-3 text-sm">
				<div className="flex items-center gap-2">
					<button data-state="closed" className="cursor-auto">
						<Tooltip
							content={
								key.lastUsedAt
									? prettyDate(key.lastUsedAt)
									: undefined
							}
						>
							<time
								className="text-current"
								dateTime={
									key.lastUsedAt
										? new Date(key.lastUsedAt).toISOString()
										: ''
								}
							>
								{key.lastUsedAt
									? `${timeDifference(
											new Date(),
											new Date(key.lastUsedAt)
										)} ago`
									: `Never`}
							</time>
						</Tooltip>
					</button>
				</div>
			</td>
			<td className="text-right h-10 truncate border-b border-gray-200 px-3 text-sm">
				<button data-state="closed" className="cursor-auto">
					<Tooltip content={prettyDate(key.createdAt)}>
						<time
							className="text-current"
							dateTime={new Date(key.createdAt)?.toISOString()}
						>
							{timeDifference(
								new Date(),
								new Date(key.createdAt)
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
						<DropdownMenuItem
							className="text-rose-500 hover:text-rose-700 focus:text-rose-700"
							onClick={handleDelete}
						>
							<Trash className="mr-2 h-4 w-4" />
							<span>Remove API Key</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</td>
		</tr>
	)
}
