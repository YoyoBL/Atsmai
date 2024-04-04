import mongoose, { Schema } from "mongoose";

const recurringExpenseSchema = new Schema({
   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

   title: { type: String, required: true },
   amount: { type: Number, required: true },
   category: { type: String, required: true },
   startDate: { type: Date, required: true },
   nextOccurrence: { type: Date, required: true },
   createdAt: { type: Date, default: Date.now },
});

const RecurringExpense =
   mongoose.models.RecurringExpense ||
   mongoose.model("RecurringExpense", recurringExpenseSchema);

export default RecurringExpense;
