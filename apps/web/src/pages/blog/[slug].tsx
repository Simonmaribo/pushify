import { Article } from '@/components/content/Article'
import LandingLayout from '@/components/layouts/LandingLayout'
import Meta from '@/components/layouts/Meta'
import { allPosts, Post } from 'contentlayer/generated'
import {
	GetStaticPaths,
	GetStaticProps,
	GetStaticPropsContext,
	InferGetStaticPropsType,
} from 'next'

export default function BlogList({
	post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<LandingLayout>
			<Meta
				title={`${post.title} | Pushify`}
				description={post.description}
				banner={post.image}
				authors={post.authors.map((author) => author.name)}
			/>
			<div>
				<Article post={post} />
			</div>
		</LandingLayout>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = allPosts.map((post) => ({
		params: {
			slug: post.slug,
		},
	}))

	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps<{
	post: Post
}> = async (context: GetStaticPropsContext) => {
	const slug = context.params?.slug as string
	const post = allPosts.find((p) => p.slug === slug)

	if (!post) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			post: post,
		},
	}
}
