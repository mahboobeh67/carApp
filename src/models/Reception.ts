import { Schema, model, models, Types } from "mongoose";

export interface IReceptionDocument {
  ownerName: string;
  phone: string;
  carModel: string;
  productionYear: number;
  plateNumber: string;
  fuelType: "petrol" | "gasoline" | "cng" | "hybrid" | "diesel" | "dual"; 
  description?: string;
  services: string[];
  images: string[];
  reservationDate: Date;
  userId: Types.ObjectId;
}

const receptionSchema = new Schema<IReceptionDocument>(
  {
    ownerName: {
      type: String,
      required: [true, "نام و نام خانوادگی مالک الزامی است"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "شماره تماس الزامی است"],
      trim: true,
    },
    carModel: {
      type: String,
      required: [true, "مدل و نوع خودرو الزامی است"],
      trim: true,
    },
    productionYear: {
      type: Number,
      required: [true, "سال تولید خودرو الزامی است"],
    },
    plateNumber: {
      type: String,
      required: [true, "شماره پلاک خودرو الزامی است"],
      trim: true,
    },
    fuelType: {
      type: String,
      enum: {
        values: ["petrol", "cng", "hybrid", "diesel","gasoline", "dual"],
        message: "نوع سوخت وارد شده معتبر نیست",
      },
      required: [true, "نوع سوخت الزامی است"],
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    services: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    reservationDate: {
      type: Date,
      required: [true, "تاریخ رزرو نوبت الزامی است"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// جلوگیری از تعریف مجدد مدل در hot reload نِکست
const Reception = models.Reception || model<IReceptionDocument>("Reception", receptionSchema);
if (models.Reception) {
  delete models.Reception;
}

export default Reception;
