import getWorkspaces from '@/queries/user/getWorkspaces'
import { useQuery } from '@tanstack/react-query'

export default function useWorkspaces() {
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
		workspaces,
		error,
	}
}
