import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation, useIsPresent } from 'framer-motion'

interface Props {
	children: JSX.Element
	delayTime: number
}

export const RevealLight = ({ children, delayTime }: Props) => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: false })
	const mainControls = useAnimation()

	useEffect(() => {
		if (isInView) {
			mainControls.start('visible')
		}
	}, [isInView])
	return (
		<div ref={ref}>
			<motion.div
				variants={{
					hidden: { opacity: 0, y: 0 },
					visible: { opacity: 1, y: 0 },
				}}
				initial="hidden"
				animate={mainControls}
				transition={{
					duration: 0.2,
					delay: delayTime,
					ease: [0.1, 0.1, 0.1, 1],
				}}
			>
				{children}
			</motion.div>
		</div>
	)
}