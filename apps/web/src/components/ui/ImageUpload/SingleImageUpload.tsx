import { Image, Trash } from 'lucide-react'
import { useState } from 'react'
import Dropzone from 'react-dropzone'
import ImageCropperModal from './ImageCropperModal'
import NiceModal from '@ebay/nice-modal-react'
import { cn } from '@/helpers/utils'

type SingleImageUploadProps = {
	initialImage?: string // The current image URL
	aspectRatio?: number // The aspect ratio of the image
	maxSize?: number // The maximum size of the image in bytes
	removable?: boolean // Whether the image can be removed
	onImageCrop: (file: File | null) => void // Called when the image is cropped
	className?: string
	chooseImageClassName?: string
}

type STEP = 'upload' | 'crop' | 'preview'

export default function SingleImageUpload({
	initialImage,
	aspectRatio = 1 / 1,
	maxSize = 1024 * 1024 * 5,
	removable = true,
	onImageCrop,
	className,
	chooseImageClassName,
}: SingleImageUploadProps) {
	const [step, setStep] = useState<STEP>(initialImage ? 'preview' : 'upload')
	const [image, setImage] = useState<string | File>(initialImage || '')

	function onDrop(acceptedFiles: File[]) {
		if (!acceptedFiles || acceptedFiles?.length == 0) return
		let file = acceptedFiles[0]
		if (!file) return

		setStep('crop')

		NiceModal.show(ImageCropperModal, {
			file,
			aspectRatio,
		})
			.then((file: any) => {
				onImageCrop(file)
				setImage(file)
				setStep('preview')
			})
			.catch(() => {
				setStep('upload')
			})
	}

	function onImageRemove() {
		setStep('upload')
		if (removable) onImageCrop(null)
	}

	function onImageUndo() {
		setStep('preview')
		if (removable) {
			if (image instanceof File) onImageCrop(image)
			else {
				onImageCrop(new File([], image))
			}
		}
	}

	if (step == 'upload' || step == 'crop') {
		return (
			<div>
				<Dropzone
					disabled={step == 'crop'}
					maxSize={maxSize}
					accept={{
						'image/png': ['.png'],
						'image/jpeg': ['.jpg', '.jpeg'],
					}}
					maxFiles={1}
					onDrop={onDrop}
				>
					{({ getRootProps, getInputProps }) => (
						<div
							{...getRootProps()}
							className={cn(
								'rounded-xl bg-slate-50 border border-dashed border-gray-600/10 text-sm hover:bg-gray-100 cursor-pointer transition-all ease-in-out delay-50',
								step == 'crop' &&
									'opacity-50 hover:bg-gray-200 cursor-not-allowed',
								className,
								chooseImageClassName
							)}
						>
							<div className="p-1 w-full h-full flex flex-col gap-2 items-center justify-center">
								<input {...getInputProps()} />
								<Image className='text-gray-600' size={20} />
								<div className="flex items-center text-center flex-col text-slate-900">
									<p className="font-medium text-xs text-gray-600">
										Choose image
									</p>
								</div>
							</div>
						</div>
					)}
				</Dropzone>
				{image && (
					<p className="text-xs text-gray-700 font-medium mt-2">
						Image removed,{' '}
						<span
							className="text-gray-900 font-semibold cursor-pointer hover:underline"
							onClick={onImageUndo}
						>
							Undo
						</span>
					</p>
				)}
			</div>
		)
	}
	if (step == 'preview') {
		return (
			<div
				className={cn(
					'group relative border border-gray-600/10 bg-gray-50 rounded-xl overflow-hidden',
					chooseImageClassName,
					className
				)}
			>
				<img
					src={
						typeof image == 'string'
							? image
							: URL.createObjectURL(image)
					}
					className={className}
				/>
				<button
					className="hidden drop-shadow-lg group-hover:flex absolute rounded-xl bg-red-500 p-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
					onClick={onImageRemove}
				>
					<Trash className="text-white" size={16} />
				</button>
			</div>
		)
	}

	return null
}
