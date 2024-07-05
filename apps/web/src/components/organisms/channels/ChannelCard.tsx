import Tooltip from '@/components/ui/Tooltip'
import { Activity, MessageCircle, MoreVertical } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaMobile } from 'react-icons/fa'

type ChannelCardProps = {
	id: string
	name: string
	devices: number
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
							{props.devices} devices connected
						</p>
					</div>
				</div>
				<div>
					<div className="p-1 rounded-lg hover:bg-gray-50 text-gray-700">
						<MoreVertical size={16} strokeWidth={1.5} />
					</div>
				</div>
			</div>
			<div className="mt-2 flex items-center flex-wrap gap-2.5">
				<Tooltip content="Last message was sent 2 days ago">
					<div className="flex items-center gap-1">
						<Activity
							size={14}
							strokeWidth={2.5}
							className="text-gray-500"
						/>
						<p className="text-xs font-normal text-gray-600">
							2 days ago
						</p>
					</div>
				</Tooltip>
				<div className="flex items-center gap-1">
					<MessageCircle
						size={14}
						strokeWidth={2.5}
						className="text-gray-500"
					/>
					<p className="text-xs font-normal text-gray-600">
						32 messages
					</p>
				</div>
			</div>
		</Link>
	)
}
