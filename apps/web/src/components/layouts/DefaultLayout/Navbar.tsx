import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { ChevronsUpDown } from 'lucide-react'

export default function Navbar() {
	return (
		<header className="border-b border-gray-600/10">
			<div className="mx-auto max-w-7xl">
				<div className="flex items-center justify-between p-2">
					<div className="flex items-center gap-2">
						<Avatar className="size-8">
							<AvatarImage />
							<AvatarFallback />
						</Avatar>
						<span className="text-gray-200 font-medium"> / </span>
						<div className="flex items-center gap-2">
							<Avatar className="size-6">
								<AvatarImage />
								<AvatarFallback />
							</Avatar>
							<p className="text-gray-800 font-medium">
								Gazella Team
							</p>
							<ChevronsUpDown size={18} />
						</div>
					</div>
					<div>
						<Avatar className="size-8">
							<AvatarImage />
							<AvatarFallback />
						</Avatar>
					</div>
				</div>
			</div>
		</header>
	)
}
