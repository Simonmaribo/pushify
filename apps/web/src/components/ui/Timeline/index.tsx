import React from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/helpers/utils'
import { Check, Circle, Dot } from 'lucide-react'

const timelineVariants = cva('grid', {
	variants: {
		positions: {
			left: '[&>li]:grid-cols-[0_min-content_1fr]',
			right: '[&>li]:grid-cols-[1fr_min-content]',
			center: '[&>li]:grid-cols-[1fr_min-content_1fr]',
		},
	},
	defaultVariants: {
		positions: 'left',
	},
})

interface TimelineProps
	extends React.HTMLAttributes<HTMLUListElement>,
		VariantProps<typeof timelineVariants> {}

const Timeline = React.forwardRef<HTMLUListElement, TimelineProps>(
	({ children, className, positions, ...props }, ref) => {
		return (
			<ul
				className={cn(timelineVariants({ positions }), className)}
				ref={ref}
				{...props}
			>
				{children}
			</ul>
		)
	}
)
Timeline.displayName = 'Timeline'

const timelineItemVariants = cva('grid items-center gap-x-2', {
	variants: {
		status: {
			done: 'text-[hsl(240_5.9%_10%)]',
			default: 'text-[hsl(240_3.8%_46.1%)]',
		},
	},
	defaultVariants: {
		status: 'default',
	},
})

interface TimelineItemProps
	extends React.HTMLAttributes<HTMLLIElement>,
		VariantProps<typeof timelineItemVariants> {}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
	({ className, status, ...props }, ref) => (
		<li
			className={cn(timelineItemVariants({ status }), className)}
			ref={ref}
			{...props}
		/>
	)
)
TimelineItem.displayName = 'TimelineItem'

const timelineDotVariants = cva(
	'col-start-2 col-end-3 row-start-1 row-end-1 flex size-6 items-center justify-center rounded-full border border-current',
	{
		variants: {
			status: {
				default: '[&>*]:hidden',
				current: '',
				done: 'bg-emerald-300 border-emerald-500',
				custom: '[&>*:not(:nth-child(4))]:hidden [&>*:nth-child(4)]:block',
			},
		},
		defaultVariants: {
			status: 'default',
		},
	}
)

interface TimelineDotProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof timelineDotVariants> {
	customIcon?: React.ReactNode
}

const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
	({ className, status, customIcon, ...props }, ref) => (
		<div
			role="status"
			className={cn(
				'timeline-dot',
				timelineDotVariants({ status }),
				className
			)}
			ref={ref}
			{...props}
		>
			{
				{
					default: <Circle className="size-2.5" />,
					current: <Dot strokeWidth={13} className="text-gray-800" />,
					done: (
						<Check
							className="size-4 text-emerald-700"
							strokeWidth={2.5}
						/>
					),
				}[status as 'default' | 'current' | 'done']
			}
		</div>
	)
)
TimelineDot.displayName = 'TimelineDot'

const timelineContentVariants = cva(
	'row-start-2 row-end-2 pb-16 text-[hsl(240_3.8%_46.1%)]',
	{
		variants: {
			side: {
				right: 'col-start-3 col-end-4 mr-auto text-left',
				left: 'col-start-1 col-end-2 ml-auto text-right',
			},
		},
		defaultVariants: {
			side: 'right',
		},
	}
)

interface TimelineConentProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof timelineContentVariants> {}

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineConentProps>(
	({ className, side, ...props }, ref) => (
		<div
			className={cn(timelineContentVariants({ side }), className)}
			ref={ref}
			{...props}
		/>
	)
)
TimelineContent.displayName = 'TimelineContent'

const timelineHeadingVariants = cva(
	'row-start-1 row-end-1 line-clamp-1 max-w-full truncate',
	{
		variants: {
			side: {
				right: 'col-start-3 col-end-4 mr-auto text-left',
				left: 'col-start-1 col-end-2 ml-auto text-right',
			},
			variant: {
				primary: 'text-base font-medium text-[hsl(240_5.9%_10%)]',
				secondary: 'text-sm font-light text-[hsl(240_3.8%_46.1%)]',
			},
		},
		defaultVariants: {
			side: 'right',
			variant: 'primary',
		},
	}
)

interface TimelineHeadingProps
	extends React.HTMLAttributes<HTMLParagraphElement>,
		VariantProps<typeof timelineHeadingVariants> {}

const TimelineHeading = React.forwardRef<
	HTMLParagraphElement,
	TimelineHeadingProps
>(({ className, side, variant, ...props }, ref) => (
	<p
		role="heading"
		aria-level={variant === 'primary' ? 2 : 3}
		className={cn(timelineHeadingVariants({ side, variant }), className)}
		ref={ref}
		{...props}
	/>
))
TimelineHeading.displayName = 'TimelineHeading'

interface TimelineLineProps extends React.HTMLAttributes<HTMLHRElement> {
	done?: boolean
}

const TimelineLine = React.forwardRef<HTMLHRElement, TimelineLineProps>(
	({ className, done = false, ...props }, ref) => {
		return (
			<hr
				role="separator"
				aria-orientation="vertical"
				className={cn(
					'col-start-2 col-end-3 row-start-2 row-end-2 mx-auto flex h-full min-h-16 w-0.5 justify-center rounded-full',
					done ? 'bg-emerald-500' : 'bg-slate-200',
					className
				)}
				ref={ref}
				{...props}
			/>
		)
	}
)
TimelineLine.displayName = 'TimelineLine'

export {
	Timeline,
	TimelineDot,
	TimelineItem,
	TimelineContent,
	TimelineHeading,
	TimelineLine,
}
