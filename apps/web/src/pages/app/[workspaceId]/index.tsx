import DefaultLayout from '@/components/layouts/DefaultLayout'
import withAuth from '@/hoc/with-auth'
import useWorkspace from '@/hooks/use-workspace'

function Dashboard() {
	const { workspace } = useWorkspace()
	return (
		<DefaultLayout className="bg-neutral-50" active="overview">
			<div className=" mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
				Dashboard {workspace?.name}
			</div>
		</DefaultLayout>
	)
}

export default withAuth(Dashboard)
