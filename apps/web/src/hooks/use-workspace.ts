import getWorkspaces from '@/queries/user/getWorkspaces'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

export default function useWorkspace() {
	const router = useRouter()

	const { workspaceId } = router.query

	const {
		isLoading,
		isError,
		data: workspaces,
		error,
	} = useQuery({
		queryKey: ['workspaces'],
		queryFn: async () => await getWorkspaces(),
	})

	return {
		isLoading,
		isError,
		workspace: workspaces?.find(
			(workspace) => workspace.id === workspaceId
		),
		error,
	}
}
