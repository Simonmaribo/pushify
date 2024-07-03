import { cva } from 'class-variance-authority'

export const alertVariants = cva('', {
	variants: {
		variant: {
			inline: 'rounded-lg px-2 py-3 sm:items-center font-medium',
			expanded: 'gap-1 rounded-lg p-4 pl-14px',
		},
		color: {
			gray: 'border-gray-200 text-gray-500',
			primary: 'border-purple-500 text-gray-500',
			info: 'border-blue-500 bg-blue-50 text-blue-700',
			success: 'border-green-500 bg-green-50 text-green-700',
			error: 'border-red-500 bg-red-50 text-red-700',
			warning: 'border-yellow-500 bg-yellow-50 text-yellow-800',
		},
	},
	defaultVariants: {
		variant: 'inline',
		color: 'gray',
	},
})

export const alertTitleVariants = cva('text-start font-medium', {
	variants: {
		color: {
			gray: 'text-gray-900',
			primary: 'text-gray-900',
			info: 'text-blue-800',
			success: 'text-green-800',
			error: 'text-red-800',
			warning: 'text-yellow-800',
		},
	},
	defaultVariants: {
		color: 'gray',
	},
})

export const alertIconVariants = cva('', {
	variants: {
		color: {
			gray: 'text-gray-200',
			primary: 'text-purple-500',
			info: 'text-blue-500',
			success: 'text-green-600',
			error: 'text-red-500',
			warning: 'text-yellow-500',
		},
	},
	defaultVariants: {
		color: 'gray',
	},
})
