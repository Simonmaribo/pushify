export default function ContactPage() {
	return (
		<div className="h-screen flex items-center justify-center flex-col">
			<h1 className="text-2xl font-semibold">Contact Pushify.net</h1>
			<p>
				Send us a message at{' '}
				<span className="text-blue-500">
					<a href="mailto:simon@gazellateam.com">
						simon@gazellateam.com
					</a>
				</span>{' '}
				and we will answer as fast as possible (usually within 24
				hours).
			</p>
		</div>
	)
}
