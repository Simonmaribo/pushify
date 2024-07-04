import ReactPaginate from 'react-paginate'
import Button from '../Button'
import { cn } from '@/helpers/utils'

type PaginationProps = {
	pageCount: number
	forcePage: number | undefined
	onPageChange: (selected: number) => void
	className?: string
	hiddenOnEmpty?: boolean
	pageRangeDisplayed?: number
}

export default function Pagination(props: PaginationProps) {
	if (props.pageCount === 0 && props.hiddenOnEmpty) return null
	return (
		<ReactPaginate
			className={cn(
				'flex justify-center items-center gap-1',
				props.className
			)}
			breakClassName="select-none size-4 flex items-center"
			activeLinkClassName="size-8 flex items-center justify-center rounded text-main-500 bg-gray-50"
			pageLinkClassName="size-8 flex items-center cursor-pointer justify-center rounded select-none hover:bg-gray-50 transition-all"
			breakLabel="..."
			nextLabel={
				props.forcePage == props.pageCount ||
				props.pageCount == 0 ? null : (
					<Button className="select-none" size="sm" variant="outline">
						<span>Next </span>
						{`>`}
					</Button>
				)
			}
			previousLabel={
				props.forcePage == 1 ? null : (
					<Button className="select-none" size="sm" variant="outline">
						{`<`}
						<span> Previous</span>
					</Button>
				)
			}
			forcePage={(props.forcePage || 1) - 1}
			onPageChange={({ selected }) => props.onPageChange(selected + 1)}
			pageRangeDisplayed={props.pageRangeDisplayed || 2}
			pageCount={props.pageCount}
		/>
	)
}
