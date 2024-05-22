const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entrySchema = new Schema({
   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
   entryType: { type: String, enum: ["income", "expense"], required: true },
   amount: { type: Number, required: true },
   category: { type: String, default: "general" },
   project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: false,
   },
   vatExempted: { type: Boolean, required: false },
   date: { type: Date, default: Date.now },
   createdAt: { type: Date, default: Date.now },
});

const Entry = mongoose.model("Entry", entrySchema);

const lastRecurringCheckSchema = new Schema({
   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
   lastCheck: { type: Date, required: true },
   createdAt: { type: Date, default: Date.now },
});

const LastRecurringCheck = mongoose.model(
   "LastRecurringCheck",
   lastRecurringCheckSchema
);

const projectSchema = new Schema({
   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

   title: { type: String, required: true, minLength: 2 },
   startDate: { type: Date, default: Date.now, required: true },
   entries: [{ type: Schema.Types.ObjectId, ref: "Entry" }],
   totalIncomes: { type: Number, default: 0 },
   totalExpenses: { type: Number, default: 0 },
   status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
   },
   createdAt: { type: Date, required: true, default: Date.now },
});

const Project = mongoose.model("Project", projectSchema);

const recurringExpenseSchema = new Schema({
   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

   title: { type: String, required: true },
   amount: { type: Number, required: true },
   category: { type: String, required: true },
   startDate: { type: Date, required: true },
   nextOccurrence: { type: Date, required: true },
   createdAt: { type: Date, default: Date.now },
});

const RecurringExpense = mongoose.model(
   "RecurringExpense",
   recurringExpenseSchema
);

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

const User = mongoose.model("User", userSchema, "users");

module.exports = {
   Entry,
   LastRecurringCheck,
   Project,
   RecurringExpense,
   User,
};
