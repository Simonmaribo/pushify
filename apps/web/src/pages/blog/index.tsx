import BlogCategoryPage from '@/components/content/blog/BlogCategoryPage'
import { allPosts, Post } from 'contentlayer/generated'
import {
	GetStaticProps,
	GetStaticPropsContext,
	InferGetStaticPropsType,
} from 'next'
import React from 'react'

export default function BlogList({
	posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return <BlogCategoryPage posts={posts} />
}

export const getStaticProps: GetStaticProps<{
	posts: Post[]
}> = async (context: GetStaticPropsContext) => {
	return {
		props: {
			posts: allPosts.sort((a, b) => {
				return (
					new Date(b.publishedAt).getTime() -
					new Date(a.publishedAt).getTime()
				)
			}),
		},
	}
}
