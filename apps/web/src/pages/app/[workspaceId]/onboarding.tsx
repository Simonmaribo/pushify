import DefaultLayout from '@/components/layouts/DefaultLayout'
import Meta from '@/components/layouts/Meta'
import OnboardingPage from '@/components/organisms/onboarding/OnboardingPage'
import withAuth from '@/hoc/with-auth'
import useWorkspace from '@/hooks/use-workspace'

function Dashboard() {
	const { workspace } = useWorkspace()
	return (
		<DefaultLayout className={'bg-white'}>
			<Meta title="Channels · Pushify" />
			<div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20 py-8">
				<OnboardingPage />
			</div>
		</DefaultLayout>
	)
}

export default withAuth(Dashboard)
