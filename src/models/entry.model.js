import mongoose, { Schema } from "mongoose";

const entrySchema = new Schema({
   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
   entryType: { type: String, enum: ["income", "expense"], required: true },
   amount: { type: Number, required: true },
   category: { type: String, default: "general" },
   project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: false,
   },
   vatExempted: { type: Boolean, required: false },
   // notes: { type: String },
   date: { type: Date, default: Date.now },
   createdAt: { type: Date, default: Date.now },
});

const Entry = mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default Entry;
