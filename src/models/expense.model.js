import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema({
   // user: { type: Schema.Types.ObjectId, ref: "User", required: true },
   amount: { type: Number, required: true },
   description: { type: String },
   date: { type: Date, default: Date.now },
   createdAt: { type: Date, default: Date.now },
});

const Expense =
   mongoose.models.Expense || mongoose.model("Expense", expenseSchema);

export default Expense;
