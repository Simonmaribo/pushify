import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useRef } from 'react'
import Cropper, { ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { Modal } from '@/components/ui/Modal'
import Button from '../Button'

type ImageCropperModalProps = {
	file: File
	aspectRatio: number
}

export default NiceModal.create(
	({ file, aspectRatio }: ImageCropperModalProps) => {
		const modal = useModal()

		const cropperRef = useRef<ReactCropperElement>(null)

		async function cancel() {
			modal.reject()
			modal.hide()
		}

		async function confirm() {
			const cropper = cropperRef?.current?.cropper
			if (!cropper) return cancel()
			let base64 = cropper.getCroppedCanvas().toDataURL()

			let blob = await fetch(base64).then((r) => r.blob())

			let fileName = file.name || 'image.png'

			let newFile = new File([blob], fileName, { type: 'image/png' })
			modal.resolve(newFile)
			modal.hide()
		}

		let fileUrl = URL.createObjectURL(file)

		return (
			<Modal
				modal={modal}
				className="p-0 m-0 overflow-hidden"
				closeable={false}
			>
				<div className="p-4 flex flex-col gap-4">
					<h1 className="text-xl font-semibold text-gray-900 text-center">
						Crop Image
					</h1>
					<Cropper
						ref={cropperRef}
						src={fileUrl}
						aspectRatio={aspectRatio}
						zoomOnWheel={false}
					/>
				</div>
				<div className="bg-slate-50 p-2 border-t border-gray-300">
					<div className="justify-end flex gap-2">
						<Button onClick={cancel} variant="secondary">
							Cancel
						</Button>
						<Button onClick={confirm}>Crop</Button>
					</div>
				</div>
			</Modal>
		)
	}
)
