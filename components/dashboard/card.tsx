type Props = {
	title: string, value: string|number
}

const Card: React.FC<Props> = ({title, value}) => {
	return (
		<div className="transition-all duration-500 group card shadow rounded-md bg-white text-center outline-white hover:outline-blue ">
			<div className="card-body p-4 lg:p-6">
				<h4 className="transition duration-500 card-title text-14 md:text-19 tracking-loose text-app_light_gray group-hover:text-app_blue">
					{title}
				</h4>
				
				<p className="transition duration-500 font-bold text-4xl group-hover:text-app_blue">
					{value}
				</p>
			</div>
		</div>
	)
}


export default Card