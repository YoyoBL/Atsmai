import mongoose, { Schema } from "mongoose";

const lastRecurringCheckSchema = new Schema({
   // user: { type: Schema.Types.ObjectId, ref: "User", required: true },
   lastCheck: { type: Date, required: true },
   createdAt: { type: Date, default: Date.now },
});

const LastRecurringCheck =
   mongoose.models.LastRecurringCheck ||
   mongoose.model("LastRecurringCheck", lastRecurringCheckSchema);

export default LastRecurringCheck;
