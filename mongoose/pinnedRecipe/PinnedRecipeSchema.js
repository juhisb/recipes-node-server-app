import mongoose, {Schema} from 'mongoose';

const pinnedRecipeSchema = mongoose.Schema({
    recipeId: Number,
    userId:{type: Schema.Types.ObjectId, ref:"UserModel"},
    recipeImage: String,
    recipeTitle: String
}, {collection: "pinnedRecipe"});
export default pinnedRecipeSchema;