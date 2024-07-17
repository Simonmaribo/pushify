import useWorkspace from '@/hooks/use-workspace'
import WorkspaceDropdown from './WorkspaceDropdown'
import useUser from '@/hooks/use-user'
import Link from 'next/link'

const NAVBAR_LINKS = {
	overview: {
		title: 'Overview',
		href: '/',
	},
	channels: {
		title: 'Channels',
		href: '/channels',
	},
	/*devices: {
		title: 'Devices',
		href: '/devices',
	},
	messages: {
		title: 'Messages',
		href: '/messages',
	},*/
	/*integrations: {
		title: 'Integrations',
		href: '/integrations',
	},*/
	api: {
		title: 'API',
		href: '/api',
	},
	/*settings: {
		title: 'Settings',
		href: '/settings',
	},*/
}

export type NavbarLink = keyof typeof NAVBAR_LINKS
type NavbarProps = {
	active: NavbarLink
}
export default function Navbar({ active }: NavbarProps) {
	const { workspace } = useWorkspace()
	const { user } = useUser()

	const getLink = (key: string) => {
		return `/app/${workspace?.id}${NAVBAR_LINKS[key as NavbarLink]?.href}`
	}

	return (
		<div className="sticky left-0 right-0 top-0 z-20 border-b border-gray-200 bg-white">
			<div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center">
						<Link className="hidden sm:block" href="/">
							<div className="max-w-fit">
								<img
									src="/logos/icon.png"
									alt="Pushify"
									className="h-8 w-8"
								/>
							</div>
						</Link>
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
							className="hidden text-sm text-gray-500 transition-colors hover:text-gray-700 sm:block py-1 px-3 border border-gray-600/10 rounded bg-neutral-50 hover:bg-neutral-100"
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
					{Object.keys(NAVBAR_LINKS).map((key) => (
						<Link
							key={key}
							className="relative"
							href={getLink(key)}
						>
							<div className="m-1 rounded-md px-3 py-2 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
								<p className="text-sm text-gray-600 hover:text-black">
									{NAVBAR_LINKS[key as NavbarLink].title}
								</p>
							</div>
							{active == key && (
								<div
									className="absolute bottom-0 w-full px-1.5"
									style={{ opacity: 1 }}
								>
									<div className="h-0.5 bg-black"></div>
								</div>
							)}
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
