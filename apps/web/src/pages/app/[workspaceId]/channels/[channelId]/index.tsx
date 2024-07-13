import DefaultLayout from '@/components/layouts/DefaultLayout'
import SendMessageModal from '@/components/modals/SendMessageModal'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import Loading from '@/components/ui/Loading'
import Tooltip from '@/components/ui/Tooltip'
import withAuth from '@/hoc/with-auth'
import useWorkspace from '@/hooks/use-workspace'
import http from '@/queries/http'
import getChannel from '@/queries/workspace/channels/getChannel'
import NiceModal from '@ebay/nice-modal-react'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, Edit2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'

function ChannelPage() {
	const { workspace } = useWorkspace()
	const router = useRouter()

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['channels', router.query.channelId],
		queryFn: async () =>
			await getChannel({
				workspaceId: workspace?.id,
				channelId: router.query.channelId as string,
			}),
		retry: false,
		enabled: !!workspace?.id && !!router.query.channelId,
	})

	return (
		<DefaultLayout className="bg-neutral-50" active="channels">
			{isLoading ? (
				<div className="flex items-center justify-center h-32">
					<Loading size="sm" />
				</div>
			) : isError || !data ? (
				<div className="mt-4 mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
					<Alert color="error" title="Error" variant="expanded">
						{`${error || 'An error occurred'}`}
					</Alert>
				</div>
			) : (
				<>
					<div className="flex h-36 items-center border-b border-gray-200 bg-white">
						<div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
							<div className="flex items-center justify-between">
								<div className="flex flex-col gap-2">
									<div className="flex">
										<Link
											className="flex items-center font-medium gap-1 text-gray-600 border p-2 py-1 border-gray-600/10 rounded-full hover:text-gray-700 hover:bg-slate-50 transition-all"
											href={{
												pathname: `/app/[workspaceId]/channels`,
												query: {
													workspaceId: workspace?.id,
												},
											}}
										>
											<div className="">
												<ChevronLeft size={14} />
											</div>
											<span className="text-xs font-regular">
												Back to all channels
											</span>
										</Link>
									</div>
									<div className="flex items-center gap-2">
										<h1 className="text-2xl font-semibold tracking-tight text-black">
											{data.name}
										</h1>
										<Tooltip content="Rename channel">
											<button className="p-1 rounded-lg hover:bg-gray-50 text-gray-700">
												<Edit2
													size={16}
													strokeWidth={2}
												/>
											</button>
										</Tooltip>
									</div>
								</div>
								<div>
									<Button
										onClick={() =>
											NiceModal.show(SendMessageModal, {
												channelId: data.id,
											})
										}
									>
										Send message to channel
									</Button>
								</div>
							</div>
						</div>
					</div>
					<div className="mx-auto w-full max-w-screen-xl px-3 lg:px-24 py-8">
						<ul>
							<li>Create subscription codes</li>
							<li>Devices (ChannelSubscriptions)</li>
							<li>Messages received</li>
						</ul>
					</div>
				</>
			)}
		</DefaultLayout>
	)
}

export default withAuth(ChannelPage)
