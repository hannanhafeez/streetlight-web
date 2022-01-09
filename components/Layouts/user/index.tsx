import HamburgerSvg from '../../svg/hamburger'
import Header from '../../Header'
import Logo from '../../Logo'

import DashboardSvg from '../../svg/dashboard'

import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import MapsSvg from '../../svg/maps'
import SettingsSvg from '../../svg/settings'
import UsersSvg from '../../svg/users'
import { User } from '../../../pages/api/user'

const activeClasses = " text-app_light bg-gray-600 border-l-2 "
const linkHoverClasses = " hover:text-app_light hover:bg-gray-600 "

const isActiveLink = (router: NextRouter, str: string) => router.asPath === `/user/${str}` ? activeClasses : ''
const isActive = (router: NextRouter, str: string) => router.asPath === `/user/${str}`

type LayoutProps = {
	title: string,
	user?: User 
}

const UserLayout: React.FC<LayoutProps> = ({ children, title, user})=> {
	const router = useRouter()
	
	return (
		<div data-theme="mytheme" className="shadow bg-base-200 drawer drawer-mobile w-screen h-screen">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
			<div className="flex flex-col items-center drawer-content bg-app_light">
				{/* <label htmlFor="my-drawer-2" className ="mb-4 btn btn-primary drawer-button lg:hidden">open menu</label> */}

				<header className="flex items-center w-full px-2 py-4">
					<div className="flex-none flex lg:hidden">
						<label className="btn btn-square btn-ghost" htmlFor="my-drawer-2">
							<HamburgerSvg />
						</label>
					</div>

					<Header title={title ?? 'Overview'} name={user?.user_type === 'admin' ? "Admin" : (user?.first_name + '' + user?.last_name)}/>
				</header>

				<div className="w-full h-full px-4 pb-2 overflow-y-scroll">
					{children}
				</div>
			</div>
			<aside className="drawer-side">
				<label htmlFor="my-drawer-2" className="drawer-overlay"></label>
				<ul className="menu py-4 overflow-y-auto w-56 bg-app_gray text-base-content">
					<li className="px-4 py-2">
						<Logo isCol={false} light={true} />
					</li>
					<li className="my-2 font-sans text-base tracking-loose text-app_light_gray">
						<ul className="p-0">
							<li className={isActiveLink(router, "dashboard") + linkHoverClasses}>
								<Link href="/user/dashboard">
									<a className="group">
										{/* <Image src="/svg/dashboard.svg" width={20} height={20} /> */}
										<DashboardSvg isActive={isActive(router, "dashboard")}/>
										<span className="ml-4">
											Dashboard
										</span>
									</a>
								</Link>
							</li>
							<li className={isActiveLink(router, "maps") + linkHoverClasses}>
								<Link href="/user/maps">
									<a className="group">
										<MapsSvg isActive={isActive(router, "maps")} />
										<span className="ml-4">
											Maps
										</span>
									</a>
								</Link>
							</li>

							<i className="block h-0.25 bg-white bg-opacity-10 my-2" />

							<li className={isActiveLink(router, "settings") + linkHoverClasses}>
								<Link href="/user/settings">
									<a className="group">
										<SettingsSvg isActive={isActiveLink(router, "settings")} />
										<span className="ml-4">
											Settings
										</span>
									</a>
								</Link>
							</li>
						</ul>
					</li>
				</ul>
			</aside>
		</div>
	)
}

export default UserLayout;