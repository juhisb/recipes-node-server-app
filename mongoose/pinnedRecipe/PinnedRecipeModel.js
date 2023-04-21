import mongoose from "mongoose";
import pinnedRecipeSchema from "./pinnedRecipeSchema.js";

const pinnedRecipeModel = mongoose.model('PinnedRecipeModel', pinnedRecipeSchema);

export default pinnedRecipeModel;