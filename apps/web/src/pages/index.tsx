import SectionIntro from '@/components/SectionIntro'
import Button from '@/components/ui/Button'
import { Github, GithubIcon, XCircle } from 'lucide-react'
import Link from 'next/link'
import { FaCheckCircle, FaGithub } from 'react-icons/fa'

function Home() {
	return (
		<>
			<nav className="fixed h-20 flex z-10 items-center w-full bg-white">
				<div className="w-[86%] flex items-center justify-between mx-auto max-w-[930px]">
					<img
						src="/logos/logo.png"
						alt="Pushify Logo"
						className="w-[140px]"
					/>
					<div className="flex items-center gap-6">
						<div className="font-medium text-sm flex items-center gap-6">
							<Link href={'/pricing'}>Pricing</Link>
							<Link href={'/pricing'}>How it works</Link>
							<Link href={'/pricing'}>Open source</Link>
						</div>
						<Link
							className="border-2 border-black bg-black text-white text-sm px-5 py-1.5 rounded-full transition-all hover:bg-white hover:text-blue-900"
							href={'/get-started'}
						>
							Get started
						</Link>
					</div>
				</div>
			</nav>
			<section className="py-24 pt-36">
				<div className="w-[86%] mx-auto max-w-[930px] gap-32 lg:gap-10 rounded-3xl text-black min-h-[700px]">
					<div className="flex flex-col gap-6 justify-center">
						<h2 className="text-5xl max-w-xl tracking-tighter font-semibold">
							Send fast push notifications{' '}
							<span className="rotate-45">with ease</span>
						</h2>
						<p className="text-gray-600 max-w-md text-lg">
							Pushify is a digital service that allows you to send
							fast push notifications with ease. Get started
							today.
						</p>
						<div className="mt-5 flex items-center gap-3">
							<Link
								className="border-2 border-black bg-black text-white text-sm px-5 py-2.5 rounded-full transition-all hover:bg-white hover:text-blue-900"
								href={'/get-started'}
							>
								Get started
							</Link>
							<Link
								className="border-2 border-black text-black text-sm px-5 py-2.5 rounded-full transition-all hover:text-white hover:bg-black"
								href={'/get-started'}
							>
								Learn more
							</Link>
						</div>
					</div>
					<div className="flex mt-16 flex-col bg-[#fafafa] py-24 rounded-3xl border border-gray-600/10 justify-center items-center">
						<div className="flex items-center">
							<div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
								<svg
									viewBox="0 0 366 729"
									role="img"
									className="mx-auto w-[22.875rem] max-w-full drop-shadow-xl"
								>
									<title>App screenshot</title>
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
										<img src="https://i.imgur.com/Ep11B2U.png" alt="" />
									</foreignObject>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="pb-24">
				<div className="w-[86%] flex flex-col gap-6 mx-auto max-w-[930px]">
					<h1 className="font-semibold tracking-tighter max-w-xl text-5xl">
						How it works
					</h1>
					<p className="text-xl max-w-lg text-gray-600">
						We have made it easy to integrate and track your
						important events in just a few minutes.
					</p>
				</div>
			</section>
			<section className="py-16 border-t border-gray-600/10">
				<div className="w-[86%] flex flex-col gap-4 mx-auto max-w-[930px]">
					<div className="flex mb-4">
						<Link
							href={'/'}
							className="flex text-sm items-center gap-2 shadow-sm rounded-full border border-gray-600/10 px-3 py-2 hover:bg-[#fafafa] transition-all"
						>
							<FaGithub className="w-5 h-5 " />
							<p>Visit us on Github</p>
						</Link>
					</div>
					<h1 className="font-semibold tracking-tighter max-w-xl text-2xl">
						We&apos;re proudly open-source
					</h1>
					<p className="text-md max-w-md text-gray-600">
						We have made it easy to integrate and track your
						important events in just a few minutes.
					</p>
				</div>
			</section>
			<section className="py-24 border-t border-gray-600/10">
				<div className="w-[86%] flex flex-col gap-6 mx-auto max-w-[930px]">
					<h1 className="font-semibold tracking-tighter max-w-xl text-5xl">
						For SaaS platforms
					</h1>
					<p className="text-xl max-w-lg text-gray-600">
						We have made it easy to integrate and track your
						important events in just a few minutes.
					</p>
				</div>
			</section>
			<section className="py-24 border-t border-gray-600/10">
				<div className="w-[86%] flex flex-col gap-6 mx-auto max-w-[930px]">
					<h1 className="font-semibold tracking-tighter max-w-xl text-5xl">
						Pushify VS SMS providers
					</h1>
					<p className="text-xl max-w-lg text-gray-600">
						Compare to see why Pushify is the best alternative.
					</p>
					<div className='grid mt-10 grid-cols-1 md:grid-cols-2 gap-6'>
						<div className='bg-gray-50 relative border flex flex-col gap-8 border-gray-600/10 rounded-2xl p-8'>
							<div className='flex flex-col gap-2'>
								<h1 className='font-medium text-xl mb-2'>Pushify</h1>
							</div>
							<div className='flex flex-col gap-5'>
								<div className='flex items-center gap-3'>
									<FaCheckCircle size={18} />
									<p>Feature first</p>
								</div>
								<div className='flex items-center gap-3'>
									<FaCheckCircle size={18} />
									<p>Feature first</p>
								</div>
								<div className='flex items-center gap-3'>
									<FaCheckCircle size={18} />
									<p>Feature first</p>
								</div>
								<div className='flex items-center gap-3'>
									<FaCheckCircle size={18} />
									<p>Feature first</p>
								</div>
								<div className='flex items-center gap-3'>
									<FaCheckCircle size={18} />
									<p>Feature first</p>
								</div>
								<div className='flex items-center gap-3'>
									<FaCheckCircle size={18} />
									<p>Feature first</p>
								</div>
							</div>
							<Link className='bg-black hover:text-gray-200 transition-all block text-white rounded-2xl py-3 text-center font-medium text-sm' href={"/"}>
								Try out Pushify for free
							</Link>
							<div style={{background: "linear-gradient(40deg, rgba(62,15,135,0.1279105392156863) 0%, rgba(0,212,255,0) 53%)"}} className='rounded-2xl absolute inset-0'></div>
						</div>
						<div className='bg-gray-50 opacity-50 border flex flex-col gap-8 border-gray-600/10 rounded-2xl p-8'>
							<div className='flex flex-col gap-2'>
								<h1 className='font-medium text-xl mb-2'>SMS providers</h1>
							</div>
							<div className='flex flex-col gap-5'>
								<div className='flex items-center gap-3'>
									<XCircle fill='black' className='text-white ml-[-3px]' size={24} />
									<p>Feature first</p>
								</div>
								<div className='flex items-center gap-3'>
									<XCircle fill='black' className='text-white ml-[-3px]' size={24} />
									<p>Feature first</p>
								</div>
								<div className='flex items-center gap-3'>
									<XCircle fill='black' className='text-white ml-[-3px]' size={24} />
									<p>Feature first</p>
								</div>
								<div className='flex items-center gap-3'>
									<XCircle fill='black' className='text-white ml-[-3px]' size={24} />
									<p>Feature first</p>
								</div>
								<div className='flex items-center gap-3'>
									<XCircle fill='black' className='text-white ml-[-3px]' size={24} />
									<p>Feature first</p>
								</div>
								<div className='flex items-center gap-3'>
									<XCircle fill='black' className='text-white ml-[-3px]' size={24} />
									<p>Feature first</p>
								</div>
							</div>
							<Link className='bg-black hover:text-gray-200 transition-all block text-white rounded-2xl py-3 text-center font-normal text-sm' href={"/"}>
								Keep using the outdated way
							</Link>
						</div>
					</div>
				</div>
			</section>
			<section className="py-24 border-t border-gray-600/10">
				<div className="w-[86%] flex flex-col gap-6 mx-auto max-w-[930px]">
					<h1 className="font-semibold tracking-tighter max-w-xl text-5xl">
						Pricing for everyone
					</h1>
					<p className="text-xl max-w-lg text-gray-600">
						We have made it easy to integrate and track your
						important events in just a few minutes.
					</p>
					<div className='grid mt-10 grid-cols-1 md:grid-cols-2 gap-6'>
						<div className='bg-gray-50 border flex flex-col gap-8 border-gray-600/10 rounded-2xl p-8'>
							<div className='flex flex-col gap-2'>
								<h1 className='font-medium text-xl mb-2'>Free</h1>
								<h2 className='text-4xl font-semibold'>$0<span className='text-lg text-gray-500 font-normal'>/ month</span></h2>
							</div>
							<div className='flex flex-col gap-3'>
								<div className='flex items-center gap-3'>
									<FaCheckCircle size={18} />
									<p>Feature first</p>
								</div>
								<div className='flex items-center gap-3'>
									<FaCheckCircle size={18} />
									<p>Feature first</p>
								</div>
								<div className='flex items-center gap-3'>
									<FaCheckCircle size={18} />
									<p>Feature first</p>
								</div>
							</div>
							<Link className='bg-black hover:text-gray-200 transition-all block text-white rounded-2xl py-3 text-center font-medium text-sm' href={"/"}>
								Continue with Starter
							</Link>
						</div>
						<div className='bg-gray-50 border flex flex-col gap-8 border-gray-600/10 rounded-2xl p-8'>
							<div className='flex flex-col gap-2'>
								<h1 className='font-medium text-xl mb-2'>Starter</h1>
								<h2 className='text-4xl font-semibold'>$10<span className='text-lg text-gray-500 font-normal'>/ month</span></h2>
							</div>
							<div className='flex flex-col gap-3'>
								<div className='flex items-center gap-3'>
									<FaCheckCircle size={18} />
									<p>Feature first</p>
								</div>
								<div className='flex items-center gap-3'>
									<FaCheckCircle size={18} />
									<p>Feature first</p>
								</div>
								<div className='flex items-center gap-3'>
									<FaCheckCircle size={18} />
									<p>Feature first</p>
								</div>
							</div>
							<Link className='bg-black hover:text-gray-200 transition-all block text-white rounded-2xl py-3 text-center font-medium text-sm' href={"/"}>
								Continue with Starter
							</Link>
						</div>
						<div className='bg-gray-50 relative border flex flex-col gap-8 border-gray-600/10 rounded-2xl p-8'>
							<div className='flex flex-col gap-2'>
								<h1 className='font-medium text-xl mb-2'>Pro</h1>
								<h2 className='text-4xl font-semibold'>$19<span className='text-lg text-gray-500 font-normal'>/ month</span></h2>
							</div>
							<div className='flex flex-col gap-3'>
								<div className='flex items-center gap-3'>
									<FaCheckCircle size={18} />
									<p>Feature first</p>
								</div>
								<div className='flex items-center gap-3'>
									<FaCheckCircle size={18} />
									<p>Feature first</p>
								</div>
								<div className='flex items-center gap-3'>
									<FaCheckCircle size={18} />
									<p>Feature first</p>
								</div>
							</div>
							<Link className='bg-black hover:text-gray-200 transition-all block text-white rounded-2xl py-3 text-center font-medium text-sm' href={"/"}>
								Continue with Starter
							</Link>
							<div style={{background: "linear-gradient(40deg, rgba(62,15,135,0.1279105392156863) 0%, rgba(0,212,255,0) 53%)"}} className='rounded-2xl absolute inset-0'></div>
						</div>
						<div className='bg-gray-50 border flex flex-col gap-8 border-gray-600/10 rounded-2xl p-8'>
							<div className='flex flex-col gap-2'>
								<h1 className='font-medium text-xl mb-2'>Business</h1>
								<h2 className='text-4xl font-semibold'>$45<span className='text-lg text-gray-500 font-normal'>/ month</span></h2>
							</div>
							<div className='flex flex-col gap-3'>
								<div className='flex items-center gap-3'>
									<FaCheckCircle size={18} />
									<p>Feature first</p>
								</div>
								<div className='flex items-center gap-3'>
									<FaCheckCircle size={18} />
									<p>Feature first</p>
								</div>
								<div className='flex items-center gap-3'>
									<FaCheckCircle size={18} />
									<p>Feature first</p>
								</div>
							</div>
							<Link className='bg-black hover:text-gray-200 transition-all block text-white rounded-2xl py-3 text-center font-medium text-sm' href={"/"}>
								Continue with Starter
							</Link>
						</div>
					</div>
				</div>
			</section>
			<section className="py-24 border-t border-gray-600/10">
				<div className="w-[86%] mx-auto max-w-[930px] gap-32 lg:gap-10 rounded-3xl text-black">
					<div className="flex flex-col gap-6 justify-center">
						<h2 className="text-5xl max-w-xl tracking-tighter font-semibold">
							Get started today
						</h2>
						<p className="text-gray-600 max-w-md text-lg">
							Pushify is a digital service that allows you to send
							fast push notifications with ease. Get started
							today.
						</p>
						<div className="mt-5 flex items-center gap-3">
							<Link
								className="border-2 border-black bg-black text-white text-sm px-5 py-2.5 rounded-full transition-all hover:bg-white hover:text-blue-900"
								href={'/get-started'}
							>
								Get started here
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	)
	/*return (
		<div className="p-4">
			<p>Sections</p>
			<ul className="list-disc list-inside">
				<li>Navbar</li>
				<li>Hero / Screenshot</li>
				<li>How it works</li>
				<li>Open Source Section</li>
				<li>Home Automation</li>
				<li>
					For Saas Platforms (brug til dine brugere, nemt), med case
					study / testimonial
				</li>
				<li>
					Pushify vs SMS providers (price, extensibility & simplicity)
				</li>
				<li>Pricing</li>
				<li>API demo - screenshot / CodeBlock</li>
				<li>Integrations</li>
				<li>Footer</li>
			</ul>
		</div>
	)*/
}

export default Home
