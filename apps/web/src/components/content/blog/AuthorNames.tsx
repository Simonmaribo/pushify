import { Post } from 'contentlayer/generated'
import Link from 'next/link'

type AuthorNamesProps = {
	authors: Post['authors']
}

export function AuthorNames({ authors }: AuthorNamesProps) {
	const textArray: {
		text: string
		url?: string
	}[] = []

	for (let i = 0; i < authors.length; i++) {
		textArray.push({
			text: authors[i].name,
			url: authors[i].url,
		})

		// Add a comma after each author unless it's the second to last author then add an 'and'
		// if the last author dont add anything
		if (i < authors.length - 1) {
			textArray.push({
				text: i === authors.length - 2 ? ' og ' : ', ',
			})
		}
	}

	return (
		<span className="text-sm text-gray-800">
			{textArray.map((text, index) => {
				if (text.url) {
					return (
						<Link
							key={index}
							href={text.url}
							target="_blank"
							className="cursor-pointer font-medium hover:underline"
						>
							{text.text}
						</Link>
					)
				} else {
					return <span key={index}>{text.text}</span>
				}
			})}
		</span>
	)
}
