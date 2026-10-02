import mongoose from "mongoose";

async function connectDB() {
  console.log("Connecting to DB...");
  if (mongoose.connections[0].readyState) return;
  console.log("Connecting to DB");
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI در فایل .envتعریف نشده است");
  }

  mongoose.set("strictQuery", false);
  await mongoose.connect(uri);
  console.log("Connecting to DB");
}

export default connectDB;
