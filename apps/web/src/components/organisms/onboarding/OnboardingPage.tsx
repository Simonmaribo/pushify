import { useMemo, useState } from 'react'
import {
	Timeline,
	TimelineContent,
	TimelineDot,
	TimelineHeading,
	TimelineItem,
	TimelineLine,
} from '@/components/ui/Timeline'
import APIStep from './APIStep'
import { OnboardingProvider } from '@/contexts/OnboardingContext'
import ChannelStep from './ChannelStep'
import DownloadStep from './DownloadStep'
import SendMessageStep from './SendMessageStep'
import DoneStep from './DoneStep'

type Step = 'api_key' | 'create_channel' | 'download_app' | 'send_message'

export default function OnboardingPage() {
	const [step, setStep] = useState<number>(0)

	const STEPS = useMemo(() => {
		return [
			{
				title: 'Add an API key',
				content: <APIStep />,
			},
			{
				title: 'Create a channel',
				content: <ChannelStep />,
			},
			{
				title: 'Download the app and connect',
				content: <DownloadStep />,
			},
			{
				title: 'Send a message',
				content: <SendMessageStep />,
			},
			{
				title: 'Done!',
				content: <DoneStep />,
			},
		]
	}, [])

	return (
		<OnboardingProvider step={step} setStep={setStep}>
			<div className="mx-auto max-w-xl">
				<span className="uppercase text-sm font-semibold text-gray-700">
					Onboarding
				</span>
				<h1 className="font-semibold text-2xl text-gray-800">
					Send your first Push Notification
				</h1>
				<p className="text-gray-600 mt-2 text-sm">
					This onboarding will help you send your first push
					notification and learn how to use the Pushify API yourself,
					so that you can integrate it into your own applications and
					workflows.
				</p>
			</div>
			<Timeline className="mx-auto mt-4 max-w-xl">
				{Array.from({ length: STEPS.length }).map((_, index) => {
					const currentStep = index === step
					const done = index < step

					const notCurrentOrDone = !currentStep && !done
					return (
						<TimelineItem
							key={index}
							status={done ? 'done' : 'default'}
							className={
								notCurrentOrDone
									? 'opacity-50 cursor-not-allowed pointer-events-none select-none'
									: ''
							}
						>
							<TimelineHeading>
								{STEPS[index].title}
							</TimelineHeading>
							<TimelineDot
								status={
									done
										? 'done'
										: currentStep
											? 'current'
											: 'default'
								}
							/>
							<TimelineLine done={done} />
							<TimelineContent>
								{STEPS[index].content}
							</TimelineContent>
						</TimelineItem>
					)
				})}
			</Timeline>
		</OnboardingProvider>
	)
}
