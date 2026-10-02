import { getServerSession } from 'next-auth'
import { authOption } from '@/utils/authOptions'

import SignupPage from '@/template/SignupPage'
import { redirect } from 'next/navigation'


 async function Signup() {
  const session = await getServerSession(authOption)
   if(session) redirect("/")
  return (
    <SignupPage />
  )
}

export default Signup