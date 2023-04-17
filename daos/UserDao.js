import userModel from "../mongoose/users/UserModel.js";

export const findUser = (id) => userModel.findById(id);

export const createUser = (user) => userModel.create(user);

export const findAllUsers = () => userModel.find();

export const findByUsername = (username) => userModel.findOne({username});

export const findByCredentials = (username, password) =>
    userModel.findOne(
        {username, password},
        {password: false}
    );

export const deleteUser = (id) => userModel.deleteOne({_id: id})

export const updateUser = (id, userUpdates) =>
    userModel.updateOne(
        {_id: id},
        {$set: userUpdates}
    );

export const test = (id) => userModel.find({_id:id})
export const searchByUsername = (username) =>
    userModel.find({username: {'$regex': new RegExp("^.*" + username + ".*$"), '$options': 'i'}});

export const findByUsernameRev = (username) => userModel.findOne( {username : username});