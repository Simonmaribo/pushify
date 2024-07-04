import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
		'../../node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				tremor: {
					brand: {
						faint: colors.blue[50],
						muted: colors.blue[200],
						subtle: colors.blue[400],
						DEFAULT: colors.blue[500],
						emphasis: colors.blue[700],
						inverted: colors.white,
					},
					background: {
						muted: colors.gray[50],
						subtle: colors.gray[100],
						DEFAULT: colors.white,
						emphasis: colors.gray[700],
					},
					border: {
						DEFAULT: colors.gray[200],
					},
					ring: {
						DEFAULT: colors.gray[200],
					},
					content: {
						subtle: colors.gray[400],
						DEFAULT: colors.gray[500],
						emphasis: colors.gray[700],
						strong: colors.gray[900],
						inverted: colors.white,
					},
				},
				blue: {
					50: '#E7F4FC',
					100: '#D5EBFB',
					200: '#B0DAF7',
					300: '#8BC9F3',
					400: '#66B7EF',
					500: '#41A6EB',
					600: '#178DDD',
					700: '#126CAA',
					800: '#0D4C77',
					900: '#072C44',
				},
				gray: {
					50: '#F7F7F8',
					100: '#EBEBEF',
					200: '#D1D1DB',
					300: '#A9A9BC',
					400: '#8A8AA3',
					500: '#6C6C89',
					600: '#55556D',
					700: '#3F3F50',
					800: '#282833',
					900: '#121217',
				},
				'picton-blue': {
					DEFAULT: '#41A6EB',
					50: '#E7F4FC',
					100: '#D5EBFB',
					200: '#B0DAF7',
					300: '#8BC9F3',
					400: '#66B7EF',
					500: '#41A6EB',
					600: '#178DDD',
					700: '#126CAA',
					800: '#0D4C77',
					900: '#072C44',
					950: '#051B2B',
				},
				mainGray: '#f7f7f5',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				lineSpinner: {
					'0%, 25%': {
						strokeDashoffset: 'var(--dashoffset-97)',
						transform: 'rotate(0)',
					},

					'50%, 75%': {
						strokeDashoffset: 'var(--dashoffset-25)',
						transform: 'rotate(45deg)',
					},

					'100%': {
						strokeDashoffset: 'var(--dashoffset-97)',
						transform: 'rotate(360deg)',
					},
				},
				'caret-blink': {
					'0%,70%,100%': { opacity: '1' },
					'20%,50%': { opacity: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'line-spinner': 'lineSpinner 1.5s ease-in-out infinite both',
				'caret-blink': 'caret-blink 1.25s ease-out infinite',
			},
			boxShadow: {
				'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
				'tremor-card':
					'0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
				'tremor-dropdown':
					'0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
			},
			borderRadius: {
				'tremor-small': '0.375rem',
				'tremor-default': '0.5rem',
				'tremor-full': '9999px',
			},
			fontSize: {
				'tremor-label': ['0.75rem', { lineHeight: '1rem' }],
				'tremor-default': ['0.875rem', { lineHeight: '1.25rem' }],
				'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
				'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }],
			},
			gridTemplateColumns: {
				login: '60% 1fr',
			},
		},
	},
	plugins: [
		require('tailwindcss-animate'),
		require('@headlessui/tailwindcss'),
	],
} satisfies Config

export default config
