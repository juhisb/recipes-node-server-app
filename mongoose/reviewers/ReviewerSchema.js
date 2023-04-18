import mongoose from "mongoose";

const reviewerSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: String,
    email: String,
    phoneNumber: Number,
    approved: {type: Boolean, default: false},
    accountType: {type: String, enum: ["ADMIN", "USER", "REVIEWER"]},
}, {collection: "reviewers"});

export default reviewerSchema;