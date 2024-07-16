import Copyable from './Copyable'

type CopyableInputProps = {
	name: string
	value: string
	secret?: boolean
}

export default function CopyableInput(props: CopyableInputProps) {
	return (
		<div className="rounded-xl border-[1px] border-gray-600/10 flex items-center overflow-hidden">
			<div className="bg-slate-50 px-3 py-3 border-r-[1px] border-gray-600/10">
				<p className="text-xs select-none font-medium text-gray-800">
					{props.name}
				</p>
			</div>
			<div className="px-2 py-1 flex-1 flex items-center justify-between gap-2">
				<p className="text-xs mx-4 font-medium text-gray-600">
					{props.secret ? '•••••••••••••••' : props.value}
				</p>
				<Copyable text={props.value} withText />
			</div>
		</div>
	)
}
