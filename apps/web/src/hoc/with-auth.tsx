import { useEffect } from 'react'
import useUser from '@/hooks/use-user'
import { useRouter } from 'next/router'
import FullscreenLoading from '@/components/ui/Loading/FullscreenLoading'

type AuthOptions = {
	requireEmailVerification?: boolean
}

export default function withAuth(
	Component: React.ComponentType,
	options: AuthOptions = {
		requireEmailVerification: true,
	}
) {
	const Authentication = () => {
		const router = useRouter()

		const { user, isLoading, isError } = useUser()

		useEffect(() => {
			if (isError) {
				router.push('/app/auth/login')
			} else if (user) {
				/*if (options.requireEmailVerification && !user.emailVerified) {
					router.push('/auth/verify-email')
				}*/
			}
		}, [router, user, isError])

		if (isError || !user) return <FullscreenLoading />
		if (isLoading) return <FullscreenLoading />

		/*if (options.requireEmailVerification && !user.emailVerified)
			return <FullscreenLoading />*/

		return <Component />
	}
	return Authentication
}
