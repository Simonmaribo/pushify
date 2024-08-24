import CodeBlock from '@/components/organisms/CodeBlock'
import { NODE_LIB } from '@/components/organisms/CodeBlock/code-examples/message-api'
import { ArrowRight, Github } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { FaDiscord, FaGit, FaGithub } from 'react-icons/fa'

export default function LandingLayout({
	children,
}: {
	children?: React.ReactNode
}) {
	return (
		<div className="min-h-screen bg-neutral-50">
			{/* Navbar */}
			<nav className="bg-neutral-50 shadow-lg">
				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<Link
							href="/"
							className="flex-shrink-0 flex items-center"
						>
							<img
								src="/logos/logo.png"
								alt="Pushify Logo"
								className="w-[140px]"
							/>
						</Link>
						<div className="flex items-center">
							<Link
								href="#pricing"
								className="hidden sm:inline px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-main transition-all"
							>
								Pricing
							</Link>
							<Link
								href="/app"
								className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-main transition-all"
							>
								Login
							</Link>
							<Link
								href={`/app/auth/register`}
								className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-main hover:bg-main-600 transition-all"
							>
								<span className="md:hidden">Register</span>
								<span className="hidden md:inline font-semibold">
									Get started
								</span>
								<span className="hidden md:inline">
									{' '}
									- it&apos;s free
								</span>
							</Link>
							<Link
								href={`https://github.com/simonmaribo/pushify`}
								target="_blank"
								className="ml-4 rounded-full flex items-center justify-center"
							>
								<FaGithub
									size={30}
									className="text-gray-900 hover:text-gray-700"
								/>
							</Link>
						</div>
					</div>
				</div>
			</nav>

			{children}

			{/* Footer */}
			<footer className="bg-white border-t border-gray-100">
				<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
					<div className="md:flex md:items-center md:justify-between">
						<div className="mt-8 md:mt-0 md:order-1">
							<p className="text-center text-base text-gray-400">
								&copy; 2024{' '}
								<a
									href="https://plexit.group"
									className="hover:underline"
								>
									Plexit Group
								</a>
								. All rights reserved.
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Link
							href="https://github.com/simonmaribo/pushify"
							className="p-1.5 rounded-lg hover:bg-gray-50 transition-all"
						>
							<FaGithub size={24} />
						</Link>
						<Link
							href="https://discord.gg/uK8kMt8vJU"
							target="_blank"
							className="p-1.5 rounded-lg hover:bg-gray-50 transition-all"
						>
							<FaDiscord size={24} />
						</Link>
					</div>
				</div>
			</footer>
		</div>
	)
}
