import { cn } from '@/helpers/utils'
import Navbar from './Navbar'
import useWorkspace from '@/hooks/use-workspace'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import FullscreenLoading from '@/components/ui/Loading/FullscreenLoading'
import useUser from '@/hooks/use-user'

type DefaultLayoutProps = {
	children?: React.ReactNode
	className?: string
}

export default function DefaultLayout({
	children,
	className,
}: DefaultLayoutProps) {
	const { workspace, isLoading } = useWorkspace()
	const { user, isLoading: isUserLoading } = useUser()
	const router = useRouter()
	useEffect(() => {
		if (!isLoading && workspace == null) {
			router.push('/app')
		}
	}, [isLoading, router, workspace])

	if (isLoading || isUserLoading) {
		return <FullscreenLoading />
	}

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className={cn('flex-1', className)}>{children}</main>
			<footer />
		</div>
	)
}
