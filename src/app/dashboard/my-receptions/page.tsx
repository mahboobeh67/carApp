import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOption} from "@/utils/authOptions";
import connectDB from "@/utils/connectDB";
import Reception from "@/models/Reception";
import User from "@/models/User";
import MyReceptionsPage from "@/template/MyReceptionsPage";

export const dynamic = "force-dynamic";

async function MyReceptions() {
  await connectDB();

  const session = await getServerSession(authOption);
  if (!session) {
    redirect("/signin");
  }

  const user = await User.findOne({ email: session.user?.email });
  if (!user) {
    redirect("/signin");
  }

 
  const receptions = await Reception.find({ userId: user._id })
    .sort({ createdAt: -1 })
    .lean();

  const formattedReceptions = JSON.parse(JSON.stringify(receptions));

  return <MyReceptionsPage receptions={formattedReceptions} />;
}

export default MyReceptions;

