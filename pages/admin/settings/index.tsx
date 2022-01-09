import { InferGetServerSidePropsType } from 'next'
import AdminLayout from '../../../components/Layouts/admin'
import { User } from '../../api/user'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '../../../lib/session'

export default function Settings({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {

	return (
		<AdminLayout title="Settings" user={user}>
			
		</AdminLayout>
	)
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

