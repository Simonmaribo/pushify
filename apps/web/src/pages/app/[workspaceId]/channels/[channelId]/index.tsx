import DefaultLayout from '@/components/layouts/DefaultLayout'
import ChannelAPIReference from '@/components/modals/ChannelAPIReference'
import SendMessageModal from '@/components/modals/SendMessageModal'
import Copyable from '@/components/molecules/Copyable'
import CopyableInput from '@/components/molecules/CopyableInput'
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
import {
	ChevronLeft,
	Code,
	Code2,
	Edit2,
	MessageCircle,
	MoreHorizontal,
} from 'lucide-react'
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
					<div className="flex min-h-24 items-center border-b border-gray-200 bg-white py-5">
						<div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
							<div className="flex items-center justify-between">
								<div className="flex flex-col gap-2">
									<div className="flex items-center gap-4">
										<Link
											className="flex items-center font-medium gap-1 text-gray-600 p-1.5 border-gray-600/10 rounded-lg hover:text-gray-700 bg-neutral-50 hover:bg-neutral-100 transition-all"
											href={{
												pathname: `/app/[workspaceId]/channels`,
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
