import useWorkspace from '@/hooks/use-workspace'
import WorkspaceDropdown from './WorkspaceDropdown'
import useUser from '@/hooks/use-user'

export default function Navbar() {
	const { workspace } = useWorkspace()
	const { user } = useUser()
	return (
		<div className="sticky left-0 right-0 top-0 z-20 border-b border-gray-200 bg-white">
			<div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center">
						<a className="hidden sm:block" href="/">
							<div className="max-w-fit">
								<svg
									width="64"
									height="64"
									viewBox="0 0 64 64"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="text-black dark:text-white h-8 w-8 transition-all duration-75 active:scale-95"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M32 64C49.6731 64 64 49.6731 64 32C64 20.1555 57.5648 9.81398 48 4.28103V31.9999V47.9999H40V45.8594C37.6466 47.2208 34.9143 47.9999 32 47.9999C23.1634 47.9999 16 40.8365 16 31.9999C16 23.1634 23.1634 15.9999 32 15.9999C34.9143 15.9999 37.6466 16.7791 40 18.1404V1.00814C37.443 0.350024 34.7624 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64Z"
										fill="currentColor"
									></path>
								</svg>
							</div>
						</a>
						<svg
							fill="none"
							shape-rendering="geometricPrecision"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1"
							viewBox="0 0 24 24"
							width="14"
							height="14"
							className="hidden h-8 w-8 text-gray-200 sm:ml-3 sm:block"
						>
							<path d="M16.88 3.549L7.12 20.451"></path>
						</svg>
						<div>
							<WorkspaceDropdown />
						</div>
					</div>
					<div className="flex items-center space-x-6">
						<a
							href="https://pushify.toolbird.io/"
							className="hidden text-sm text-gray-500 transition-colors hover:text-gray-700 sm:block py-2 px-4 border border-gray-600/10 rounded bg-neutral-50 hover:bg-neutral-100"
							target="_blank"
						>
							Feedback
						</a>
						<a
							href="https://pushify.toolbird.io/changelog"
							className="hidden text-sm text-gray-500 transition-colors hover:text-gray-700 sm:block"
							target="_blank"
						>
							Changelog
						</a>
						<a
							href="https://pushify.net/help"
							className="hidden text-sm text-gray-500 transition-colors hover:text-gray-700 sm:block"
							target="_blank"
						>
							Help
						</a>
						<div className="relative inline-block pt-1.5">
							<button
								className="sm:inline-flex group relative"
								type="button"
								aria-haspopup="dialog"
								aria-expanded="false"
								aria-controls="radix-:R3imrtsja:"
								data-state="closed"
							>
								<img
									alt={`Avatar for ${user?.name}`}
									referrerPolicy="no-referrer"
									src="https://dubassets.com/avatars/cliok8ux60006lg08svzi3h1e"
									className="rounded-full border border-gray-300 h-9 w-9 transition-all duration-75 group-focus:outline-none group-active:scale-95 sm:h-10 sm:w-10"
									draggable="false"
								/>
							</button>
						</div>
					</div>
				</div>
				<div className="scrollbar-hide mb-[-3px] flex h-12 items-center justify-start space-x-2 overflow-x-auto">
					<a className="relative" href="/simon">
						<div className="m-1 rounded-md px-3 py-2 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
							<p className="text-sm text-gray-600 hover:text-black">
								Links
							</p>
						</div>
						<div
							className="absolute bottom-0 w-full px-1.5"
							style={{ opacity: 1 }}
						>
							<div className="h-0.5 bg-black"></div>
						</div>
					</a>
					<a className="relative" href="/simon/analytics">
						<div className="m-1 rounded-md px-3 py-2 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
							<p className="text-sm text-gray-600 hover:text-black">
								Analytics
							</p>
						</div>
					</a>
					<a className="relative" href="/simon/domains">
						<div className="m-1 rounded-md px-3 py-2 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
							<p className="text-sm text-gray-600 hover:text-black">
								Domains
							</p>
						</div>
					</a>
					<a className="relative" href="/simon/settings">
						<div className="m-1 rounded-md px-3 py-2 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
							<p className="text-sm text-gray-600 hover:text-black">
								Settings
							</p>
						</div>
					</a>
				</div>
			</div>
		</div>
	)
}
