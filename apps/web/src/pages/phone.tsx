export default function PhonePage() {
	return (
		<div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:py-40 lg:px-8">
			<div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
				<div className="mt-6 sm:mt-8 lg:mt-12">
					<div className="inline-flex space-x-4">
						<span className="whitespace-nowrap h-8 rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-400 ring-1 ring-inset ring-blue-500/20">
							What is new
						</span>
						<span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
							<span>New sleek Editor 2.0 is here!</span>
						</span>
					</div>
				</div>
				<h1
					id="hero-heading"
					className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl"
				>
					<span className="Typewriter__wrapper">
						Elevate your content with AI-generated{' '}
					</span>
					<span className="Typewriter__cursor">|</span>
				</h1>
				<p className="mt-6 text-lg leading-8 text-gray-300">
					Let 2short.ai extract the best moments of your videos and
					turn them into performing short clips that drive views and
					subscribers 10X faster.
				</p>
				<div className="mt-10 flex items-center gap-x-6">
					<a
						href="https://app.2short.ai/"
						className="rounded-md bg-blue-primary px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 dynamicLink"
					>
						Try it out for free
					</a>
					<a
						href="#features"
						className="text-base font-semibold leading-7 text-white"
					>
						Learn more <span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
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
	)
}
