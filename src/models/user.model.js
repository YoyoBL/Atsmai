import mongoose, { Schema } from "mongoose";
import "server-only";

const userSchema = new Schema({
   firstName: { type: String, minLength: 2, required: true },
   lastName: { type: String, minLength: 2, required: true },
   email: { type: String, required: true, unique: true },
   password: {
      type: String,
      required: true,
   },
   role: { type: String, default: "user", required: false },
   country: { type: String, required: true },
   city: { type: String, minLength: 2, required: true },
   vat: { type: Boolean, default: false },
   lang: { type: String, required: false, default: "he" },
   createdAt: { type: Date, default: Date.now },
});

const User =
   mongoose.models.User || mongoose.model("User", userSchema, "users");
export default User;
