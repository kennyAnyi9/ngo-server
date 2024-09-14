import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

AdminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

AdminSchema.statics.createDefaultAdmin = async function () {
  try {
    const adminCount = await this.countDocuments();
    if (adminCount === 0) {
      const defaultAdmin = new this({
        username: "administrator",
        password: "adminpass",
      });
      await defaultAdmin.save();
      console.log("Default admin account created");
    }
  } catch (error) {
    console.error("Error creating default admin:", error);
  }
};

export default mongoose.model("Admin", AdminSchema);
