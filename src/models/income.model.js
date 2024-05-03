import mongoose from "mongoose";
import { User } from "./user.model";

const incomeSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   amount: { type: Number, required: true },
   category: { type: String, default: "general" },
   projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: false,
   },
   // notes: { type: String },
   date: { type: Date, default: Date.now },
   createdAt: { type: Date, default: Date.now },
});

const Income = mongoose.models.Income || mongoose.model("Income", incomeSchema);

export default Income;
