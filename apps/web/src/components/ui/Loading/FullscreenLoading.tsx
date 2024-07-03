import Loading from '.'

export default function FullscreenLoading() {
	return (
		<div className="h-screen w-screen flex items-center justify-center bg-white">
			<Loading />
		</div>
	)
}
