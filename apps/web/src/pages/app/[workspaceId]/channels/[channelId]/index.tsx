import DefaultLayout from '@/components/layouts/DefaultLayout'
import Meta from '@/components/layouts/Meta'
import ChannelAPIReference from '@/components/modals/ChannelAPIReference'
import CreateSubscriptionCodeModal from '@/components/modals/CreateSubscriptionCodeModal'
import SendMessageModal from '@/components/modals/SendMessageModal'
import Copyable from '@/components/molecules/Copyable'
import DeviceRow from '@/components/organisms/channel/DeviceRow'
import SubscriptionCodeRow from '@/components/organisms/channel/SubscriptionCodeRow'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import Loading from '@/components/ui/Loading'
import Tooltip from '@/components/ui/Tooltip'
import withAuth from '@/hoc/with-auth'
import useWorkspace from '@/hooks/use-workspace'
import getChannel from '@/queries/workspace/channels/getChannel'
import NiceModal from '@ebay/nice-modal-react'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, MessageCircle, MoreHorizontal, Plus } from 'lucide-react'
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
		<DefaultLayout className="bg-white" active="channels">
			<Meta title="Channels · Pushify" />
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
					<Meta title={`${data.name} · Pushify`} />
					<div className="flex min-h-24 items-center  bg-white py-5">
						<div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
							<div className="flex items-center justify-between">
								<div className="flex flex-col gap-2">
									<div className="flex items-center gap-4">
										<Link
											className="flex items-center font-medium gap-1 text-gray-600 p-1.5 border-gray-600/10 rounded-lg hover:text-gray-700 bg-neutral-50 hover:bg-neutral-100 transition-all"
											href={{
												pathname: `/app/[workspaceId]`,
												query: {
													workspaceId: workspace?.id,
												},
											}}
										>
											<ChevronLeft size={18} />
										</Link>
										<div>
											<p className="text-sm font-medium text-gray-600">
												Channel
											</p>
											<h1 className="text-2xl font-medium tracking-tight text-gray-800">
												{data.name}
											</h1>
											<div className="flex items-center gap-1">
												<Tooltip
													content="Channel ID"
													triggerClassName="cursor-default"
												>
													<span className="text-xs font-normal text-gray-600">
														({data.id})
													</span>
												</Tooltip>
												<Copyable text={data.id} />
											</div>
										</div>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<Button
										variant="secondary"
										onClick={() =>
											NiceModal.show(SendMessageModal, {
												channelId: data.id,
											})
										}
									>
										<div className="flex items-center gap-2">
											<MessageCircle size={18} />
											<span>Send message</span>
										</div>
									</Button>
									<ChannelAPIReference channelId={data.id} />
									<Button
										className="text-gray-800 text-xs py-2 px-1 bg-slate-50 border-gray-600/10 hover:bg-slate-100"
										variant="outline"
									>
										<div className="flex items-center gap-2">
											<MoreHorizontal size={18} />
										</div>
									</Button>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-12 mx-auto w-full max-w-screen-xl px-3 lg:px-24 py-8">
						<div>
							<div className="border-b pb-3">
								<div className="flex items-center justify-between">
									<h2 className="font-semibold text-gray-900">
										Subscription codes
									</h2>
									<div>
										<button
											onClick={() =>
												NiceModal.show(
													CreateSubscriptionCodeModal,
													{ channelId: data.id }
												)
											}
											className="rounded-lg p-2 flex items-center gap-1 cursor-pointer border border-gray-600/30 shadow-sm hover:bg-neutral-100"
										>
											<Plus size={16} />
											<span className="text-sm font-semibold text-gray-800">
												Create code
											</span>
										</button>
									</div>
								</div>
								<p className="text-sm font-normal text-gray-600">
									Subscription codes are codes that a device
									can use to subscribe to the channel. They
									can either be permanent or temporary.
								</p>
							</div>
							<div className="mt-4">
								<table className="min-w-full border-separate border-spacing-0 border-none text-left">
									<thead className="h-8 rounded-md bg-[#0000330f]">
										<tr>
											<th className="w-[216px] h-8 border-b border-t border-gray-200 px-3 text-xs font-semibold text-[#00005503]1 first:rounded-l-md first:border-l last:rounded-r-md last:border-r">
												Code
											</th>

											<th className="w-[216px] h-8 border-b border-t border-gray-200 px-3 text-xs font-semibold text-[#00005503]1 first:rounded-l-md first:border-l last:rounded-r-md last:border-r">
												Expires
											</th>
											<th className="w-[150px] h-8 border-b border-t border-gray-200 px-3 text-xs font-semibold text-[#00005503]1 first:rounded-l-md first:border-l last:rounded-r-md last:border-r">
												Status
											</th>
											<th className="text-right w-[103px] h-8 border-b border-t border-gray-200 px-3 text-xs font-semibold text-[#00005503]1 first:rounded-l-md first:border-l last:rounded-r-md last:border-r">
												Created
											</th>
											<th className="w-[70px] h-8 border-b border-t border-gray-200 px-3 text-xs font-semibold text-[#00005503]1 first:rounded-l-md first:border-l last:rounded-r-md last:border-r"></th>
										</tr>
									</thead>
									<tbody>
										{data.codes.map((code) => (
											<SubscriptionCodeRow
												key={code.id}
												item={code}
											/>
										))}
									</tbody>
								</table>
							</div>
						</div>
						<div>
							<div className="border-b pb-3">
								<div className="flex items-center justify-between">
									<h2 className="font-semibold text-gray-900">
										Devices subscribed
									</h2>
								</div>
								<p className="text-sm font-normal text-gray-600">
									These devices will receive all messages you
									send to this channel.
								</p>
							</div>
							<div className="mt-4">
								<table className="min-w-full border-separate border-spacing-0 border-none text-left">
									<thead className="h-8 rounded-md bg-[#0000330f]">
										<tr>
											<th className="w-[216px] h-8 border-b border-t border-gray-200 px-3 text-xs font-semibold text-[#00005503]1 first:rounded-l-md first:border-l last:rounded-r-md last:border-r">
												Device Model
											</th>
											<th className="w-[216px] h-8 border-b border-t border-gray-200 px-3 text-xs font-semibold text-[#00005503]1 first:rounded-l-md first:border-l last:rounded-r-md last:border-r">
												Device Name
											</th>
											<th className="w-[150px] h-8 border-b border-t border-gray-200 px-3 text-xs font-semibold text-[#00005503]1 first:rounded-l-md first:border-l last:rounded-r-md last:border-r">
												Push Notifications
											</th>
											<th className="w-[150px] h-8 border-b border-t border-gray-200 px-3 text-xs font-semibold text-[#00005503]1 first:rounded-l-md first:border-l last:rounded-r-md last:border-r">
												Added on
											</th>
											<th className="w-[70px] h-8 border-b border-t border-gray-200 px-3 text-xs font-semibold text-[#00005503]1 first:rounded-l-md first:border-l last:rounded-r-md last:border-r"></th>
										</tr>
									</thead>
									<tbody>
										{data.subscribers.map((device) => (
											<DeviceRow
												key={device.id}
												item={device}
												channelId={data.id}
											/>
										))}
									</tbody>
								</table>
								{data.subscribers.length === 0 && (
									<Alert
										color="info"
										className="mt-2"
										title="No devices subscribed"
										variant="expanded"
									>
										No devices have subscribed to this
										channel yet. Use a subscription code in
										the Pushify App to subscribe to this
										channel.
									</Alert>
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</DefaultLayout>
	)
}

export default withAuth(ChannelPage)
