import { getServerSession } from 'next-auth'

import { authOption } from '@/utils/authOptions'
import DashboardPage from '@/template/DashboardPage'
import connectDB from '@/utils/connectDB'
import User from '@/models/User'

 async function Dashboard() {
  await connectDB()
  const session = await getServerSession(authOption)
  const user =await User.findOne({email : session?.user?.email})
  console.log(user)
  return (
    <DashboardPage createdAt={user.createdAt}/>
  )
}

export default Dashboard