// import AlertSvg from '../svg/alert'

import { useRouter } from "next/router"
import React from "react"
import fetchJson from "../../lib/fetchJson"
import useUser from "../../lib/useUser"

type HeaderProps = {
	title: string;
	name?: string
}

const Header: React.FC<HeaderProps> = ({title, name})=> {
	const { mutateUser } = useUser()
	const router = useRouter()
	
	return (
		<div className="navbar text-neutral flex-1 w-full">
			<div className="flex-1">
				<span className="font-sans text-24 font-bold text-app_gray tracking-loose">
					{title}
				</span>
			</div>

			{/* <div className="flex-none">
				<button className="btn btn-square btn-ghost">
					<AlertSvg />
				</button>
			</div> */}
			<div className="flex-none h-6 w-0.5 mr-4 bg-gray-200"></div>
			<div className="grid grid-flow-col gap-4 items-center">
				<p className="text-14 font-semibold tracking-loose">
					{name ?? 'User'}
				</p>
				<div className="avatar dropdown dropdown-hover dropdown-end">
					<div tabIndex={0} className="rounded-full w-10 h-10 m-1">
						<img src="https://i.pravatar.cc/500?img=32" />
					</div>

					<ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
						<li className="hover:bg-red-500 hover:text-app_light rounded-lg">
							<a 
								href="/api/logout"
								onClick={async (e) => {
									e.preventDefault()
									mutateUser(
										await fetchJson('/api/logout', { method: 'POST' }),
										false
									)
									router.push('/login')
								}}
							>Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Header;
