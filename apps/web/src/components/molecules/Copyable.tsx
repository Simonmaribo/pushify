import { Copy, CopyCheck } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

type CopyableProps = {
	text: string
	withText?: boolean
}

export default function Copyable({ text, withText }: CopyableProps) {
	const [copied, setCopied] = useState(false)

	const handleCopy = () => {
		toast.success('Copied to clipboard')
		window.navigator.clipboard.writeText(text)
		if (copied) return
		setCopied(true)
		setTimeout(() => {
			setCopied(false)
		}, 2000)
	}

	if (copied) {
		return (
			<div className="flex items-center gap-2">
				{withText && <p className="text-main-500 text-xs">Copied</p>}
				<CopyCheck
					size={14}
					className="cursor-pointer mr-2 text-main-500"
					onClick={handleCopy}
				/>
			</div>
		)
	} else {
		return (
			<Copy
				size={14}
				className="cursor-pointer mr-2 text-gray-600 hover:text-gray-800 transition-all"
				onClick={handleCopy}
			/>
		)
	}
}
