import React from 'react'
import Image from 'next/image'

type Props = {
	isCol? : boolean
	light? : boolean
}

const Logo: React.FC<Props> = ({ isCol=false, light= false }) => {
	return(
		<div className={`grid ${!isCol ? 'grid-flow-col gap-3' : 'grid-flow-row gap-2'} justify-start items-center`}>
			<Image src={'/svg/logo.svg'} width={48} height={48}/>

			<h3 className={
				(light
				?`text-app_light_gray`
				:`text-app_gray opacity-30 `)
				+ " text-center text-19 font-bold tracking-loose"
			}>
				Logo
			</h3>
		</div>
	)
}

export default Logo;