import DefaultLayout from '@/components/layouts/DefaultLayout'
import withAuth from '@/hoc/with-auth'
import useWorkspace from '@/hooks/use-workspace'

function Dashboard() {
	const { workspace } = useWorkspace()
	return <DefaultLayout>Dashboard {workspace?.name}</DefaultLayout>
}

export default withAuth(Dashboard)
