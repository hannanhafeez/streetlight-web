import AdminLayout from '../../../components/Layouts/admin'
import Card from '../../../components/dashboard/card'
import Image from 'next/image'

import {InferGetServerSidePropsType} from 'next'

import Highcharts, {Options} from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import colors from '../../../constants/colors';
import { withIronSessionSsr } from 'iron-session/next'
import { User } from '../../api/user'
import { sessionOptions } from '../../../lib/session'

if (typeof Highcharts === 'object') {
	HighchartsExporting(Highcharts)
}

export default function Dashboard({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {	

	return (
		<AdminLayout title="Overview" user={user}>
			<main className="w-full h-full">
				<div className="py-[1px] xs:py-2 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 lg:items-start">
					<Card title="Total Lamps" value="7"/>
					
					<Card title="Active" value="2"/>
					
					<Card title="Offline" value="0"/>
					
					<Card title="Issues" value="0"/>
				</div>

				<div className="flex-1 mt-2 bg-white shadow rounded-md">
					<div className="h-full drawer drawer-mobile drawer-end w-full">
						<input id="drawer-dashboard" type="checkbox" className="drawer-toggle" />
						
						<div className="flex flex-col items-stretch drawer-content px-4 pb-3">
							{/* <label  className="mb-4 ">open menu</label> */}
							
							<div className="self-stretch flex flex-col py-1 xs:py-3 px-6 -mx-4 sticky top-0 bg-white z-10 rounded-t-md">
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

							<div className="my-4">
								<HighchartsReact
									highcharts={Highcharts}
									options={chartData}
								/>
							</div>

							<div className="my-4 grid grid-cols-1 xs:grid-cols-2 gap-6">
								<div className="transition duration-500 group card shadow rounded-md bg-white text-center outline-white hover:outline-blue hover:shadow-2xl">
									<div className="card-body p-4 lg:p-6">
										<h4 className="transition duration-500 card-title font-medium text-14 md:text-19 tracking-loose group-hover:text-app_primary">
											Battery Percentage
										</h4>

										<CircularProgressbar value={80} text={`${80}%`} 
											strokeWidth={5} styles={buildStyles({
												pathColor: colors.app_primary, textColor: 'black'
											})}
											className="max-h-52 my-2"
										/>
									</div>
								</div>
								<div className="transition duration-500 group card shadow rounded-md bg-white text-center outline-white hover:outline-blue hover:shadow-2xl">
									<div className="card-body p-4 lg:p-6">
										<h4 className="transition duration-500 card-title font-medium text-14 md:text-19 tracking-loose group-hover:text-app_primary">
											Signal Strength
										</h4>

										<CircularProgressbar value={60} text={`${60}%`}
											strokeWidth={5} styles={buildStyles({
												pathColor: '#A7F7FB', textColor: 'black'
											})}
											className="max-h-52 my-2"
										/>
									</div>
								</div>
							</div>

							<div className="divider opacity-40"></div> 

							<div className="h-full grid sm:grid-cols-2 xs:grid-cols-1 grid-flow-row gap-4">
								
								{/* <div className="form-control">
									<label className="label">
										<span className="label-text font-sans font-light text-base text-app_light_gray">
											Water level alert minimum value (in feet):
										</span>
									</label>
									<select className="select select-bordered select-primary select-sm">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</select>
								</div>
								
								<div className="form-control">
									<label className="label">
										<span className="label-text font-sans font-light text-base text-app_light_gray">
											Water level alert maximum value (in feet):
										</span>
									</label>
									<select className="select select-bordered select-primary select-sm">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</select>
								</div> */}
								
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
												tableData.map(({devName, userName},ind)=>(
													<tr key={`${ind}-${devName}-${userName}`} className="hover:cursor-pointer">
													{/* <th>1</th> */}
													<td className="w-full">{devName}</td> 
													<td >{userName}</td> 
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

const tableData = [
	{devName: 'Device 1', userName: 'User 1'},
	{devName: 'Device 2', userName: 'User 3'},
	{devName: 'Device 3', userName: 'User 1'},
	{devName: 'Device 4', userName: 'User 2'},
	{devName: 'Device 5', userName: 'User 2'},
	
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
