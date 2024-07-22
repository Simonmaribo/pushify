import Button from '@/components/ui/Button'
import Link from 'next/link'

function Home() {
	return (
		<>
			<nav className='fixed h-20 flex items-center w-full bg-white'>
				<div className='w-[86%] mx-auto max-w-7xl'>
					<img
						src="/logos/logo.png"
						alt="Pushify Logo"
						className="w-[150px]"
					/>
				</div>
			</nav>
			<section className='pt-20'>
				<div style={{background: "linear-gradient(90deg, rgba(25,2,64,1) 0%, rgba(48,15,102,1) 100%)"}} className='w-[86%] mx-auto max-w-7xl p-20 gap-32 lg:gap-10 grid grid-cols-1 lg:grid-cols-2 rounded-3xl text-white min-h-[700px]'>
					<div className='flex flex-col gap-6 justify-center'>
						<h2 className='text-5xl tracking-tighter font-semibold'>
							Send fast push notifications <span className='rotate-45'>with ease</span>
						</h2>
						<p className='text-gray-50 max-w-md text-lg'>Pushify is a digital service that allows you to send fast push notifications with ease. Get started today.</p>
						<div className='mt-8'>
							<Link className='border-2 text-sm px-5 py-2 rounded-full transition-all hover:bg-white hover:text-blue-900' href={"/get-started"}>
								Get started
							</Link>
						</div>
					</div>
					<div className='flex flex-col justify-center items-center'>
						<div className='flex items-center'>
							<img className='w-[200px] mr-[-70px]' src="/img/phone.svg"></img>
							<img className='w-[220px]' src="/img/phone.svg"></img>
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
