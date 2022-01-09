import { useEffect, useMemo, useRef, useState } from 'react'

import AdminLayout from '../../../components/Layouts/admin'
import Card from '../../../components/dashboard/card'
import Image from 'next/image'

import {InferGetServerSidePropsType} from 'next'

import Highcharts, {Options} from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

import colors from '../../../constants/colors';
import { withIronSessionSsr } from 'iron-session/next'
import { User } from '../../api/user'
import { sessionOptions } from '../../../lib/session'
import { Loader } from '@googlemaps/js-api-loader'

if (typeof Highcharts === 'object') {
	HighchartsExporting(Highcharts)
}

const ISB_LAT_LONG = { lat: 33.7005, lng: 73.0505 }

enum Filters {
	all = 'all',
	active = 'active',
	offline = 'offline'
}

export default function Dashboard({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {	
	const googlemap = useRef<HTMLDivElement>(null);
	const mapRef = useRef<google.maps.Map>();

	const markersRef = useRef<[google.maps.Marker] | undefined>();

	const [selectedIndex, setIndex] = useState<undefined | string>();
	const [filter, setFilter] = useState<Filters>(Filters.all)
	const [filteredData, setFilteredData] = useState(deviceData)

	const activeLights = useMemo(() => deviceData.filter((data) => data.status.isOn), deviceData)
	const offlineLights = useMemo(() => deviceData.filter((data) => !data.status.isOn), deviceData)

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
		}).then(() => {

			filteredData.forEach(data => {
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
		/* googlemap.current?.addEventListener('transitionend', ({})=>{
			console.log({}, 'log');
		}) */
		return () => {
		}
	}, []);

	const onLocationSelected = (position: typeof ISB_LAT_LONG,ind: number) => {
		mapRef.current?.setZoom(17.5);
		mapRef.current?.panTo(filteredData[ind].position);
		setIndex(`${position.lat}-${position.lng}`);
		setTimeout(() => {}, 1000);
	}

	const onFilterSelected = (filterType: Filters) => {
		setFilter(filterType);
		const {all, active, offline} = Filters;
		switch (filterType){
			case all:
				setFilteredData(deviceData);
				break;
			
			case active:
				setFilteredData(activeLights);
				break;
			
			case offline:
				setFilteredData(offlineLights);
				break;

			default:
				break;
		}
	}

	return (
		<AdminLayout title="Overview" user={user}>
			<main className="w-full h-full">
				<div className="py-[1px] xs:py-2 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 lg:items-start">
					<Card title="Total Lamps" value={deviceData.length} active={filter === Filters.all} 
						onPress={()=> onFilterSelected(Filters.all)}
					/>
					
					<Card title="Active" value={activeLights.length} active={filter === Filters.active} 
						onPress={() => onFilterSelected(Filters.active)}
					/>
					
					<Card title="Offline" value={offlineLights.length} active={filter === Filters.offline} 
						onPress={() => onFilterSelected(Filters.offline)}
					/>
					
					<Card title="Issues" value="0" 

					/>
				</div>

				<div className="flex-1 mt-2 bg-white shadow rounded-md">
					<div className="h-full drawer drawer-mobile drawer-end w-full">
						<input id="drawer-dashboard" type="checkbox" className="drawer-toggle" />
						
						<div className="flex flex-col items-stretch drawer-content px-4 pb-3">
							{/* <label  className="mb-4 ">open menu</label> */}
							
							<div className="self-stretch flex flex-col py-1 xs:py-3 px-4 -mx-4 sticky top-0 bg-white z-10 rounded-t-md">
								<div className="label px-0 pb-1">
									<span className="label-text font-semibold text-18">Devices</span>
									<label htmlFor="drawer-dashboard" className="lg:hidden hover:bg-gray-200 rounded p-1 text-gray-600 font-mono cursor-pointer grid object-center">
										<Image src={'/svg/search.svg'} height={28} width={28} />
									</label>
								</div>
								
								<div className="self-start grid grid-flow-col gap-1">
									<span className="font-light text-12 text-app_light_gray tracking-tight">
										{'Device Name'}
									</span>
									<Image src={'/svg/edit.svg'} height={12} width={12} className="mb-px"/>
								</div>
							</div>

							{/* Map */}
							<div className="rounded-lg border overflow-hidden">
								<div id="map" ref={googlemap} className="aspect-square xs:aspect-video w-full h-full bg-gray-300" />
							</div>

							{/* <div className="my-4">
								<HighchartsReact
									highcharts={Highcharts}
									options={chartData}
								/>
							</div> */}


							<div className="divider opacity-40"></div> 

							<div className="grid sm:grid-cols-2 xs:grid-cols-1 grid-flow-row gap-4">
								
								<div className="form-control sm:col-span-2 xs:col-span-1">
									<label className="label">
										<span className="label-text font-sans font-light text-base text-app_light_gray">
											Sensor Reading Freqeuncy (ms):
										</span>
									</label>
									<select className="select select-bordered select-primary select-sm">
										<option value="1000">1000</option>
										<option value="2000">2000</option>
										<option value="3000">3000</option>
										<option value="4000">4000</option>
										<option value="5000">5000</option>
									</select>
								</div>

								<div className="form-control flex-row items-center">
									<input type="checkbox" defaultChecked={true} className="toggle toggle-primary toggle-sm mr-2"/>
									<label className="cursor-pointer label">
										<span className="label-text font-sans font-light text-base text-app_light_gray">Email Notifications</span>
									</label>
								</div>
								
								<div className="form-control flex-row items-center">
									<input type="checkbox" defaultChecked={true} className="toggle toggle-primary toggle-sm mr-2"/>
									<label className="cursor-pointer label">
										<span className="label-text font-sans font-light text-base text-app_light_gray">SMS Notifications</span>
									</label>
								</div>
								
							</div>


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
												filteredData.map(({ userName, devName, status: { isOn }, position }, ind) => (
													<tr key={`${ind}-${userName}`} className={`hover:cursor-pointer ${(selectedIndex === `${position.lat}-${position.lng}`) ? 'bg-gray-100' : 'bg-transparent'}`}
														onClick={() => onLocationSelected(position, ind)}
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

				<div className="w-full h-2"/>

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
		location: {
			sector: 'G-10/4', street: '43', gali: null,
		},
		status: {
			isOn: false, powerReading: '0 Watts'
		},
		position: { lat: 33.677973, lng: 73.022232 }
	},
	{
		devName: 'Device 2', userName: 'User 1',
		location: {
			sector: 'G-10/4', street: '43', gali: null,
		},
		status: {
			isOn: true, powerReading: '10 Watts'
		},
		position: { lat: 33.678503, lng: 73.023243 }
	},
	{
		devName: 'Device 3', userName: 'User 1',
		location: {
			sector: 'G-10/4', street: null, gali: '36',
		},
		status: {
			isOn: true, powerReading: '12 Watts'
		},
		position: { lat: 33.675600, lng: 73.024372 }
	},
	{
		devName: 'Device 4', userName: 'User 1',
		location: {
			sector: 'G-10/4', street: null, gali: '36',
		},
		status: {
			isOn: true, powerReading: '12 Watts'
		},
		position: { lat: 33.675426, lng: 73.024015 }
	},
	{
		devName: 'Device 5', userName: 'User 1',
		location: {
			sector: 'G-10/4', street: null, gali: '36',
		},
		status: {
			isOn: true, powerReading: '10 Watts'
		},
		position: { lat: 33.675251, lng: 73.023682 }
	},
	{
		devName: 'Device 6', userName: 'User 1',
		location: {
			sector: 'G-10/4', street: null, gali: '36',
		},
		status: {
			isOn: true, powerReading: '10 Watts'
		},
		position: { lat: 33.675162, lng: 73.023479 }
	},
	{
		devName: 'Device 7', userName: 'User 1',
		location: {
			sector: 'G-10/4', street: null, gali: '36',
		},
		status: {
			isOn: false, powerReading: '0 Watts'
		},
		position: { lat: 33.674921, lng: 73.023028}
	},
	{
		devName: 'Device 8', userName: 'User 1',
		location: {
			sector: 'G-10/4', street: null, gali: '36',
		},
		status: {
			isOn: true, powerReading: '11 Watts'
		},
		position: { lat: 33.674749, lng: 73.022727 }
	},

]

const dataBaroCorrected: number[] = [3, 4, 3, 5, 4, 10, 12]
const dataBaro: number[] = [1, 3, 4, 3, 3, 5, 4]

const chartData: Options = {
	chart: {
		type: 'areaspline'
	},
	title: {
		text: 'Power Overview',
		style: {
			fontSize: '16',
			color: '#9FA2B4',
			fontFamily: 'Mulish Medium', 
		}
	},
	legend: {
		layout: 'vertical',
		align: 'left',
		verticalAlign: 'top',
		x: 150,
		y: 100,
		floating: true,
		borderWidth: 1,
		backgroundColor:
			Highcharts?.defaultOptions?.legend?.backgroundColor || '#FFFFFF'
	},
	xAxis: {
		categories: [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday'
		],
		plotBands: [{ // visualize the weekend
			from: 4.5,
			to: 6.5,
			color: 'rgba(68, 170, 213, .2)'
		}]
	},
	yAxis: {
		title: {
			text: 'Power consumption (Watts)',
			style: {
				color: '#9FA2B4'
			}
		}
	},
	tooltip: {
		shared: true,
		valueSuffix: ' units'
	},
	credits: {
		enabled: false
	},
	plotOptions: {
		areaspline: {
			fillOpacity: 0.4
		}
	},
	series: [{
		type: 'areaspline',
		name: 'Active',
		data: dataBaroCorrected
	}, 
	/* {
		type: 'areaspline',
		name: 'Uncorrected',
		data: dataBaro
	} */
	]
}


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
