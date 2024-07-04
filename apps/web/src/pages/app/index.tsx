import FullscreenLoading from '@/components/ui/Loading/FullscreenLoading'
import withAuth from '@/hoc/with-auth'
import useUser from '@/hooks/use-user'
import useWorkspaces from '@/hooks/use-workspaces'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function Home() {
	const { isLoading, workspaces } = useWorkspaces()
	const router = useRouter()
	const { user } = useUser()

	useEffect(() => {
		if (router.isReady) {
			if (!isLoading && workspaces && (workspaces?.length || 0 > 0)) {
				let lastWorkspaceId =
					window.localStorage.getItem('lastWorkspaceId')
				if (
					lastWorkspaceId &&
					workspaces.find((w) => w.id === lastWorkspaceId)
				) {
					router.push(`/app/${lastWorkspaceId}`)
				} else {
					router.push(`/app/${workspaces[0].id}`)
				}
			}
		}
	}, [router, isLoading, workspaces])

	if (!user || isLoading || (workspaces?.length || 0) > 0)
		return <FullscreenLoading />

	return (
		<div>Seems like something went wrong with creating your workspace.</div>
	)
}

export default withAuth(Home)
