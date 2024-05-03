import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

   title: { type: String, required: true, minLength: 2 },
   createdAt: { type: Date, required: true, default: Date.now },
});

const Project =
   mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
