import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'

import { cn } from '@/helpers/utils'

const sizes = {
	sm: {
		root: `h-4 w-[1.65rem]`,
		thumb: `h-3 w-3 data-[state=checked]:translate-x-2.5`,
	},
	md: {
		root: `h-5 w-[2.15rem]`,
		thumb: `h-4 w-4 data-[state=checked]:translate-x-3.5`,
	},
	lg: {
		root: `h-6 w-11`,
		thumb: `h-5 w-5 data-[state=checked]:translate-x-5`,
	},
}

interface SwitchProps
	extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
	size?: keyof typeof sizes
}

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	SwitchProps
>(({ className, ...props }, ref) => (
	<SwitchPrimitives.Root
		className={cn(
			'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-main data-[state=unchecked]:bg-gray-200',
			sizes[props.size || 'lg'].root,
			className
		)}
		{...props}
		ref={ref}
	>
		<SwitchPrimitives.Thumb
			className={cn(
				'pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0',
				sizes[props.size || 'lg'].thumb
			)}
		/>
	</SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
