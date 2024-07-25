import SectionIntro from '@/components/SectionIntro'
import Button from '@/components/ui/Button'
import Link from 'next/link'

function Home() {
	return (
		<>
			<nav className='fixed h-20 flex items-center w-full bg-white'>
				<div className='w-[86%] flex items-center justify-between mx-auto max-w-[930px]'>
					<img
						src="/logos/logo.png"
						alt="Pushify Logo"
						className="w-[140px]"
					/>
					<div className='flex items-center gap-6'>
						<div className='font-medium text-sm flex items-center gap-6'>
							<Link href={"/pricing"}>
								Pricing
							</Link>
							<Link href={"/pricing"}>
								How it works
							</Link>
							<Link href={"/pricing"}>
								Open source
							</Link>
						</div>
						<Link className='border-2 border-black bg-black text-white text-sm px-5 py-1.5 rounded-full transition-all hover:bg-white hover:text-blue-900' href={"/get-started"}>
							Get started
						</Link>
					</div>
				</div>
			</nav>
			<section className='py-24 pt-36'>
				<div className='w-[86%] mx-auto max-w-[930px] gap-32 lg:gap-10 rounded-3xl text-black min-h-[700px]'>
					<div className='flex flex-col gap-6 justify-center'>
						<h2 className='text-5xl max-w-xl tracking-tighter font-semibold'>
							Send fast push notifications <span className='rotate-45'>with ease</span>
						</h2>
						<p className='text-gray-600 max-w-md text-lg'>Pushify is a digital service that allows you to send fast push notifications with ease. Get started today.</p>
						<div className='mt-5 flex items-center gap-3'>
							<Link className='border-2 border-black bg-black text-white text-sm px-5 py-2.5 rounded-full transition-all hover:bg-white hover:text-blue-900' href={"/get-started"}>
								Get started
							</Link>
							<Link className='border-2 border-black text-black text-sm px-5 py-2.5 rounded-full transition-all hover:text-white hover:bg-black' href={"/get-started"}>
								Learn more
							</Link>
						</div>
					</div>
					<div className='flex mt-16 flex-col bg-[#fafafa] py-24 rounded-3xl border border-gray-600/10 justify-center items-center'>
						<div className='flex items-center'>
							<img className='w-[200px] mr-[-70px]' src="/img/phone.svg"></img>
							<img className='w-[220px]' src="/img/phone.svg"></img>
						</div>
					</div>
				</div>
			</section>
			<SectionIntro heading='How it works'>
				<p>hey</p>
			</SectionIntro>
			<SectionIntro heading="We're proudly open-source">
				<p>hey</p>
			</SectionIntro>
			<section className='py-24 border-t border-gray-600/10'>
				<div className='w-[86%] mx-auto max-w-[930px] gap-32 lg:gap-10 rounded-3xl text-black'>
					<div className='flex flex-col gap-6 justify-center'>
						<h2 className='text-5xl max-w-xl tracking-tighter font-semibold'>
							Get started today
						</h2>
						<p className='text-gray-600 max-w-md text-lg'>Pushify is a digital service that allows you to send fast push notifications with ease. Get started today.</p>
						<div className='mt-5 flex items-center gap-3'>
							<Link className='border-2 border-black bg-black text-white text-sm px-5 py-2.5 rounded-full transition-all hover:bg-white hover:text-blue-900' href={"/get-started"}>
								Get started
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
