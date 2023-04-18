import reviewerModel from "../mongoose/reviewers/ReviewerModel.js";

export const findPendingList = () => reviewerModel.find({approved: false});

export const findApprovedList = () => reviewerModel.find({approved: true});

export const createReviewer = (reviewer) => reviewerModel.create(reviewer);

export const updateReviewer = (rid, updateReviewer) => reviewerModel.updateOne({_id: rid},
                                                                               {$set: updateReviewer});

export const deleteReviewer = (rId) => reviewerModel.deleteOne({_id: rId})

export const findReviewer = (id) => reviewerModel.findById(id);

export const findReviewerExist = (username) => reviewerModel.findOne({
                                                                 username: username,
                                                                 approved: true
                                                             });

export const findByUsername = (username) => reviewerModel.findOne({username});
