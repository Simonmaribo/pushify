import * as React from 'react'

import { cn } from '@/helpers/utils'
import { Label } from '@/components/ui/Label'
import { useFormField } from '@/components/ui/Form'

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	description?: string
	error?: string
	required?: boolean

	labelClassName?: string
	descriptionClassName?: string
	inputClassName?: string
	groupClassName?: string
}

const BaseInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		const {
			label,
			description,
			error,
			groupClassName,
			inputClassName,
			...domProps
		} = props

		return (
			<div className={cn('group flex flex-col gap-2', className)}>
				{label && (
					<>
						<Label
							className={cn(
								props.labelClassName ||
									'font-medium text-gray-800'
							)}
						>
							{label}
						</Label>
						{description && (
							<p
								ref={ref}
								className={cn(
									'text-sm text-gray-600 mb-2 font-normal',
									props.descriptionClassName
								)}
							>
								{props.description}
							</p>
						)}
					</>
				)}
				<input
					type={type}
					className={cn(
						'text-gray-600 font-normal text-sm bg-white flex p-2 px-4 rounded-md h-10 w-full border border-gray-600/20 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 outline-none focus-visible:ring-1 ring-gray-800',
						error && 'ring-rose-500',
						inputClassName
					)}
					ref={ref}
					{...domProps}
				/>
				{error && (
					<p
						ref={ref}
						className={cn('text-sm font-medium text-rose-500')}
					>
						{error}
					</p>
				)}
			</div>
		)
	}
)
BaseInput.displayName = 'BaseInput'

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		const { error } = useFormField()

		return (
			<BaseInput
				type={type}
				className={className}
				ref={ref}
				{...props}
				error={error?.message || undefined}
			/>
		)
	}
)

FormInput.displayName = 'FormInput'

export { BaseInput, FormInput }
