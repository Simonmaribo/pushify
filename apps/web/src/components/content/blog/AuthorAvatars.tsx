import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Post } from 'contentlayer/generated'

type AuthorAvatars = {
	authors: Post['authors']
}

const getNameInitials = (name: string) => {
	const individualNames = name.split(' ')
	return (
		individualNames[0][0] + individualNames[individualNames.length - 1][0]
	)
}

export const AuthorAvatars: React.FC<AuthorAvatars> = ({ authors }) => {
	return (
		<div className="flex -space-x-2">
			{authors.map((author) => (
				<Avatar key={author.name} className="border-2 border-white">
					<AvatarImage src={author.avatar} />
					<AvatarFallback>
						{getNameInitials(author.name)}
					</AvatarFallback>
				</Avatar>
			))}
		</div>
	)
}
