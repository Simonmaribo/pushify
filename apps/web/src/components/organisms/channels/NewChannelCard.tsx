import CreateChannelModal from '@/components/modals/CreateChannelModal'
import NiceModal from '@ebay/nice-modal-react'
import { Plus } from 'lucide-react'

export default function NewChannelCard() {
	return (
		<button
			onClick={() => NiceModal.show(CreateChannelModal)}
			className="group p-4 rounded-xl hover:border-gray-300 border border-gray-200 border-dashed cursor-pointer bg-gray-50 transition-all"
		>
			<div className="flex items-center justify-between">
				<div className="flex gap-2 items-center">
					<div className="size-8 rounded-full flex items-center justify-center bg-gray-100">
						<Plus size={18} className="text-gray-800" />
					</div>
					<div>
						<h3 className="text-base font-medium text-gray-600">
							Create new channel
						</h3>
					</div>
				</div>
			</div>
		</button>
	)
}
