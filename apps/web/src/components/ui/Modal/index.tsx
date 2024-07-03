import { cn } from '@/helpers/utils'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '../Dialog'
import { NiceModalHandler } from '@ebay/nice-modal-react'

export function Modal({
	modal,
	title,
	description,
	children,
	removeOnClose = true,
	closeable = true,
	className = '',
	headerClassName = '',
	size = 'md',
}: {
	modal: NiceModalHandler
	title?: React.ReactNode
	description?: React.ReactNode
	children?: React.ReactNode
	removeOnClose?: boolean
	closeable?: boolean
	className?: string
	headerClassName?: string
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
}) {
	const getSize = () => {
		switch (size) {
			case 'xs':
				return 'max-w-xs'
			case 'sm':
				return 'max-w-sm'
			case 'md':
				return 'max-w-md'
			case 'lg':
				return 'max-w-lg'
			case 'xl':
				return 'max-w-xl'
			case '2xl':
				return 'max-w-2xl'
			case '3xl':
				return 'max-w-3xl'
			case '4xl':
				return 'max-w-4xl'
		}
	}

	return (
		<Dialog
			open={modal.visible}
			onOpenChange={(value) => {
				if (!value) {
					if (!closeable) return
					modal.hide()
					if (removeOnClose) {
						modal.remove()
					}

					// FIX: This is a fix for when a popover is open and the modal is closed (clicking outside the modal)
					const body = document.body
					setTimeout(() => {
						body?.style.setProperty('pointer-events', 'auto')
					}, 300)
				}
			}}
		>
			<DialogContent
				className={cn('overflow-hidden', className, getSize())}
				closeButton={closeable}
			>
				{(title || description) && (
					<DialogHeader className={cn('b-5', headerClassName)}>
						{title && <DialogTitle>{title}</DialogTitle>}
						{description && (
							<DialogDescription>{description}</DialogDescription>
						)}
					</DialogHeader>
				)}
				{children}
			</DialogContent>
		</Dialog>
	)
}
