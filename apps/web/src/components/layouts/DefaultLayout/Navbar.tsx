import useWorkspace from '@/hooks/use-workspace'
import WorkspaceDropdown from './WorkspaceDropdown'
import useUser from '@/hooks/use-user'
import Link from 'next/link'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/Dropdown'
import { FaSignOutAlt } from 'react-icons/fa'
import { LogOut } from 'lucide-react'
import http from '@/queries/http'

const NAVBAR_LINKS = {
	channels: {
		title: 'Channels',
		href: '/',
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
	billing: {
		title: 'Usage',
		href: '/billing',
	},
}

export type NavbarLink = keyof typeof NAVBAR_LINKS
type NavbarProps = {
	active?: NavbarLink
	onboarded?: boolean
}
export default function Navbar({ active, onboarded }: NavbarProps) {
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
							className="hidden h-8 w-8 text-gray-200 sm:block"
						>
							<path d="M16.88 3.549L7.12 20.451"></path>
						</svg>
						<div>
							<WorkspaceDropdown />
						</div>
					</div>
					<div className="flex items-center space-x-6">
						<Link
							href={{
								pathname: '/app/[workspaceId]/feedback',
								query: { workspaceId: workspace?.id },
							}}
							className="hidden text-sm text-gray-500 transition-colors hover:text-gray-700 sm:block py-1 px-3 border border-gray-600/10 rounded bg-neutral-50 hover:bg-neutral-100"
						>
							Feedback
						</Link>
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
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<button className="sm:inline-flex group relative">
										<img
											alt={`Avatar for ${user?.name}`}
											referrerPolicy="no-referrer"
											src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(user?.name || '')}`}
											className="rounded-full border border-gray-600/10 h-9 w-9 transition-all duration-75 group-focus:outline-none group-active:scale-95 sm:h-10 sm:w-10"
											draggable="false"
										/>
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<Link
										passHref
										href={`${http.defaults.baseURL}/user/auth/signout`}
									>
										<DropdownMenuItem>
											<LogOut className="mr-2 h-4 w-4" />
											<span>Sign out</span>
										</DropdownMenuItem>
									</Link>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>
				{onboarded ? (
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
				) : null}
			</div>
		</div>
	)
}
