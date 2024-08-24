import Link from 'next/link'
import type { Post } from 'contentlayer/generated'
import { Mdx } from '@/components/content/mdx'
import { format } from 'date-fns'
import { AuthorAvatars } from './blog/AuthorAvatars'
import { AuthorNames } from './blog/AuthorNames'
import { ArrowLeft } from 'lucide-react'

export function Article({ post }: { post: Post }) {
	return (
		<article className="relative mx-auto flex max-w-3xl w-[90%] py-12 md:py-24 md:mb-12 flex-col gap-8">
			<div className="grid md:max-w-3xl mx-auto w-full gap-5">
				<div className="mb-5 text-third text-sm gap-2">
					<Link
						className="flex gap-2 items-center text-main hover:underline"
						href={`/blog`}
						passHref
					>
						<ArrowLeft size={14} />
						Tilbage til alle opslag
					</Link>
				</div>
				<h1 className="text-darkPurple font-semibold text-4xl md:text-5xl mb-2">
					{post.title}
				</h1>
				<h2 className="text-gray-600 mb-5">{post.description}</h2>
				<div className="flex items-center gap-3 mb-6">
					<div className="flex gap-4">
						<AuthorAvatars authors={post.authors} />
						<div>
							<AuthorNames authors={post.authors} />
							<p className="text-sm text-gray-500 font-light">
								{format(
									new Date(post.publishedAt),
									'MMMM dd, yyyy'
								)}
								<span className="text-gray-500 mx-1">
									&bull;
								</span>
								{post.readingTime}
							</p>
						</div>
					</div>
				</div>
				<div className="relative h-full w-full overflow-hidden">
					<img
						src={
							'https://upload.wikimedia.org/wikipedia/commons/e/eb/Copenhagen_Opera_House_2014_04.jpg'
						} //post.image
						alt={post.title}
					/>
				</div>
			</div>
			<Mdx code={post.body.code} />
		</article>
	)
}
