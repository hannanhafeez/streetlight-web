type Props = {
	title: string, value: string|number
}

const Card: React.FC<Props> = ({title, value}) => {
	return (
		<div className="transition-all duration-200 group card shadow rounded-md bg-white text-center hover:outline hover:outline-1 hover:outline-app_primary">
			<div className="card-body p-4 lg:p-6">
				<h4 className="transition duration-500 card-title mb-0 lg:mb-[14px] text-14 md:text-15 lg:text-19 tracking-loose text-app_light_gray group-hover:text-app_primary">
					{title}
				</h4>
				
				<p className="transition duration-500 font-bold text-2xl md:text-3xl lg:text-4xl group-hover:text-app_primary">
					{value}
				</p>
			</div>
		</div>
	)
}


export default Card