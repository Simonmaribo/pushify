import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/Popover'
import { cn, getInitials } from '@/helpers/utils'
import useWorkspace from '@/hooks/use-workspace'
import useWorkspaces from '@/hooks/use-workspaces'
import { PopoverClose } from '@radix-ui/react-popover'
import { useQueryClient } from '@tanstack/react-query'
import { Check, ChevronsUpDown, PlusCircleIcon } from 'lucide-react'
import { useRouter } from 'next/router'
import { useRef } from 'react'

export function WorkspaceDropdownPopover({
	children,
}: {
	children?: React.ReactNode
}) {
	const { workspace } = useWorkspace()
	const { workspaces } = useWorkspaces()
	const router = useRouter()
	const queryClient = useQueryClient()

	const ref = useRef<HTMLDivElement>(null)

	const switchWorkspace = (workspaceId: string) => {
		window.localStorage.setItem('lastWorkspaceId', workspaceId)
		router.push(`/app/${workspaceId}`)
		queryClient.clear()
	}

	if (!workspace) return null

	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent
				className={cn(
					'rounded-xl p-0 shadow-md border border-gray-600/10'
				)}
				style={{
					width: '210px',
				}}
				align="end"
			>
				<p className="text-xs font-medium ml-1 p-2 py-3 text-gray-600">
					Workspaces
				</p>
				<div className="flex flex-col gap-">
					{workspaces?.map((space, index) => (
						<PopoverClose
							asChild
							key={space.id}
							onClick={() => switchWorkspace(space.id)}
						>
							<div
								key={space.id}
								className={cn(
									'cursor-pointer p-2 px-4 flex items-center justify-between',
									space.id === workspace.id
										? index === workspaces.length - 1
											? 'bg-slate-50 border-t border-gray-600/10'
											: 'bg-slate-50 border-y border-gray-600/10'
										: 'hover:bg-slate-50'
								)}
							>
								<div className="flex items-center">
									<Avatar className="size-4 rounded-full">
										<AvatarImage
											src={`https://api.dicebear.com/7.x/initials/svg?backgroundType=gradientLinear&amp;fontFamily=Helvetica&amp;fontSize=40&amp;seed=${encodeURI(space?.name || '')}`}
										/>
										<AvatarFallback
											hash={getInitials(space.name)}
											className="rounded-full"
										/>
									</Avatar>
									<div className="ml-2 flex flex-col items-start">
										<p
											className={cn(
												'text-gray-800 text-xs font-medium line-clamp-1'
											)}
										>
											{space?.name}
										</p>
									</div>
								</div>
								{space.id === workspace.id ? (
									<div className="flex items-center">
										<Check
											size={16}
											className="text-gray-800"
										/>
									</div>
								) : null}
							</div>
						</PopoverClose>
					))}
					<PopoverClose
						asChild
						onClick={() => {
							// TODO: Create a workspace
							alert('Create a workspace - TODO')
						}}
					>
						<div
							className={cn(
								'rounded-b-xl cursor-pointer hover:bg-gray-50 p-2 py-3 border-t border-gray-600/10 flex items-center justify-center'
							)}
						>
							<div className="flex items-center gap-2 text-gray-600">
								<PlusCircleIcon strokeWidth={2} size={14} />
								<p
									className={cn(
										'text-xs font-medium line-clamp-1'
									)}
								>
									Create a Workspace
								</p>
							</div>
						</div>
					</PopoverClose>
				</div>
			</PopoverContent>
		</Popover>
	)
}

export default function WorkspaceDropdown() {
	const { workspace } = useWorkspace()

	if (!workspace) return null

	return (
		<WorkspaceDropdownPopover>
			<button className="sm:inline-flex flex items-center justify-between rounded-lg bg-white p-1.5 text-left text-sm transition-all duration-75 hover:bg-gray-100 focus:outline-none active:bg-gray-200">
				<div className="flex items-center space-x-3 pr-2">
					<Avatar className="size-8">
						<AvatarImage
							src={`https://api.dicebear.com/7.x/initials/svg?backgroundType=gradientLinear&amp;fontFamily=Helvetica&amp;fontSize=40&amp;seed=${encodeURI(workspace?.name || '')}`}
						/>
						<AvatarFallback>{workspace?.name}</AvatarFallback>
					</Avatar>
					<div className="flex items-center space-x-3 sm:flex">
						<span className="inline-block max-w-[100px] truncate text-sm font-medium sm:max-w-[200px]">
							{workspace?.name}
						</span>
						{/*<span className="max-w-fit rounded-full border px-2 py-px text-xs font-medium capitalize whitespace-nowrap border-black bg-black text-white">
							Free
						</span>*/}
					</div>
				</div>
				<ChevronsUpDown className="h-4 w-4 text-gray-400" />
			</button>
		</WorkspaceDropdownPopover>
	)
}
