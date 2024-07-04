import { cn } from '@/helpers/utils'
import Navbar from './Navbar'

type DefaultLayoutProps = {
	children?: React.ReactNode
	className?: string
}

export default function DefaultLayout({
	children,
	className,
}: DefaultLayoutProps) {
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className={cn('flex-1 bg-neutral-50', className)}>
				<div className="max-w-7xl mx-auto">{children}</div>
			</main>
			<footer />
		</div>
	)
}
