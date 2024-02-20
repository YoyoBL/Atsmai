import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   fullName: { type: String, required: true },
   email: { type: String },
   password: { type: String, default: "Aa123456@", required: false },
   role: { type: String, default: "user", required: false },
   address: { type: String, required: false },
   image: {
      type: String,
      default:
         "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
      required: false,
   },
   createdAt: { type: Date, default: Date.now },
});

export const User =
   mongoose.models.User || mongoose.model("User", userSchema, "users");
