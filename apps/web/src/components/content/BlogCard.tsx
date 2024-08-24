import { Post } from 'contentlayer/generated'
import { format } from 'date-fns'
import Link from 'next/link'

type BlogCardProps = {
	post: Post
}

export default function BlogCard({ post }: BlogCardProps) {
	return (
		<Link
			className="flex flex-col overflow-hidden transition-all"
			href={`/blog/${post.slug}`}
		>
			<img
				alt={post.title}
				width="2400"
				height="1260"
				decoding="async"
				data-nimg="1"
				className="blur-0 aspect-[1200/630] object-cover"
				src={
					'https://upload.wikimedia.org/wikipedia/commons/e/eb/Copenhagen_Opera_House_2014_04.jpg'
				} //post.image}
				style={{ color: 'transparent' }}
			/>
			<div className="flex flex-1 flex-col mt-5 justify-between rounded-b-lg ">
				<div className="flex flex-col gap-6">
					<div>
						<h2 className="line-clamp-2 font-display text-2xl font-semibold text-darkPurple">
							{post.title}
						</h2>
						<p className="mt-2 line-clamp-2 font-base text-base text-gray-600">
							{post.description}
						</p>
					</div>
				</div>
				<div className="mt-4 flex items-center justify-between">
					<time
						dateTime={format(
							new Date(post.publishedAt),
							'yyyy-MM-dd'
						)}
						className="text-base text-third"
					>
						{format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
					</time>
				</div>
			</div>
		</Link>
	)
}
