import DefaultLayout from '@/components/layouts/DefaultLayout'
import Meta from '@/components/layouts/Meta'
import ChannelListPage from '@/components/organisms/channels/ChannelListPage'
import OnboardingPage from '@/components/organisms/onboarding/OnboardingPage'
import withAuth from '@/hoc/with-auth'
import useWorkspace from '@/hooks/use-workspace'

function Dashboard() {
	const { workspace } = useWorkspace()
	return (
		<DefaultLayout
			className={workspace?.onboarded ? 'bg-neutral-50' : 'bg-white'}
			active="channels"
		>
			<Meta title="Channels · Pushify" />
			<div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20 py-8">
				{workspace?.onboarded ? (
					<ChannelListPage />
				) : (
					<OnboardingPage />
				)}
			</div>
		</DefaultLayout>
	)
}

export default withAuth(Dashboard)
