import mongoose from "mongoose";
import followingSchema from "./FollowingSchema.js";

const followingModel = mongoose.model('FollowingModel', followingSchema);

export default followingModel;