import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '@/helpers/utils'

const Avatar = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Root
		ref={ref}
		className={cn(
			'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
			className
		)}
		{...props}
	/>
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Image>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Image
		ref={ref}
		className={cn('aspect-square h-full w-full', className)}
		{...props}
	/>
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

type AvatarFallbackProps = {
	children?: string
	hash?: string
} & React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>

const AvatarFallback = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Fallback>,
	AvatarFallbackProps
>(({ className, hash, ...props }, ref) => {
	const hashed =
		hash || props.children
			? Array.from(hash || props?.children?.toString() || '').reduce(
					(acc, char) => {
						acc = (acc << 5) - acc + char.charCodeAt(0)
						return acc & acc
					},
					0
				)
			: 0

	const colors = [
		'bg-gradient-to-r from-violet-400 to-violet-700',
		'bg-gradient-to-r from-purple-700 to-purple-400',
	]

	const color = colors[Math.abs(hashed) % colors.length]

	return (
		<AvatarPrimitive.Fallback
			ref={ref}
			className={cn(
				'flex h-full w-full items-center justify-center rounded-full bg-purple-500 text-white font-medium text-sm',
				color,
				className
			)}
			{...props}
		/>
	)
})
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
