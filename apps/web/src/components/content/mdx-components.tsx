import * as React from 'react'
import type { ImageProps } from 'next/image'
import Image from 'next/image'
import Link from 'next/link'

export const components = {
	pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
		<pre {...props} className="!bg-gray-50" />
	),
	a: ({
		href = '',
		...props
	}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
		if (href.startsWith('http')) {
			return (
				<a
					className="text-gray-800 underline underline-offset-4 hover:no-underline"
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					{...props}
				/>
			)
		}

		return (
			<Link
				href={href}
				className="text-gray-800 underline underline-offset-4 hover:no-underline"
				{...props}
			/>
		)
	},
	Image: (props: ImageProps) => <Image {...props} />,
	table: (props: React.HTMLAttributes<HTMLTableElement>) => (
		<table {...props} />
	),
	thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
		<thead {...props} />
	),
	tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
		<tbody {...props} />
	),
	tfoot: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
		<tfoot {...props} />
	),
	tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />,
	th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
		<th {...props} />
	),
	td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
		<td {...props} />
	),
}
