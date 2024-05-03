import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

   title: { type: String, required: true, minLength: 2 },
   createdAt: { type: Date, required: true, default: Date.now },
   incomes: [
      {
         _id: false,
         id: { type: Schema.Types.ObjectId, ref: "Income" },
         amount: { type: Number, required: true },
      },
   ],
   expenses: [
      {
         _id: false,
         id: { type: Schema.Types.ObjectId, ref: "Expense" },
         amount: { type: Number, required: true },
      },
   ],
});

const Project =
   mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
