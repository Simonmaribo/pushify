const SIZE = {
	xs: {
		size: 20,
		border: 2,
	},
	sm: {
		size: 30,
		border: 3,
	},
	md: {
		size: 40,
		border: 3,
	},
	lg: {
		size: 50,
		border: 4,
	},
	xl: {
		size: 60,
		border: 4,
	},
}

export default function Loading({
	color = '#7047EB',
	size = 'md',
}: {
	color?: string
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}) {
	// convert hex to rgba
	const rgba = (hex: string, alpha: number) => {
		const r = parseInt(hex.slice(1, 3), 16)
		const g = parseInt(hex.slice(3, 5), 16)
		const b = parseInt(hex.slice(5, 7), 16)
		return `rgba(${r}, ${g}, ${b}, ${alpha})`
	}

	return (
		<>
			<style>{`
                #loading {
                    display: inline-block;
                    width: ${SIZE[size].size}px;
                    height: ${SIZE[size].size}px;
                    border: ${SIZE[size].border}px solid ${rgba(color, 0.3)};
                    border-radius: 50%;
                    border-top-color: ${color};
                    animation: spin 800ms linear infinite;
                    -webkit-animation: spin 800ms linear infinite;
                }
                
                @keyframes spin {
                    to { -webkit-transform: rotate(360deg); }
                }
                @-webkit-keyframes spin {
                    to { -webkit-transform: rotate(360deg); }
                }
            `}</style>
			<div id="loading" />
		</>
	)
}
