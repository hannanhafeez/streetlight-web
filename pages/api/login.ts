import type { User } from './user'

import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import fetchJson from '../../lib/fetchJson'
import { LOGIN, ADMIN_LOGIN } from '../../services/ServiceUrl'

import  {FormData} from 'formdata-node'

export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const req_body = await req.body
  
    try {
    const resp:any = await fetchJson(ADMIN_LOGIN.url, {
      method: 'POST',
      body: req_body,
    })

    if(resp.success){
      const user = { isLoggedIn: true, ...resp.result } as User
      req.session.user = user
      await req.session.save()
      res.json(user)
    }else{
      res.status(302).json({message: resp.message})
    }

    
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
