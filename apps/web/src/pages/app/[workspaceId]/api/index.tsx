import DefaultLayout from '@/components/layouts/DefaultLayout'
import Meta from '@/components/layouts/Meta'
import CreateAPIKeyModal from '@/components/modals/CreateAPIKeyModal'
import APIListRow from '@/components/organisms/api_list/APIListRow'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import Loading from '@/components/ui/Loading'
import Tooltip from '@/components/ui/Tooltip'
import withAuth from '@/hoc/with-auth'
import useWorkspace from '@/hooks/use-workspace'
import getAPIKeys from '@/queries/workspace/api/getAPIKeys'
import NiceModal from '@ebay/nice-modal-react'
import { useQuery } from '@tanstack/react-query'
import { LucideCircleHelp, Plus } from 'lucide-react'

function APIPage() {
	const { workspace } = useWorkspace()

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['api-keys'],
		queryFn: async () => await getAPIKeys({ workspaceId: workspace?.id }),
	})
	return (
		<DefaultLayout className="bg-white" active="api">
			<Meta title="API Keys · Pushify" />
			<div className="mx-auto w-full max-w-screen-xl px-3 lg:px-24 py-8">
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-2">
						<h2 className="font-semibold text-gray-800">
							API Keys
						</h2>
						<Tooltip
							jsx={
								<div className="max-w-64 p-2 flex flex-col gap-2">
									<p className="text-sm font-semibold text-gray-800">
										What is an API Key?
									</p>
									<p className="text-xs font-normal text-gray-600">
										API Keys are used to authenticate
										requests to Pushify API. This is to be
										used in your code or integration system
										like Zapier.
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
						before={<Plus />}
						onClick={() => NiceModal.show(CreateAPIKeyModal)}
					>
						Create API Key
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
						<>
							<table className="min-w-full border-separate border-spacing-0 border-none text-left">
								<thead className="h-8 rounded-md bg-[#0000330f]">
									<tr>
										<th className="w-[216px] h-8 border-b border-t border-gray-200 px-3 text-xs font-semibold text-[#00005503]1 first:rounded-l-md first:border-l last:rounded-r-md last:border-r">
											Name
										</th>
										<th className="w-[216px] h-8 border-b border-t border-gray-200 px-3 text-xs font-semibold text-[#00005503]1 first:rounded-l-md first:border-l last:rounded-r-md last:border-r">
											Token
										</th>
										<th className="w-[216px] h-8 border-b border-t border-gray-200 px-3 text-xs font-semibold text-[#00005503]1 first:rounded-l-md first:border-l last:rounded-r-md last:border-r">
											Permission
										</th>
										<th className="w-[150px] h-8 border-b border-t border-gray-200 px-3 text-xs font-semibold text-[#00005503]1 first:rounded-l-md first:border-l last:rounded-r-md last:border-r">
											Last Used
										</th>
										<th className="text-right w-[103px] h-8 border-b border-t border-gray-200 px-3 text-xs font-semibold text-[#00005503]1 first:rounded-l-md first:border-l last:rounded-r-md last:border-r">
											Created
										</th>
										<th className="w-[70px] h-8 border-b border-t border-gray-200 px-3 text-xs font-semibold text-[#00005503]1 first:rounded-l-md first:border-l last:rounded-r-md last:border-r"></th>
									</tr>
								</thead>
								<tbody>
									{data?.map((key) => (
										<APIListRow key={key.id} item={key} />
									))}
								</tbody>
							</table>
							{data?.length === 0 && (
								<div className="mt-4">
									<Alert
										color="info"
										title="No API Keys"
										variant={'expanded'}
									>
										{`You don't have any API keys yet. Click the "Create API Key" button to create a new one.`}
									</Alert>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</DefaultLayout>
	)
}

export default withAuth(APIPage)
