import { FormEvent, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useUser from '../../lib/useUser'
import fetchJson, { FetchError } from '../../lib/fetchJson'

import { useErrorMessage } from "../../hooks/useErrorMessage";
import Logo from '../../components/Logo'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'
import { User } from '../api/user'

export default function Login() {
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);

	const { mutateUser } = useUser({
		redirectIfFound: true,
	})

	const {error:msg, showMessageForTime} = useErrorMessage()


	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if(loading) return
		setLoading(true)
		const email = e.currentTarget.email.value
		const password = e.currentTarget.password.value
		
		const body = {
			user_email: email,
			user_password: password
		}
		console.log(body);

		try {
			const res = await fetchJson('/api/login', {
					method: 'POST',	
					body: JSON.stringify(body),
				})
				console.log(res);
			mutateUser(res as User);
		} catch (error) {
			if (error instanceof FetchError) {
				showMessageForTime(error.data.message, 15)
			} else {
				console.error('An unexpected error happened:', error)
			}
		} finally{
			setLoading(false)
		}
	}
	return (
		<div className="relative flex p-4 flex-col items-center justify-center min-h-screen bg-app_gray">
			<div className="flex flex-col items-stretch justify-center w-full sm:w-80 mx-auto shadow-md overflow-hidden py-10 px-8 rounded-md bg-white">
				<div className="self-center">
					<Logo isCol={true} />
				</div>

				<div className="my-6">
					<h3 className="text-app_gray text-center font-sans text-24 font-bold tracking-loose" >
						Log In to Dashboard
					</h3>

					<h4 className="text-app_light_gray text-center font-sans font-light text-14 tracking-loose">
						Enter your email and password below
					</h4>
				</div>

				<form onSubmit={onSubmit}>
					<div className="my-2.5">
						<label className="uppercase text-app_light_gray font-sans font-semibold text-12 tracking-loose block mb-1"
							htmlFor="email" 
						>
								Email
						</label>

						<input className={
								"w-full rounded-md py-2 px-3 border border-gray-200 bg-bluish" + " " +
								"focus:border-app_blue focus:outline-none" + " " +
								"font-sans text-14 placeholder-opacity-30 placeholder-app_gray" + " "
							}
							id="email" placeholder="Email address" type="email"
							required
						/>
					</div>

					<div className="block h-1"/>
					
					<div className="my-2.5">
						<div className="flex justify-between items-baseline mb-1">
							<label className="uppercase text-app_light_gray font-semibold font-sans text-12 tracking-loose"
								htmlFor="password"
							>
								Password
							</label>
							<button className="text-app_light_gray font-light font-sans text-10 tracking-loose">
								Forgot password?
							</button>
						</div>
						<div className="relative w-full">
							<div className="absolute inset-y-0 right-0 flex items-center px-2">
								<div className="hover:bg-gray-200 rounded p-1 text-gray-600 font-mono cursor-pointer grid object-center" onClick={() => { setShow(s => !s) }}>
									{
										!show 
										? <Image src={'/svg/eye-invisible.svg'} height={28} width={28}/>
										: <Image src={'/svg/eye-visible.svg'} height={28} width={28}/>
									}
								</div>
							</div>
							<input className="border rounded-md w-full py-2 px-3 border-gray-200 bg-bluish focus:outline-none focus:border-app_blue pr-16 font-sans text-14 placeholder-opacity-30 placeholder-app_gray"
								id="password" type={show ?"text": "password"} 
								placeholder="Password"
								autoComplete="off"
								required
							/>
						</div>
					</div>

					<div className="block h-1" />

					<div className="my-2.5 block">
						<button className={
								"px-3 py-3 w-full rounded-md bg-app_blue text-white font-sans text-14 font-semibold" + " " +
								"tracking-loose shadow-md grid place-content-center"
							}
							type="submit"
						>
							{	loading 
								?
								<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								: 'Log In'
							}
						</button>
					</div>

					<div className="block h-2" />

					<p className="text-app_light_gray text-14 font-sans text-center tracking-loose">
						Don’t have an account? {' '}
						<Link href="/admin/dashboard"><span className="text-app_blue">Sign up</span></Link>
					</p>

				</form>


			</div>
			
			{
				msg.shown &&
				<div className="alert bg-white alert-error absolute top-4 right-3 shadow">
					<div className="flex-1">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
						<label>{msg.message}</label>
					</div>
				</div>
			}
		</div>
	)
}


export const getServerSideProps = withIronSessionSsr(function ({
	req,
	res,
}) {
	const user = req.session.user

	if (user === undefined) {
		return {
			props: {
				user: { isLoggedIn: false, id: '', user_email: '', user_type: '' } as User,
			},
		}
	}
	else {
		return {
			redirect: {
				destination: user?.user_type === 'admin' ? '/admin/dashboard' : 'user/dashboard',
				permanent: false,
			},
		}
	}
},
sessionOptions)
