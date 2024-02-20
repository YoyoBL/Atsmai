import mongoose from "mongoose";
import { User } from "./user.model";

const incomeSchema = new mongoose.Schema({
   // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
   amount: { type: Number, required: true },
   category: { type: String, default: "general" },
   notes: { type: String },
   date: { type: Date, default: Date.now },
   // createdAt: { type: Date, default: Date.now },
});

const Income = mongoose.models.Income || mongoose.model("Income", incomeSchema);

export default Income;
