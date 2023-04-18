import mongoose from "mongoose";
import reviewerSchema from "./ReviewerSchema.js";

const reviewerModel = mongoose.model('ReviewerModel', reviewerSchema);

export default reviewerModel;