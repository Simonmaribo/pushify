import LandingLayout from '@/components/layouts/LandingLayout'
import CodeBlock from '@/components/organisms/CodeBlock'
import { NODE_LIB } from '@/components/organisms/CodeBlock/code-examples/message-api'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { FaGithub } from 'react-icons/fa'

export default function LandingPage() {
	return (
		<LandingLayout>
			{/* Hero / Screenshot */}
			<div className="bg-neutral-50">
				<div className="mx-auto max-w-5xl px-10 pt-8 pb-12 sm:pb-24 lg:flex lg:py-32 lg:px-8">
					<div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
						<div className="flex mb-4 justify-center md:justify-start">
							<Link
								href={'https://github.com/simonmaribo/pushify'}
								className="flex items-center gap-2 shadow-sm rounded-full border border-gray-600/10 px-3 py-2 bg-white hover:bg-neutral-100 transition-all"
							>
								<FaGithub size={20} />
								<p className="text-sm">Visit us on Github</p>
							</Link>
						</div>
						<h1 className="text-4xl font-semibold text-center md:text-left text-darkPurple sm:text-4xl md:text-5xl">
							Send Push Notifications to your Phone
						</h1>
						<p className="mt-3 max-w-md mx-auto text-center md:text-start text-base text-gray-600 sm:text-lg md:mt-5 md:text-lg md:max-w-3xl">
							<span className="underline">Pushify</span> is a
							simple HTTP-based Push Notification service. You can
							send{' '}
							<span className="text-darkPurple font-medium">
								notifications to your phone
							</span>{' '}
							using a simple REST API. Pushify can also be
							included in your{' '}
							<span className="font-medium">SaaS Platform</span>{' '}
							and send notifications to your users with the need
							of publishing an App. The best thing?{' '}
							<a
								href="https://github.com/simonmaribo/pushify"
								target="_blank"
								className="text-darkPurple/80 underline hover:text-darkPurple"
							>
								We&apos;re Open Source.
							</a>
						</p>
						<div className="mt-5 sm:flex md:mt-8">
							<div className="rounded-md shadow">
								<Link
									href={`/app/auth/register`}
									className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-darkPurple hover:bg-darkPurple/80 md:py-4 md:text-lg md:px-10"
								>
									Get Started
									<ArrowRight className="ml-2" />
								</Link>
							</div>
						</div>
					</div>
					<div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow flex justify-center md:justify-end">
						<svg
							viewBox="0 0 366 729"
							role="img"
							className="w-[18rem] drop-shadow-xl"
						>
							<title>App Screenshot</title>
							<defs>
								<clipPath id="2ade4387-9c63-4fc4-b754-10e687a0d332">
									<rect width="316" height="684" rx="36" />
								</clipPath>
							</defs>
							<path
								fill="#4B5563"
								d="M363.315 64.213C363.315 22.99 341.312 1 300.092 1H66.751C25.53 1 3.528 22.99 3.528 64.213v44.68l-.857.143A2 2 0 0 0 1 111.009v24.611a2 2 0 0 0 1.671 1.973l.95.158a2.26 2.26 0 0 1-.093.236v26.173c.212.1.398.296.541.643l-1.398.233A2 2 0 0 0 1 167.009v47.611a2 2 0 0 0 1.671 1.973l1.368.228c-.139.319-.314.533-.511.653v16.637c.221.104.414.313.56.689l-1.417.236A2 2 0 0 0 1 237.009v47.611a2 2 0 0 0 1.671 1.973l1.347.225c-.135.294-.302.493-.49.607v377.681c0 41.213 22 63.208 63.223 63.208h95.074c.947-.504 2.717-.843 4.745-.843l.141.001h.194l.086-.001 33.704.005c1.849.043 3.442.37 4.323.838h95.074c41.222 0 63.223-21.999 63.223-63.212v-394.63c-.259-.275-.48-.796-.63-1.47l-.011-.133 1.655-.276A2 2 0 0 0 366 266.62v-77.611a2 2 0 0 0-1.671-1.973l-1.712-.285c.148-.839.396-1.491.698-1.811V64.213Z"
							/>
							<path
								fill="#343E4E"
								d="M16 59c0-23.748 19.252-43 43-43h246c23.748 0 43 19.252 43 43v615c0 23.196-18.804 42-42 42H58c-23.196 0-42-18.804-42-42V59Z"
							/>
							<foreignObject
								width="316"
								height="684"
								transform="translate(24 24)"
								clipPath="url(#2ade4387-9c63-4fc4-b754-10e687a0d332)"
							>
								<img
									src="https://i.imgur.com/Ep11B2U.png"
									alt=""
								/>
							</foreignObject>
						</svg>
					</div>
				</div>
				<div className="flex items-center justify-center mb-8">
					<a
						href="https://apps.apple.com/dk/app/pushify-notifications/id6517357435"
						target="_blank"
					>
						<img src="/img/appstore.svg" width="150" />
					</a>
				</div>
			</div>

			{/* API demo */}
			<div className="py-12 bg-white">
				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
					<h2 className="text-darkPurple text-center font-medium text-4xl leading-tight sm:text-5xl sm:leading-tight">
						Easy-to-Use API
					</h2>
					<p className="max-w-2xl text-center mx-auto text-gray-600 sm:text-lg">
						Pushify offers a simple and easy-to-use API for sending
						push notifications to your phone. Here&apos;s an example
						of how you can send a message using the Pushify API.
					</p>
					<div className="max-w-xl mx-auto">
						<CodeBlock
							wrapLongLines={false}
							examples={[
								{
									language: 'javascript',
									title: 'Node.js',
									code: NODE_LIB,
								},
							]}
						/>
					</div>
				</div>
			</div>

			{/* Open Source Section */}
			<div className="bg-white/10 py-20">
				<div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
					<div className="mx-auto max-w-md text-center sm:max-w-xl">
						<h2 className="text-darkPurple font-medium text-4xl leading-tight sm:text-5xl sm:leading-tight">
							Proudly open-source
						</h2>
						<p className="mt-5 text-gray-600 sm:text-lg">
							Our source code is available on GitHub - feel free
							to read, review, or contribute to it however you
							want!
						</p>
					</div>
					<div className="flex items-center justify-center py-10">
						<Link
							href="https://github.com/simonmaribo/pushify"
							target="_blank"
							rel="noreferrer"
						>
							<div className="flex items-center">
								<div className="flex h-10 items-center space-x-2 rounded-md border border-gray-600 bg-gray-800 p-4 hover:bg-gray-700 transition-all">
									<FaGithub
										size={24}
										className="text-white"
									/>
									<p className="font-medium text-white">
										Star us on GitHub
									</p>
								</div>
								<div className="features_label__aL_5o">
									<p className="font-display font-medium text-white">
										0
									</p>
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>

			{/* Pricing */}
			<div className="bg-white py-12" id="pricing">
				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-darkPurple text-center font-medium text-4xl leading-tight sm:text-5xl sm:leading-tight">
						Pricing
					</h2>
					<p className="text-center">
						Everthing is{' '}
						<span className="text-darkPurple font-semibold">
							Free
						</span>{' '}
						while Pushify is in Beta and features are being added.
					</p>
					<p className="mt-2 text-center max-w-xl mx-auto">
						<span className="font-medium">
							But how do you expect the pricing to look like?
						</span>{' '}
						Expect that Pushify will forever be free for{' '}
						<span className="font-medium">1 device</span> and up to{' '}
						<span className="font-medium">
							2500 sent push notifications a month.
						</span>{' '}
						Pricing will depend on the amount of devices connected
						and the amount of push notifications sent.
					</p>
				</div>
			</div>
		</LandingLayout>
	)
}
