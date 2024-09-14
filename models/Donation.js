import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Donation", DonationSchema);
