import mongoose from 'mongoose';
import reviewSchema from "./ReviewSchema.js";

const reviewModel = mongoose.model('ReviewModel', reviewSchema);

export default reviewModel;