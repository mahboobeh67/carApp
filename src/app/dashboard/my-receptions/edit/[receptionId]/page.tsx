import Reception from "@/models/Reception";
import AddCarProfilePage from "@/template/AddCarProfilePage";
import connectDB from "@/utils/connectDB";
import { Types } from "mongoose";

type EditReceptionPageProps = {
  params: {
    receptionId: string;
  };
};

async function EditReceptionPage({ params }: EditReceptionPageProps) {
  await connectDB();

  const { receptionId } = params;

  // اعتبارسنجی فرمت شناسه قبل از کوئری
  if (!Types.ObjectId.isValid(receptionId)) {
    return <h3>مشکلی به وجود آمده است، مجدد امتحان کنید....</h3>;
  }

  const reception = await Reception.findOne({ _id: receptionId });

  if (!reception) {
    return <h3>مشکلی به وجود آمده است، مجدد امتحان کنید....</h3>;
  }

  return <AddCarProfilePage data={JSON.parse(JSON.stringify(reception))} />;
}

export default EditReceptionPage;
