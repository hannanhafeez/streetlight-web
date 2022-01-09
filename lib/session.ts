// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions

import { IronSessionOptions } from 'iron-session';
import type {
	User
} from '../pages/api/user'

// console.log(process.env.SECRET_COOKIE_PASSWORD);

export const sessionOptions: IronSessionOptions = {
	password: process.env.SECRET_COOKIE_PASSWORD as string,
	cookieName: 'streetlight-webapp',
	cookieOptions: {
		// secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 60 // 1 hour
	},
}
// This is where we specify the typings of req.session.*
declare module 'iron-session' {
	interface IronSessionData {
		user?: User
	}
}