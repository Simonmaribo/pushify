import React, { useEffect, useState } from 'react'

type OnboardingContextType = {
	step: number
	setStep: (step: number) => void
	apiKey: string | null
	setAPIKey: (key: string) => void
	showAPIKey: boolean
	setShowAPIKey: (show: boolean) => void
	channel: {
		id: string
		name: string
		code: string
	} | null
	setChannel: (channel: { id: string; name: string; code: string }) => void
}

const OnboardingContext = React.createContext<OnboardingContextType>({
	step: 0,
	setStep: () => {},
	apiKey: null,
	setAPIKey: () => {},
	showAPIKey: false,
	setShowAPIKey: () => {},
	channel: null,
	setChannel: () => {},
})

export function useOnboarding() {
	const value = React.useContext(OnboardingContext)
	if (process.env.NODE_ENV !== 'production') {
		if (!value) {
			throw new Error(
				'useOnboarding must be wrapped in a <OnboardingProvider />'
			)
		}
	}
	return value
}

type OnboardingProviderProps = {
	step: number
	setStep: (step: number) => void
	children: React.ReactNode
}

export function OnboardingProvider(props: OnboardingProviderProps) {
	const [apiKey, setAPIKey] = useState<string | null>(null)
	const [showAPIKey, setShowAPIKey] = useState(false)
	const [channel, setChannel] = useState<{
		id: string
		name: string
		code: string
	} | null>(null)

	return (
		<OnboardingContext.Provider
			value={{
				step: props.step,
				setStep: props.setStep,
				apiKey,
				setAPIKey,
				showAPIKey,
				setShowAPIKey,
				channel,
				setChannel,
			}}
		>
			{props.children}
		</OnboardingContext.Provider>
	)
}
