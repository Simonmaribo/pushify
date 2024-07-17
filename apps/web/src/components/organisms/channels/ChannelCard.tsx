import CreateSubscriptionCodeModal from '@/components/modals/CreateSubscriptionCodeModal'
import SendMessageModal from '@/components/modals/SendMessageModal'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/Dropdown'
import NiceModal from '@ebay/nice-modal-react'
import { MessageCircle, MoreVertical } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaMobile } from 'react-icons/fa'
import { MdOutlineQrCodeScanner } from 'react-icons/md'

type ChannelCardProps = {
	id: string
	name: string
	devices: number
	messages: number
	lastMessageDate: Date | null
}

export default function ChannelCard(props: ChannelCardProps) {
	const router = useRouter()
	return (
		<Link
			href={{
				pathname: '/app/[workspaceId]/channels/[channelId]',
				query: {
					channelId: props.id,
					workspaceId: router.query.workspaceId,
				},
			}}
			className="p-4 rounded-xl shadow-sm hover:border-gray-200 cursor-pointer bg-white border border-gray-600/10 transition-all"
		>
			<div className="flex items-center justify-between">
				<div className="flex gap-3 items-start">
					<div className="size-8 rounded-xl flex items-center justify-center bg-main-600">
						<FaMobile size={16} className="text-white" />
					</div>
					<div>
						<h3 className="text-sm font-semibold text-gray-800">
							{props.name}
						</h3>
						<p className="text-xs text-gray-600">
							{props.devices}{' '}
							{props.devices == 1 ? 'device' : 'devices'}{' '}
							connected
						</p>
					</div>
				</div>
				<div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button
								className="h-6 w-6 rounded bg-transparent border-none text-gray-800 hover:bg-[#0009321f] dark:hover:bg-[#0009321f] focus-visible:bg-gray-200 disabled:hover:bg-[#00005503] inline-flex items-center justify-center border disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 focus-visible:ring-2 focus-visible:ring-[#00062e32] focus-visible:outline-none cursor-pointer align-middle"
								type="button"
							>
								<MoreVertical size={15} />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							onClick={(e) => e.stopPropagation()}
						>
							<DropdownMenuItem
								onClick={() =>
									NiceModal.show(
										CreateSubscriptionCodeModal,
										{
											channelId: props.id,
										}
									)
								}
							>
								<MdOutlineQrCodeScanner className="mr-2 h-4 w-4" />
								<span>Create subscription code</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() =>
									NiceModal.show(SendMessageModal, {
										channelId: props.id,
									})
								}
							>
								<MessageCircle className="mr-2 h-4 w-4" />
								<span>Send message</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			{/*<div className="mt-2 flex items-center flex-wrap gap-2.5">
				{props.messages > 0 && (
					<div className="flex items-center gap-1">
						<MessageCircle
							size={14}
							strokeWidth={2.5}
							className="text-gray-500"
						/>
						<p className="text-xs font-normal text-gray-600">
							{props.messages}{' '}
							{props.messages == 1 ? 'message' : 'messages'}
						</p>
					</div>
				)}
				<Tooltip
					content={
						props.lastMessageDate
							? `Last message ${relativeTimeAgo(props.lastMessageDate)}`
							: undefined
					}
				>
					<div className="flex items-center gap-1">
						<Activity
							size={14}
							strokeWidth={2.5}
							className="text-gray-500"
						/>
						<p className="text-xs font-normal text-gray-600">
							{props.lastMessageDate
								? relativeTimeAgo(props.lastMessageDate)
								: 'No messages sent'}
						</p>
					</div>
				</Tooltip>
			</div>*/}
		</Link>
	)
}
