import reviewModel from "../mongoose/reviews/ReviewModel.js";

export const createReview = (review) => reviewModel.create(review);

export const removeReview = (rid) => reviewModel.deleteOne({ _id: rid });

export const findAllRecipeReviews = (recipeId) => reviewModel.find({recipeId : recipeId});

export const findAllUserReviews = (user) => reviewModel.find({reviewBy : user});