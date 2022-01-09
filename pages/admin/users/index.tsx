import { InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import AdminLayout from '../../../components/Layouts/admin'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '../../../lib/session'
import { User } from '../../api/user'

export default function Users({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {

	return (
		<AdminLayout title="Users" user={user}>
			<main className="w-full h-full flex flex-col items-stretch">
				
				<div className="flex-1 mt-4 bg-white shadow rounded-md">
					<div className="h-full drawer drawer-mobile drawer-end w-full">
						<input id="drawer-dashboard" type="checkbox" className="drawer-toggle" />

						<div className="flex flex-col items-stretch drawer-content px-4 pb-3">
							{/* <label  className="mb-4 ">open menu</label> */}

							<div className="w-full flex flex-col py-3 sticky top-0 bg-white z-10">
								<div className="label px-0 pb-1">
									<span className="label-text font-semibold">User Info</span>
									<label htmlFor="drawer-dashboard" className="lg:hidden hover:bg-gray-200 rounded p-1 text-gray-600 font-mono cursor-pointer grid object-center">
										<Image src={'/svg/search.svg'} height={28} width={28} />
									</label>
								</div>

								<div className="self-start grid grid-flow-col gap-1">
									<span className="font-light text-12 text-app_light_gray tracking-tight">
										{'Device Name'}
									</span>
									<Image src={'/svg/edit.svg'} height={12} width={12} className="mb-px" />
								</div>
							</div>

							<div className="my-3">
								<div className="avatar relative">
									<div className="rounded-full w-28 h-28 ring-2 ring-app_light ring-offset-4">
										<img src="https://i.pravatar.cc/500?img=32"/>
									</div>
									<img src="/svg/edit-avatar.svg"
										className="h-8 w-8 absolute right-1 bottom-1 object-contain"
									/>
								</div>
							</div>


							<form>
							<div className="grid grid-cols-2 grid-flow-row gap-4">
								<div className="form-control">
									<label className="label">
										<span className="label-text font-sans font-light text-base text-app_light_gray">
											First Name
										</span>
									</label>
									<input className="input input-primary input-bordered input-sm"
										type="text"
									/>
								</div>

								<div className="form-control">
									<label className="label">
										<span className="label-text font-sans font-light text-base text-app_light_gray">
											Last Name
										</span>
									</label>
									<input className="input input-primary input-bordered input-sm"
										type="text"
									/>
								</div>

								<div className="form-control">
									<label className="label">
										<span className="label-text font-sans font-light text-base text-app_light_gray">
											Email
										</span>
									</label>
									<input className="input input-bordered border-gray-300 input-sm input-disabled"
										type="email"
									/>
								</div>

								<div className="form-control">
									<label className="label">
										<span className="label-text font-sans font-light text-base text-app_light_gray">
											Phone No.
										</span>
									</label>
									<input className="input input-primary input-bordered input-sm"
										type="tel"
									/>
								</div>
								
								<div className="form-control">
									<label className="label">
										<span className="label-text font-sans font-light text-base text-app_light_gray">
											Company
										</span>
									</label>
									<input className="input input-primary input-bordered input-sm"
										type="text"
									/>
								</div>
								
								<div className="form-control">
									<label className="label">
										<span className="label-text font-sans font-light text-base text-app_light_gray">
											Landline No.
										</span>
									</label>
									<input className="input input-primary input-bordered input-sm"
										type="tel"
									/>
								</div>

								<div className="form-control">
									<label className="label">
										<span className="label-text font-sans font-light text-base text-app_light_gray">
											Your Role
										</span>
									</label>
									<select className="select select-bordered select-primary select-sm">
										<option>Engineer</option>
										<option>Designer</option>
										<option>Project Manager</option>
										<option>Admin</option>
									</select>
								</div>

							</div>

							<div className="my-6 grid place-items-center">
								<button className="btn btn-primary btn-md px-8">Update</button>
							</div>
							
							</form>

						</div>

						<div className="drawer-side">
							<label htmlFor="drawer-dashboard" className="drawer-overlay"></label>

							<div className="w-64 p-3 border-l border-gray-200 bg-white">
								<div className="form-control mb-2 sticky top-0 bg-white z-10">
									<label className="label">
										<span className="label-text font-semibold">Users</span>
									</label>
									<input className="input input-sm input-bordered rounded-md"
										type="text" placeholder="Search Users"
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
												tableData.map(({ userName }, ind) => (
													<tr key={`${ind}-${userName}`} className="hover:cursor-pointer">
														{/* <th>1</th> */}
														<td className="w-full">{userName}</td>
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

const tableData = [
	{ userName: 'User 1' },
	{ userName: 'User 3' },
	{ userName: 'User 1' },
	{ userName: 'User 2' },
	{ userName: 'User 2' },

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
