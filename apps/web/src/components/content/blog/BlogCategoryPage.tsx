import { Post } from 'contentlayer/generated'
import BlogCard from '../BlogCard'
import Meta from '@/components/layouts/Meta'
import LandingLayout from '@/components/layouts/LandingLayout'

type BlogCategoryPageProps = {
	posts: Post[]
}

export default function BlogCategoryPage({ posts }: BlogCategoryPageProps) {
	return (
		<LandingLayout>
			<Meta title={`Blog | Pushify.net`} />
			<div className="mt-24">
				<div className="max-w-4xl w-[90%] mx-auto">
					<h1 className="text-5xl font-semibold mb-6 text-darkPurple">
						Pushify Blog Posts
						<span className="text-main">.</span>
					</h1>
					<h2 className="text-xl font-light text-gray-600">
						Latest news and guides on how to use Pushify
					</h2>
				</div>
				<div className="py-24 min-h-[490px] flex items-center justify-center  border-gray-600/10">
					{posts.length > 0 ? (
						<div className="max-w-4xl w-[90%] gap-20 md:gap-10 mx-auto grid grid-cols-1 md:grid-cols-2">
							{posts.map((post) => (
								<BlogCard post={post} key={post.slug} />
							))}
						</div>
					) : (
						<div className="max-w-4xl w-[90%] mx-auto flex items-center justify-center h-[300px] border border-dashed bg-white border-gray-300 rounded-3xl">
							<p className="text-gray-500 paragraph text-lg p-8">
								No posts found
							</p>
						</div>
					)}
				</div>
			</div>
		</LandingLayout>
	)
}
