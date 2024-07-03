import { Dot } from 'lucide-react'

export default function TeamMemberTitleStatuts({ title }: { title: string }) {
	return title === 'Owner' ? (
		<div className="bg-[#f5f0ff] rounded-md text-[#5E17EB] font-medium border-[1px] shadow-sm border-[#5E17EB] text-[12px] py-0 text-center lowercase px-4 inline-block">
			<div className="flex items-center">
				<Dot size={30} color={'#5E17EB'} className="ml-[-10px]" />
				<p>{title}</p>
			</div>
		</div>
	) : (
		<div className="bg-white rounded-md text-gray-800 font-medium border-[1px] shadow-sm border-gray-600/10 text-[12px] py-0 text-center lowercase px-4 inline-block">
			<div className="flex items-center">
				<Dot size={30} color={'#5E17EB'} className="ml-[-10px]" />
				<p className="text-gray-600">{title}</p>
			</div>
		</div>
	)
}
