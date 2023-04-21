import pinnedRecipeModel from "../mongoose/pinnedRecipe/PinnedRecipeModel.js";

export const addPinnedRecipe = (userPinnedRecipe) => pinnedRecipeModel.create(userPinnedRecipe);

export const removePinnedRecipe = (userUnpinnedRecipe) => pinnedRecipeModel.deleteOne(userUnpinnedRecipe);

export const findAllPinnedRecipe = (userId) => pinnedRecipeModel.find({userId : userId}, {userId: false});

export const findPinCount = (recipeId) => pinnedRecipeModel.find({recipeId : recipeId}, {userId: false});

export const findRecipePinnedByUser = (userId, recipeId) =>
    pinnedRecipeModel.findOne({userId, recipeId}, {userId: false});
