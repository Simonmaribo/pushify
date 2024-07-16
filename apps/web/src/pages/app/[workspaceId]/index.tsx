import DefaultLayout from '@/components/layouts/DefaultLayout'
import OnboardingPage from '@/components/organisms/onboarding/OnboardingPage'
import withAuth from '@/hoc/with-auth'
import useWorkspace from '@/hooks/use-workspace'

function Dashboard() {
	const { workspace } = useWorkspace()
	return (
		<DefaultLayout
			className={workspace?.onboarded ? 'bg-neutral-50' : 'bg-white'}
			active="overview"
		>
			<div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20 py-8">
				{workspace?.onboarded ? (
					<div>You are onboarded</div>
				) : (
					<OnboardingPage />
				)}
			</div>
		</DefaultLayout>
	)
}

export default withAuth(Dashboard)
