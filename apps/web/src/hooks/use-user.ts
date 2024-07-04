import Router from 'next/router'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import getUser from '@/queries/user/getUser'

export default function useUser({
	redirectTo = '',
	redirectIfFound = false,
} = {}) {
	const {
		isLoading,
		isError,
		data: user,
		error,
	} = useQuery({
		queryKey: ['user'],
		queryFn: async () => await getUser(),
		retry: false,
	})

	useEffect(() => {
		if (!redirectTo || !user) return
		if (
			(redirectTo && !redirectIfFound && !user) ||
			(redirectIfFound && user)
		) {
			Router.push(redirectTo)
		}
	}, [user, redirectIfFound, redirectTo])

	return { user, isLoading, isError, error }
}
