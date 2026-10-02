
import { getServerSession } from 'next-auth'
import { authOption } from '@/utils/authOptions'
import SigninPage from '@/template/SigninPage'
import { redirect } from 'next/navigation'


async function Signin() {
  const session = await getServerSession(authOption)
 if(session) redirect("/")
  return (
    <SigninPage />
  )
}

export default Signin