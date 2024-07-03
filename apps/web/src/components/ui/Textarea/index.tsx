import * as React from 'react'

import { Label } from '../Label'
import { useFormField } from '../Form'
import { cn } from '@/helpers/utils'

export interface InputProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string
	description?: string
	error?: string
	required?: boolean
	textAreaClassName?: string
}

const BaseTextarea = React.forwardRef<HTMLTextAreaElement, InputProps>(
	({ className, textAreaClassName, ...props }, ref) => {
		const { label, description, error, rows, ...domProps } = props

		return (
			<div className={cn('group flex flex-col gap-2', className)}>
				{label && (
					<>
						<Label>
							{label}
							{props.required && (
								<span className="text-error-500"> *</span>
							)}
						</Label>
						{description && (
							<p className={cn('text-sm text-gray-500')}>
								{props.description}
							</p>
						)}
					</>
				)}
				<textarea
					className={cn(
						'text-gray-600 bg-white shadow-sm flex p-2 px-4 rounded-md h-10 w-full border border-gray-600/10 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 outline-none focus-visible:ring-2 ring-purple-500',
						error && 'ring-rose-500',
						textAreaClassName
					)}
					ref={ref}
					{...domProps}
					rows={rows || 3}
				/>
				{error && (
					<p className={cn('text-sm font-medium text-error-500')}>
						{error}
					</p>
				)}
			</div>
		)
	}
)
BaseTextarea.displayName = 'BaseTextarea'

const FormTextarea = React.forwardRef<HTMLTextAreaElement, InputProps>(
	({ className, ...props }, ref) => {
		const { error } = useFormField()

		return (
			<BaseTextarea
				className={className}
				ref={ref}
				{...props}
				error={error?.message || undefined}
			/>
		)
	}
)

FormTextarea.displayName = 'FormTextarea'

export { BaseTextarea, FormTextarea }
