import { getMDXComponent } from 'next-contentlayer/hooks'
import { components } from './mdx-components'
import { cn } from '@/helpers/utils'

interface MdxProps {
	code: string
	className?: string
}

export function Mdx({ code, className }: MdxProps) {
	const MDXComponent = getMDXComponent(code)

	return (
		<div
			className={cn(
				'text-gray-600 prose-headings:font-[500] prose-headings:text-black paragraph prose mx-auto prose-slate prose-pre:border prose-pre:border-gray-600/10 prose-pre:rounded-lg',
				className
			)}
		>
			<MDXComponent components={{ ...components }} />
		</div>
	)
}
