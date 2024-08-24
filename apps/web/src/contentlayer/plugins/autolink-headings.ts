import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const autolinkHeadings: any = [
	rehypeAutolinkHeadings,
	{
		behavior: 'append',
		headingProperties: {
			className: 'group',
		},
		properties: {
			className: [
				"no-underline group-hover:after:content-['#'] after:text-gray-400 after:hover:text-gray-700 ml-1 after:p-1",
			],
			'aria-hidden': 'true',
		},
	},
]

export default autolinkHeadings
