import CreateChannelModal from '@/components/modals/CreateChannelModal'
import ChannelCard from '@/components/organisms/channels/ChannelCard'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import Loading from '@/components/ui/Loading'
import Tooltip from '@/components/ui/Tooltip'
import useWorkspace from '@/hooks/use-workspace'
import getChannelList from '@/queries/workspace/channels/getChannelList'
import NiceModal from '@ebay/nice-modal-react'
import { useQuery } from '@tanstack/react-query'
import { LucideCircleHelp, Plus } from 'lucide-react'

export default function ChannelListPage() {
	const { workspace } = useWorkspace()

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['channels'],
		queryFn: async () =>
			await getChannelList({ workspaceId: workspace?.id }),
	})

	return (
		<div>
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-2">
					<h2 className="font-semibold text-gray-800">Channels</h2>
					<Tooltip
						jsx={
							<div className="max-w-64 p-2 flex flex-col gap-2">
								<p className="text-sm font-semibold text-gray-800">
									What is a channel?
								</p>
								<p className="text-xs font-normal text-gray-600">
									A channel is what you send push messages to.
									A channel can have multiple devices
									connected.
								</p>
							</div>
						}
					>
						<LucideCircleHelp size={16} className="text-gray-500" />
					</Tooltip>
				</div>
				<Button
					variant="secondary"
					onClick={() => NiceModal.show(CreateChannelModal)}
				>
					<div className="flex items-center gap-2">
						<Plus size={16} />
						<span>Create channel</span>
					</div>
				</Button>
			</div>
			<div className="mt-4">
				{isLoading ? (
					<div className="h-32 flex items-center justify-center">
						<Loading size="sm" />
					</div>
				) : isError || !data ? (
					<div>
						<Alert color="error" title="Error" variant={'expanded'}>
							{`${error || 'An error occurred'}`}
						</Alert>
					</div>
				) : (
					<>
						{data?.length > 0 ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
								{data?.map((channel) => (
									<ChannelCard
										key={channel.id}
										id={channel.id}
										name={channel.name}
										devices={channel.devices}
										messages={channel.messages}
										lastMessageDate={
											channel.lastMessageDate
										}
									/>
								))}
							</div>
						) : (
							<div className="flex items-center justify-center text-center flex-col border h-64 border-dashed rounded-xl bg-neutral-100">
								<div className="mx-auto max-w-sm">
									<h1 className="text-lg font-semibold text-gray-800">
										You have not created any channels yet
									</h1>
									<p className="text-sm font-normal text-gray-600">
										Once you create a channel, you will be
										able to send real-time push messages to
										your devices.
									</p>
									<Button
										variant="secondary"
										className="mt-8"
										onClick={() =>
											NiceModal.show(CreateChannelModal)
										}
									>
										<div className="flex items-center gap-2">
											<Plus size={16} />
											<span>Create channel</span>
										</div>
									</Button>
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}
