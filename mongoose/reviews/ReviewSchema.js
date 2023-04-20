import mongoose, {Schema} from 'mongoose';

const reviewSchema = mongoose.Schema({
    recipeId: Number,
    reviewBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    review: String,
    rating: Number,
    recipeImage: String,
    recipeTitle: String
}, {collection: "reviews"});
export default reviewSchema;