import DefaultLayout from '@/components/layouts/DefaultLayout'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import Loading from '@/components/ui/Loading'
import Tooltip from '@/components/ui/Tooltip'
import { prettyDate, timeDifference } from '@/helpers/date'
import { cn } from '@/helpers/utils'
import withAuth from '@/hoc/with-auth'
import useWorkspace from '@/hooks/use-workspace'
import getAPIKeys from '@/queries/workspace/api/getAPIKeys'
import { useQuery } from '@tanstack/react-query'
import { LucideCircleHelp, MoreHorizontal, Plus } from 'lucide-react'
import { IoDocumentLockOutline } from 'react-icons/io5'

function APIPage() {
	const { workspace } = useWorkspace()

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['api-keys'],
		queryFn: async () => await getAPIKeys({ workspaceId: workspace?.id }),
	})
	return (
		<DefaultLayout className="bg-white" active="api">
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
					<Button variant="secondary" size="sm" before={<Plus />}>
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
									<tr key={key.id}>
										<td className="py-3 h-10 truncate border-b border-gray-200 px-3 text-sm">
											<div className="group flex items-center gap-3">
												<IoDocumentLockOutline
													size={24}
													className={cn(
														'text-gray-700',
														key.lastUsedAt &&
															'text-emerald-600'
													)}
												/>
												<span className="max-w-[190px] cursor-pointer truncate">
													{key.name}
												</span>
											</div>
										</td>
										<td className="h-10 truncate border-b border-gray-200 px-3 text-sm text-gray-500">
											<span className="inline-flex select-none items-center whitespace-nowrap font-medium bg-[#0000330f] text-[#00005503]1 text-xs h-6 px-2 rounded">
												{key.key}
											</span>
										</td>
										<td className="h-10 truncate border-b border-gray-200 px-3 text-sm">
											{key.permission}
										</td>
										<td className="h-10 truncate border-b border-gray-200 px-3 text-sm">
											<div className="flex items-center gap-2">
												<button
													data-state="closed"
													className="cursor-auto"
												>
													<Tooltip
														content={
															key.lastUsedAt
																? prettyDate(
																		key.lastUsedAt
																	)
																: undefined
														}
													>
														<time
															className="text-current"
															dateTime={
																key.lastUsedAt
																	? new Date(
																			key.lastUsedAt
																		).toISOString()
																	: ''
															}
														>
															{key.lastUsedAt
																? `${timeDifference(
																		new Date(),
																		new Date(
																			key.lastUsedAt
																		)
																	)} ago`
																: `Never`}
														</time>
													</Tooltip>
												</button>
											</div>
										</td>
										<td className="text-right h-10 truncate border-b border-gray-200 px-3 text-sm">
											<button
												data-state="closed"
												className="cursor-auto"
											>
												<Tooltip
													content={prettyDate(
														key.createdAt
													)}
												>
													<time
														className="text-current"
														dateTime={new Date(
															key.createdAt
														)?.toISOString()}
													>
														{timeDifference(
															new Date(),
															new Date(
																key.createdAt
															)
														)}{' '}
														ago
													</time>
												</Tooltip>
											</button>
										</td>
										<td className="text-center h-10 truncate border-b border-gray-200 px-3 text-sm">
											<button
												className="h-6 w-6 rounded bg-transparent border-none text-[#00005503]1 hover:bg-[#0009321f] dark:hover:bg-[#0009321f] focus-visible:bg-gray-200 disabled:hover:bg-[#00005503] inline-flex items-center justify-center border disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 focus-visible:ring-2 focus-visible:ring-[#00062e32] focus-visible:outline-none cursor-pointer align-middle"
												type="button"
											>
												<MoreHorizontal size={15} />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</div>
		</DefaultLayout>
	)
}

export default withAuth(APIPage)
