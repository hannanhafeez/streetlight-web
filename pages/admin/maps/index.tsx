import { useEffect, useRef, useState } from 'react'

import { InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import AdminLayout from '../../../components/Layouts/admin'
import { User } from '../../api/user'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '../../../lib/session'

import { Loader, } from '@googlemaps/js-api-loader';

const ISB_LAT_LONG = { lat: 33.7005, lng: 73.0505 }


export default function Maps({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const googlemap = useRef<HTMLDivElement>(null);
	const mapRef = useRef<google.maps.Map>();

	const markersRef = useRef<[google.maps.Marker]|undefined>();

	const [selectedIndex, setIndex] = useState<undefined|number>();

	useEffect(() => {
		if (!process.env.NEXT_PUBLIC_MAPS_API_KEY) return

		const loader = new Loader({
			apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
			version: 'weekly',
		});

		loader.load().then(() => {
			mapRef.current = new google.maps.Map(googlemap.current!, {
				center: ISB_LAT_LONG,
				zoom: 12,
				mapId: '2c331c1a23562b1e',
			});
		}).then(()=>{

			deviceData.forEach(data=>{
				const marker = new google.maps.Marker({
					position: data.position,
					map: mapRef.current,
					icon: icons[data.status.isOn ? 'on' : 'off'].icon,
					title: data.status.powerReading,
					
					// label: data.status.powerReading,
				})
				markersRef.current?.push(marker);
			})

		});

		return ()=>{
		}
	}, []);


	const onSelected = (ind:number) => {
		mapRef.current?.setZoom(17.5);
		mapRef.current?.panTo(deviceData[ind].position);
		setIndex(ind);
	}

	return (
		<AdminLayout title="Locations" user={user}>
			<main className="w-full h-full">

				<div className="flex-1 mt-4 bg-white shadow rounded-md">
					<div className="h-full drawer drawer-mobile drawer-end w-full">
						<input id="drawer-dashboard" type="checkbox" className="drawer-toggle" />

						<div className="flex flex-col items-stretch drawer-content px-4 pb-3">
							{/* <label  className="mb-4 ">open menu</label> */}

							<div className="w-full flex flex-col py-3 sticky top-0 bg-white z-10">
								<div className="label px-0 pb-1">
									<span className="label-text font-semibold">Device Location</span>
									<label htmlFor="drawer-dashboard" className="lg:hidden hover:bg-gray-200 rounded p-1 text-gray-600 font-mono cursor-pointer grid object-center">
										<Image src={'/svg/search.svg'} height={28} width={28} />
									</label>
								</div>

								<div className="self-start grid grid-flow-col gap-1">
									<span className="font-light text-12 text-app_light_gray tracking-tight">
										{'Device Name'}
									</span>
								</div>
							</div>

							{/* Map */}
							<div className="grid grid-flow-row gap-4 h-full aspect-square xs:aspect-video rounded-lg overflow-hidden">
								<div id="map" ref={googlemap} className="w-full h-full bg-gray-300" />
							</div>
							
							{/* Info */}

						</div>

						<div className="drawer-side">
							<label htmlFor="drawer-dashboard" className="drawer-overlay"></label>

							<div className="w-64 p-3 border-l border-gray-200 bg-white">
								<div className="form-control mb-2 sticky top-0 bg-white z-10">
									<label className="label">
										<span className="label-text font-semibold">Devices/Sensors</span>
									</label>
									<input className="input input-sm input-bordered rounded-md"
										type="text" placeholder="Search Devices"
									/>
								</div>

								<div className="overflow-x-auto text-base">
									<table className="table table-compact w-full">
										<thead>
											{/* <tr>
												<th></th> 
												<th>Device Name</th> 
											</tr> */}
										</thead>
										<tbody>
											{
												deviceData.map(({ userName, devName, status:{isOn} }, ind) => (
													<tr key={`${ind}-${userName}`} className={`hover:cursor-pointer ${ind == selectedIndex ? 'bg-gray-100': 'bg-transparent'}`} 
														onClick={()=>onSelected(ind)}
													>
														
														{/* <th>1</th> */}
														
														<td className="w-full bg-transparent">{devName}</td>
														
														<td className="bg-transparent">{userName}</td>
														
														<td className="w-full bg-transparent">
															<div className={`badge mx-2 text-12 ${isOn ? 'bg-green-600' : 'bg-red-600'} border-none float-right`}>
																{isOn ? 'ON' : 'OFF'}
															</div>
														</td>
													</tr>
												))
											}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full h-2" />

			</main>
		</AdminLayout>
	)
}

const iconPath = '/svg/'

const icons: Record<string, { icon: string }> = {
	on: {
		icon: iconPath + "bulb-on.svg",
	},
	off: {
		icon: iconPath + "bulb-off.svg",
	},
};

const deviceData = [
	{
		devName: 'Device 1', userName: 'User 1',
		location:{
			sector: 'G-10/4', street: '43', gali: null,
		},
		status:{
			isOn: false, powerReading: '0 Watts'
		},
		position: { lat: 33.677973, lng: 73.022232}
	},
	{
		devName: 'Device 2', userName: 'User 1',
		location:{
			sector: 'G-10/4', street: '43', gali: null,
		},
		status:{
			isOn: true, powerReading: '10 Watts'
		},
		position: { lat: 33.678503, lng: 73.023243}
	},
	{
		devName: 'Device 3', userName: 'User 1',
		location:{
			sector: 'G-10/4', street: null, gali: '36',
		},
		status:{
			isOn: true, powerReading: '12 Watts'
		},
		position: { lat: 33.675600, lng: 73.024372}
	},
	{
		devName: 'Device 4', userName: 'User 1',
		location:{
			sector: 'G-10/4', street: null, gali: '36',
		},
		status:{
			isOn: true, powerReading: '10 Watts'
		},
		position: { lat: 33.675251, lng: 73.023682}
	},
	{
		devName: 'Device 5', userName: 'User 1',
		location:{
			sector: 'G-10/4', street: null, gali: '36',
		},
		status:{
			isOn: true, powerReading: '11 Watts'
		},
		position: { lat: 33.674749, lng: 73.022727}
	},

]

export const getServerSideProps = withIronSessionSsr(function ({
	req,
	res,
}) {
	const user = req.session.user
	

	if (user === undefined) {
		res.setHeader('location', '/login')
		res.statusCode = 302
		res.end()
		return {
			props: {
				user: { isLoggedIn: false, id: '', user_email: '', user_type: '' } as User,
			},
		}
	}

	return {
		props: { user: req.session.user },
	}
},
sessionOptions)
