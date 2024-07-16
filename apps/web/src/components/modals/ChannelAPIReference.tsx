import Button from '@/components/ui/Button'
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/Drawer'
import {
	REACT,
	NODE_AXIOS,
} from '@/components/organisms/CodeBlock/code-examples/channel-api'
import CopyableInput from '../molecules/CopyableInput'
import CodeBlock from '../organisms/CodeBlock'
import { Code2 } from 'lucide-react'

type ChannelAPIReferenceProps = {
	channelId: string
}

export default function ChannelAPIReference(props: ChannelAPIReferenceProps) {
	return (
		<Drawer>
			<DrawerTrigger
				className="bg-slate-50 border-gray-600/10 hover:bg-slate-100"
				asChild
			>
				<Button className="text-gray-800 text-xs" variant="outline">
					<div className="flex items-center gap-2">
						<Code2 size={18} />
						<span>API</span>
					</div>
				</Button>
			</DrawerTrigger>
			<DrawerContent className="sm:max-w-lg overflow-y-scroll">
				<DrawerHeader>
					<DrawerTitle>API Reference</DrawerTitle>
					<div className="flex flex-col gap-4">
						<CopyableInput
							name="Channel ID"
							value={props.channelId}
						/>
					</div>
				</DrawerHeader>

				<div className="mt-8 flex flex-col gap-4">
					<div>
						<h2 className="text-lg font-semibold text-gray-800">
							Send a message
						</h2>
						<p className="text-sm text-gray-600">
							Easily send messages to this channel using the
							Pushify API.
						</p>
						<CodeBlock
							className="mt-4"
							wrapLongLines={false}
							examples={[
								{
									language: 'javascript',
									title: 'React',
									code: REACT.replace(
										'[CHANNEL_ID]',
										props.channelId
									),
								},
								{
									language: 'nodejs',
									title: 'Node.js (With Axios)',
									code: NODE_AXIOS.replace(
										'[CHANNEL_ID]',
										props.channelId
									),
								},
							]}
						/>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
