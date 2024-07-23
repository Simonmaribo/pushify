import Button from '@/components/ui/Button'
import Link from 'next/link'

function Home() {
	return (
		<div className="h-screen flex flex-col gap-2 items-center justify-center">
			<img
				src="/logos/logo.png"
				alt="Pushify Logo"
				className="w-[250px]"
			/>
			<h1 className="text-2xl font-semibold">
				Send notifications with ease
			</h1>
			<Link href="/app">
				<Button>Sign up for Pushify</Button>
			</Link>
		</div>
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
