import { InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import UserLayout from '../../../components/Layouts/user'
import { User } from '../../api/user'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '../../../lib/session'

export default function Maps({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {

	return (
		<UserLayout title="Locations" user={user}>
			<main className="w-full h-full flex flex-col items-stretch">

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



							
							<div className="grid grid-cols-2 grid-flow-row gap-4">
								
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
												tableData.map(({ userName, devName }, ind) => (
													<tr key={`${ind}-${userName}`} className="hover:cursor-pointer">
														{/* <th>1</th> */}
														<td className="w-full">{devName}</td>
														{/* <td >{userName}</td> */}
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
		</UserLayout>
	)
}

const tableData = [
	{ devName: 'Device 1', userName: 'User 1' },
	{ devName: 'Device 2', userName: 'User 3' },
	{ devName: 'Device 3', userName: 'User 1' },
	{ devName: 'Device 4', userName: 'User 2' },
	{ devName: 'Device 5', userName: 'User 2' },

]

export const getServerSideProps = withIronSessionSsr(async function ({
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
