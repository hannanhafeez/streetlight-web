import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'
import { NextApiRequest, NextApiResponse } from 'next'

export type User = {
  isLoggedIn: boolean
  id: string,
  phone_number?: string|null,
  first_name?: string,
  last_name?: string,
  user_email: string,
  user_password?: string,
  role?: string|number,
  companey?: string,
  land_line?: string,
  user_type: "admin" | "user" | ''
}

export default withIronSessionApiRoute(userRoute, sessionOptions)

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    })
  } else {
    res.json({
      isLoggedIn: false,
      id: '',
      user_email: '',
      user_type: ''
    })
  }
}
