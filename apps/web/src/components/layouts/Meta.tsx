import Head from 'next/head'

const Meta = ({
	title = 'Pushify - Simple Push Notification Service using REST API',
	keywords = 'Push Notifications, Send Push Notifications to Phone, Push Notification Service, Pushify, Pushify.net, Pushify API, Pushify REST API',
	description = 'Open-source App Push Notification Service - Send Push Notifications without the need of a Mobile App.',
	icon = '/logos/favicon.png',
	banner = '/seo/banner.png',
	url = 'https://pushify.net',
	authors,
}: {
	title?: string
	keywords?: string
	description?: string
	icon?: string
	banner?: string
	url?: string
	authors?: string[]
}) => {
	return (
		<Head>
			<meta name="theme-color" content={'#0050ff'} key="theme-color" />

			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
				key="viewport"
			/>
			<meta name="keywords" content={keywords} key="keyword" />
			<meta name="description" content={description} key="description" />

			<meta name="Language" content="en" key="lang" />
			<meta
				httpEquiv="Content-Language"
				content="en"
				key="content-lang"
			/>

			<meta charSet="utf-8" key="charset" />
			<link rel="icon" href={icon} key="icon" />
			<title key="title">{title}</title>

			<meta property="og:title" content={title} key="og:title" />
			<meta
				property="og:site_name"
				content="Toolbird"
				key="og:site_name"
			/>
			<meta property="og:url" content={url} key="og:url" />
			<meta
				property="og:description"
				content={description}
				key="og:description"
			/>
			<meta property="og:type" content="website" key="og:type" />
			<meta property="og:image" content={banner} key="og:image" />

			<meta
				property="twitter:card"
				content="summary_large_image"
				key="twitter:card"
			/>
			<meta property="twitter:url" content={url} key="twitter:url" />
			<meta
				property="twitter:title"
				content={title}
				key="twitter:title"
			/>
			<meta
				property="twitter:description"
				content={description}
				key="twitter:description"
			/>
			<meta
				property="twitter:image"
				content={banner}
				key="twitter:banner"
			/>
			{authors?.map((author, index) => (
				<meta key={`author-${index}`} name="author" content={author} />
			))}
		</Head>
	)
}

export default Meta
