import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'
import { useOnboarding } from '@/contexts/OnboardingContext'
import { cn } from '@/helpers/utils'
import useWorkspace from '@/hooks/use-workspace'
import http, { getError } from '@/queries/http'
import { Copy, CopyCheck, Eye, EyeOff, Lock } from 'lucide-react'
import { useState } from 'react'
import { IoWarningOutline } from 'react-icons/io5'
import { toast } from 'sonner'

export default function APIStep() {
	const [submitting, setSubmitting] = useState(false)
	const { workspace } = useWorkspace()
	const [copied, setCopied] = useState(false)

	const { apiKey, setAPIKey, setStep, showAPIKey, setShowAPIKey } =
		useOnboarding()

	async function createAPIKey() {
		if (submitting) return
		setSubmitting(true)
		await http
			.post(`/workspace/${workspace?.id}/onboarding/generate-api-key`)
			.then((res: any) => {
				setAPIKey(res.data.key)
				setStep(1)
			})
			.catch((err: any) => {
				toast.error(getError(err))
				setSubmitting(false)
			})
	}

	const handleCopy = () => {
		if (!apiKey) return
		toast.success('Copied to clipboard')
		window.navigator.clipboard.writeText(apiKey)
		if (copied) return
		setCopied(true)
		setTimeout(() => {
			setCopied(false)
		}, 2000)
	}

	return (
		<div className="flex flex-col gap-2">
			{!apiKey ? (
				<>
					<p>
						Use the button beneath to add an API key to your
						account. This will be an administrative key which has
						full access to your account.
					</p>
					<div>
						<Button
							variant="secondary"
							disabled={submitting}
							loading={submitting}
							onClick={createAPIKey}
						>
							<div className="flex items-center gap-2">
								<Lock size={16} />
								<span>Generate API Key</span>
							</div>
						</Button>
					</div>
				</>
			) : (
				<>
					<p className="text-sm">
						Use the following API key to authenticate requests to
						the Pushify API.
					</p>
					<div className="w-full">
						<div
							className={cn(
								'flex items-center pl-4 pr-1 w-full border rounded-lg overflow-hidden bg-gradient-to-r from-emerald-200 to-emerald-50 border-emerald-300'
							)}
						>
							<input
								type={showAPIKey ? 'text' : 'password'}
								value={apiKey}
								readOnly
								className="w-full focus:outline-none py-1 bg-inherit"
							/>
							<div className="flex gap-1.5">
								<button
									className="rounded-lg p-1 hover:bg-emerald-200"
									onClick={() => setShowAPIKey(!showAPIKey)}
								>
									{showAPIKey ? (
										<Eye size={16} strokeWidth={2.5} />
									) : (
										<EyeOff size={16} strokeWidth={2.5} />
									)}
								</button>
								<button
									className="rounded-lg p-1 hover:bg-emerald-200"
									onClick={handleCopy}
								>
									{copied ? (
										<CopyCheck
											size={14}
											strokeWidth={2.5}
										/>
									) : (
										<Copy size={14} strokeWidth={2.5} />
									)}
								</button>
							</div>
						</div>
					</div>
					<div className="flex">
						<Tooltip
							className="bg-gray-800"
							jsx={
								<div className="max-w-[500px] text-white">
									<p className="text-xs">
										We recommend that you generate a new API
										key with restricted permissions after
										the onboarding and delete this key.
									</p>
								</div>
							}
						>
							<p className="text-rose-500 text-sm font-semibold flex items-center gap-1">
								Security risk!
								<IoWarningOutline />
							</p>
						</Tooltip>
					</div>
				</>
			)}
		</div>
	)
}
