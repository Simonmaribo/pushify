import { cva } from 'class-variance-authority'

export const badgeVariants = cva(
	'inline-flex items-center rounded-lg px-2 py-1 antialiased',
	{
		variants: {
			size: {
				sm: 'text-xs font-semibold leading-4',
				md: 'text-sm font-semibold leading-5',
			},
			color: {
				'white-outline': ['text-gray-700 outline-gray-100 bg-white'],
				gray: ['text-gray-500 outline-gray-200 bg-gray-50'],
				green: ['text-green-800 outline-green-200 bg-green-50'],
				purple: ['text-purple-700 outline-purple-200 bg-purple-50'],
				orange: ['text-orange-800 outline-orange-200 bg-orange-50'],
				red: ['text-red-700 outline-red-200 bg-red-50'],
				pink: ['text-pink-800 outline-pink-200 bg-pink-50'],
				blue: ['text-blue-700 outline-blue-200 bg-blue-50'],
				yellow: ['text-yellow-800 outline-yellow-300 bg-yellow-50'],
			},
			shape: {
				rounded: 'rounded-lg',
				pill: 'rounded-full',
			},
			stroke: {
				true: 'outline outline-1 -outline-offset-1',
				false: '',
			},
		},
		defaultVariants: {
			color: 'gray',
			shape: 'rounded',
		},
	}
)

export const iconVariants = cva('size-4', {
	variants: {
		color: {
			'white-outline': 'text-gray-700',
			gray: 'text-gray-400',
			green: 'text-green-700',
			purple: 'text-purple-700',
			orange: 'text-orange-700',
			red: 'text-red-700',
			pink: 'text-pink-700',
			blue: 'text-blue-700',
			yellow: 'text-yellow-700',
		},
	},
	defaultVariants: {
		color: 'gray',
	},
})
