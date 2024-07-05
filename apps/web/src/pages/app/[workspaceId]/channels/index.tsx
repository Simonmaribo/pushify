import DefaultLayout from '@/components/layouts/DefaultLayout'
import CreateChannelModal from '@/components/modals/CreateChannelModal'
import ChannelCard from '@/components/organisms/channels/ChannelCard'
import NewChannelCard from '@/components/organisms/channels/NewChannelCard'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import Loading from '@/components/ui/Loading'
import Tooltip from '@/components/ui/Tooltip'
import withAuth from '@/hoc/with-auth'
import useWorkspace from '@/hooks/use-workspace'
import getChannelList from '@/queries/workspace/channels/getChannelList'
import NiceModal from '@ebay/nice-modal-react'
import { useQuery } from '@tanstack/react-query'
import { LucideCircleHelp, Wifi } from 'lucide-react'
import { HiQuestionMarkCircle } from 'react-icons/hi'

function ChannelsList() {
	const { workspace } = useWorkspace()

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['channels'],
		queryFn: async () =>
			await getChannelList({ workspaceId: workspace?.id }),
	})

	return (
		<DefaultLayout className="bg-neutral-50" active="channels">
			<div className="mx-auto w-full max-w-screen-xl px-3 lg:px-24 py-8">
				<div>
					<div className="flex justify-between items-center">
						<div className="flex items-center gap-2">
							<h2 className="font-semibold text-gray-800">
								Channels
							</h2>
							<Tooltip
								jsx={
									<div className="max-w-64 p-2 flex flex-col gap-2">
										<p className="text-sm font-semibold text-gray-800">
											What is a channel?
										</p>
										<p className="text-xs font-normal text-gray-600">
											A channel is what you send push
											messages to. A channel can have
											multiple devices connected.
										</p>
									</div>
								}
							>
								<LucideCircleHelp
									size={16}
									className="text-gray-500"
								/>
							</Tooltip>
						</div>
						<Button
							variant="secondary"
							size="sm"
							before={<Wifi />}
							onClick={() => NiceModal.show(CreateChannelModal)}
						>
							Create Channel
						</Button>
					</div>
					<div className="mt-4">
						{isLoading ? (
							<div className="h-32 flex items-center justify-center">
								<Loading size="sm" />
							</div>
						) : isError ? (
							<div>
								<Alert
									color="error"
									title="Error"
									variant={'expanded'}
								>
									{`${error || 'An error occurred'}`}
								</Alert>
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
								{data?.map((channel) => (
									<ChannelCard
										key={channel.id}
										id={channel.id}
										name={channel.name}
										devices={channel.devices}
									/>
								))}
								<NewChannelCard />
							</div>
						)}
					</div>
				</div>
			</div>
		</DefaultLayout>
	)
}

export default withAuth(ChannelsList)
