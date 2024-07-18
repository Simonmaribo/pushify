import { cn } from '@/helpers/utils'
import { Copy, CopyCheck } from 'lucide-react'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
	oneDark,
	oneLight,
} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { toast } from 'sonner'

type Language = 'nodejs' | 'java' | 'javascript'

function getLanguageProps(language: Language) {
	switch (language) {
		case 'nodejs':
			return {
				title: 'Node.js',
				prismLanguage: 'javascript',
			}
		case 'javascript':
			return {
				title: 'JavaScript',
				prismLanguage: 'javascript',
			}
		case 'java':
			return {
				title: 'Java',
				prismLanguage: 'java',
			}
	}
}

type CodeExample = {
	language: Language
	code: string
	title: string
}

type CodeBlockV2Props = {
	examples: CodeExample[]
	wrapLongLines?: boolean
	className?: string
}

export default function CodeBlock({
	examples,
	wrapLongLines = true,
	className,
}: CodeBlockV2Props) {
	const [selectedTitle, setSelectedTitle] = useState<string>(
		examples[0].title
	)
	const [copied, setCopied] = useState(false)

	const handleCopy = () => {
		const code =
			examples.find((example) => example.title == selectedTitle)?.code ||
			''
		toast.success('Copied to clipboard')
		window.navigator.clipboard.writeText(code)
		if (copied) return
		setCopied(true)
		setTimeout(() => {
			setCopied(false)
		}, 2000)
	}

	return (
		<div
			className={cn(
				'rounded-xl border border-gray-600/10 flex flex-col overflow-hidden',
				className
			)}
		>
			<div className="flex justify-between items-center p-4 border-b border-gray-600/10">
				<div className="overflow-x-scroll flex gap-2 items-center text-xs flex-1">
					{examples.map((example, index) => (
						<button
							type="button"
							key={index}
							onClick={() => setSelectedTitle(example.title)}
							className={cn(
								'py-1 px-2 rounded-lg border border-transparent hover:bg-slate-50',
								example.title === selectedTitle &&
									'bg-slate-50 border border-gray-600/10'
							)}
						>
							<p className="text-xs font-medium text-gray-800">
								{example.title}
							</p>
						</button>
					))}
				</div>
				{copied ? (
					<div className="flex items-center gap-2">
						<p className="text-main-500 text-xs">Copied</p>
						<CopyCheck
							size={14}
							className="cursor-pointer mr-2 text-main-500"
							onClick={handleCopy}
						/>
					</div>
				) : (
					<Copy
						size={14}
						className="cursor-pointer mr-2 text-gray-600 hover:text-gray-800 transition-all"
						onClick={handleCopy}
					/>
				)}
			</div>
			<div className="">
				<SyntaxHighlighter
					language={
						getLanguageProps(
							examples.find(
								(example) => example.title === selectedTitle
							)?.language || 'javascript'
						).prismLanguage
					}
					style={oneLight}
					wrapLongLines={wrapLongLines}
					customStyle={{
						margin: 0,
						borderTopRightRadius: 0,
						borderTopLeftRadius: 0,
						fontSize: 14,
					}}
				>
					{examples.find((example) => example.title === selectedTitle)
						?.code || ''}
				</SyntaxHighlighter>
			</div>
		</div>
	)
}
