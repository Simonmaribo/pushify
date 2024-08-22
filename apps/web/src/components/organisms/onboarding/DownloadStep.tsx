import Button from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { useOnboarding } from '@/contexts/OnboardingContext'
import useWorkspace from '@/hooks/use-workspace'
import http, { getError } from '@/queries/http'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useState } from 'react'

export default function DownloadStep() {
	const [submitting, setSubmitting] = useState(false)
	const { workspace } = useWorkspace()
	const { setStep, channel } = useOnboarding()
	const [deviceName, setDeviceName] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)

	async function checkForConnectionAndContinue() {
		if (submitting || deviceName) return
		setSubmitting(true)
		setError('')
		await http
			.get(`/workspace/${workspace?.id}/onboarding/get-devices`, {
				params: {
					channelId: channel?.id,
				},
			})
			.then((res) => {
				setDeviceName(
					res.data.device.deviceName ||
						res.data.device.deviceModelName
				)
				setStep(3)
				setSubmitting(false)
			})
			.catch((err) => {
				setSubmitting(false)
				setError(getError(err))
			})
	}

	return (
		<div className="flex flex-col gap-2">
			{channel ? (
				<>
					<p className="text-sm">
						Download the `Pushify` app on your phone to subscribe to{' '}
						<span className="font-medium text-gray-800">
							{channel?.name}
						</span>{' '}
						using the code:
					</p>
					<div className="flex gap-1">
						{channel?.code.split('').map((char, i) => (
							<div
								key={i}
								className="text-2xl text-gray-800 bg-white border shadow size-8 flex items-center justify-center rounded-lg"
							>
								{char}
							</div>
						))}
					</div>
				</>
			) : (
				<p className="text-sm">
					Download the `Pushify` app on your phone to connect to your
					channel
				</p>
			)}
			<div>
				<div className="flex gap-2">
					<a
						href="https://apps.apple.com/dk/app/pushify-notifications/id6517357435"
						target="_blank"
					>
						<img src="/img/appstore.svg" width="120" />
					</a>
					{/* 
					<a
						href="https://play.google.com/store/apps/details?id=com.simonmaribo.pandorabox"
						target="_blank"
					>
						<img src="/img/googleplay.png" width="120" />
					</a>
					*/}
				</div>
			</div>
			{channel && (
				<div>
					{!deviceName && (
						<a
							className="text-main hover:underline text-xs cursor-pointer"
							onClick={() => NiceModal.show(downloadModal)}
						>
							How to subscribe to a channel?
						</a>
					)}
					<div className="mt-4 flex gap-2 items-center">
						<Button
							disabled={submitting || deviceName != null}
							loading={submitting}
							onClick={checkForConnectionAndContinue}
						>
							{deviceName
								? `Connected to ${deviceName}`
								: 'Continue'}
						</Button>
						{error && (
							<p className="text-rose-500 text-sm">
								{error}. Please try again!
							</p>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

const downloadModal = NiceModal.create(() => {
	const modal = useModal()

	return (
		<Modal modal={modal} title="How to subscribe to channel">
			<p className="text-gray-700">
				Open the app and press{' '}
				<span className="font-medium text-main">Add channel</span>{' '}
				button in the top right corner and enter the code you have been
				given.
			</p>
			<div className="flex items-center justify-center">
				<div className="overflow-hidden rounded-lg">
					<img src="/img/subscribe.jpg" className="h-[400px]" />
				</div>
			</div>
		</Modal>
	)
})
