import React from "react";
import { getServerSession } from "next-auth";
import { authOption } from "@/utils/authOptions";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import ProfilePage from "@/template/ProfilePage";

async function Profile() {
  await connectDB();

  const session = await getServerSession(authOption);
  let userData = { email: "", phone: "", createdAt: null };

  if (session) {
    const user = await User.findOne({ email: session.user?.email });
    if (user) {
      userData = {
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt,
      };
    }
  }

  return <ProfilePage data={userData} />;
}

export default Profile;