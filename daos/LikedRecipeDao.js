// import likedAnimeModel from "../mongoose/likedAnime/LikedAnimeModel.js";
//
// export const addLikedAnime = (userLikedAnime) => likedAnimeModel.create(userLikedAnime);
//
// export const removeLikedAnime = (userDislikedAnime) => likedAnimeModel.deleteOne(userDislikedAnime);
//
// export const findAllLikedAnime = (userId) => likedAnimeModel.find({userId : userId}, {userId: false});
//
// export const findLikesCount = (animeId) => likedAnimeModel.find({animeId : animeId}, {userId: false});
//
// export const findAnimeLikedByUser = (userId, animeId) =>
//     likedAnimeModel.findOne({userId, animeId}, {userId: false});
