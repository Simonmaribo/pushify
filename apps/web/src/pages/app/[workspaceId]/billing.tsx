import DefaultLayout from '@/components/layouts/DefaultLayout'
import Meta from '@/components/layouts/Meta'
import ChannelCard from '@/components/organisms/channels/ChannelCard'
import NewChannelCard from '@/components/organisms/channels/NewChannelCard'
import Alert from '@/components/ui/Alert'
import Loading from '@/components/ui/Loading'
import Tooltip from '@/components/ui/Tooltip'
import { thousandsSeparator } from '@/helpers/numbers'
import { cn } from '@/helpers/utils'
import withAuth from '@/hoc/with-auth'
import useWorkspace from '@/hooks/use-workspace'
import getUsage from '@/queries/workspace/billing/getUsage'
import getChannelList from '@/queries/workspace/channels/getChannelList'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { LucideCircleHelp } from 'lucide-react'

function BillingPage() {
	const { workspace } = useWorkspace()

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['usage'],
		queryFn: async () => await getUsage({ workspaceId: workspace?.id }),
	})
	return (
		<DefaultLayout className={'bg-white'} active="billing">
			<Meta title="Usage · Pushify" />
			<div className="mx-auto w-full max-w-screen-xl px-3 lg:px-24 py-8">
				<div>
					<div className="flex flex-col gap-1">
						<div className="flex items-center gap-2">
							<h2 className="font-semibold text-gray-800">
								Usage
							</h2>
							<Tooltip
								jsx={
									<div className="max-w-64 p-2 flex flex-col gap-2">
										<p className="text-sm font-semibold text-gray-800">
											Free in beta
										</p>
										<p className="text-xs font-normal text-gray-600">
											There is not charge or limit while
											in beta. These limits will first be
											enforced when we launch.
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
						{data && (
							<p className="text-sm font-normal text-gray-600">
								Usage resets on{' '}
								{format(
									new Date(data.nextPeriod),
									'd MMMM, yyyy'
								)}
							</p>
						)}
					</div>
					<div className="mt-4">
						{isLoading ? (
							<div className="h-32 flex items-center justify-center">
								<Loading size="sm" />
							</div>
						) : isError || !data ? (
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
							<div className="max-w-lg flex flex-col gap-8">
								<div>
									<div className="flex justify-between items-center">
										<p className="text-sm text-gray-800 font-medium">
											Messages sent
										</p>
										<p className="text-sm text-gray-800 font-normal">
											<span className="font-normal text-gray-800">
												{thousandsSeparator(
													data.messages
												)}{' '}
												/{' '}
												<span className="text-gray-400 font-medium">
													{thousandsSeparator(
														data.limit
													)}
												</span>
											</span>
										</p>
									</div>
									<div className="relative my-2">
										<div className="absolute bg-gray-600/10 rounded-lg w-full h-[12px]" />
										<div
											className={cn(
												'bg-main rounded-lg h-[12px]'
											)}
											style={{
												width: `${((data.messages > data.limit ? data.limit : data.messages) / data.limit) * 100}%`,
											}}
										/>
									</div>
									<div className="flex items-center gap-2">
										<p className="text-sm text-gray-800 font-normal">
											<span className="font-normal text-gray-800">
												{thousandsSeparator(
													data.devices
												)}{' '}
												/{' '}
												<span className="text-gray-400 font-medium">
													1 devices
												</span>
											</span>
										</p>
									</div>
								</div>
								<div className="flex flex-col gap-2">
									<h2 className="font-semibold text-gray-800">
										Current Plan
									</h2>
									<div className="border-2 border-main bg-main-100 rounded-xl p-2 px-4">
										<div className="flex items-center justify-between">
											<p className="text-main-700 font-semibold">
												Free Plan
											</p>
											<p className="text-gray-600">
												<span className="font-medium">
													$0
												</span>{' '}
												<span className="text-sm">
													/mo
												</span>
											</p>
										</div>
										<div className="flex items-center gap-2 text-sm text-gray-800 font-medium">
											<p>
												{thousandsSeparator(data.limit)}{' '}
												messages / mo
											</p>
											<p>·</p>
											<p>
												{thousandsSeparator(
													data.devices
												)}{' '}
												devices connected
											</p>
										</div>
									</div>
								</div>
								<Alert
									variant="expanded"
									title="We are in Beta"
									color="info"
								>
									While in beta, you are on the free plan.
									This plan has{' '}
									<span className="font-medium">
										no charges{' '}
										<span className="font-normal">and</span>{' '}
										no limits
									</span>
									. These limits will first be enforced when
									we launch.
								</Alert>
							</div>
						)}
					</div>
				</div>
			</div>
		</DefaultLayout>
	)
}

export default withAuth(BillingPage)
