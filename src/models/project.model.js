import mongoose, { Schema } from "mongoose";

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

const Project =
   mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
