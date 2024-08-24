import Button from '@/components/ui/Button'
import { useOnboarding } from '@/contexts/OnboardingContext'
import useWorkspace from '@/hooks/use-workspace'
import http, { getError } from '@/queries/http'
import { useState } from 'react'
import { toast } from 'sonner'

export default function DoneStep() {
	const [submitting, setSubmitting] = useState(false)
	const { step } = useOnboarding()
	const isDone = step === 4
	const { workspace } = useWorkspace()

	async function completeOnboarding() {
		if (submitting) return
		setSubmitting(true)
		await http
			.post(`/workspace/${workspace?.id}/onboarding/complete`)
			.then(() => {
				window.location.reload()
			})
			.catch((error: any) => {
				toast.error(getError(error))
				setSubmitting(false)
			})
	}

	return (
		<div className="flex flex-col gap-2">
			<p className="text-sm">
				{isDone
					? 'To finish the onboarding, please click the button below.'
					: 'Complete the previous steps to finish the onboarding.'}
			</p>
			{isDone && (
				<Button
					variant="secondary"
					onClick={completeOnboarding}
					loading={submitting}
					disabled={submitting}
					className="w-fit"
				>
					Complete onboarding
				</Button>
			)}
		</div>
	)
}
