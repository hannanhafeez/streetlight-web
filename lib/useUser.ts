import {
	useEffect
} from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import {
	User
} from '../pages/api/user'
export default function useUser({
	redirectTo = {
		admin: '/admin',
		user:'/user'
	},
	redirectIfFound = false,
} = {}) {
	const {
		data: user,
		mutate: mutateUser
	} = useSWR<User>('/api/user')
	useEffect(() => {
		// if no redirect needed, just return (example: already on /dashboard)
		// if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
		if (!redirectTo || !user) return
		if (
			// If redirectTo is set, redirect if the user was not found.
			(redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
			// If redirectIfFound is also set, redirect if the user was found
			(redirectIfFound && user?.isLoggedIn)
		) {

			if(user.user_type === "admin") Router.push("/admin/dashboard");
			else if (user.user_type === "user") Router.push("/user/dashboard");
			else Router.push('/login')
		}
	}, [user, redirectIfFound, redirectTo])
	return {
		user,
		mutateUser
	}
}