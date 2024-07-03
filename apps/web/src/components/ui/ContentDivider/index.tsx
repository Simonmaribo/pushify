import { cn } from '@/helpers/utils'

const ContentDivider = ({
	className,
	children,
}: {
	className?: string
	children?: React.ReactNode
}) => {
	return (
		<div className={cn('flex items-center border-gray-200', className)}>
			<div className="border-t flex-grow border-inherit"></div>
			{children && <div className="px-4 text-slate-700">{children}</div>}
			<div className="border-t flex-grow border-inherit"></div>
		</div>
	)
}

ContentDivider.displayName = 'ContentDivider'

export { ContentDivider }
