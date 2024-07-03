import { Dot } from 'lucide-react'

export default function WebAnalyticsVisitorStatusCard({
	visitorCount,
}: {
	visitorCount: number
}) {
	return (
		<div className="bg-white rounded-md text-gray-800 font-medium border-[1px] shadow-sm border-gray-600/10 py-0 text-center lowercase px-4 inline-block">
			<div className="flex items-center">
				<Dot size={40} color={'#22b317'} className="ml-[-18px]" />
				<p className="ml-[-8px] text-gray-600 text-[13px]">
					{visitorCount} current visitors
				</p>
			</div>
		</div>
	)
}
