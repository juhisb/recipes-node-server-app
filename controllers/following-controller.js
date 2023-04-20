import * as followingDao from '../daos/FollowingDao.js'
import {compileETag} from "express/lib/utils.js";
import {Schema} from "mongoose";

const addFollower = async (req, res) => {
    const following = req.body;
    const insertFollower = await followingDao.createFollowing(following)
    res.json(insertFollower);
}

const findAllFollowers = async (req, res) => {
    const userId = req.params.usid;
    console.log("All followers !!!!!!!!! blaaaa ",userId);
    const followers = await followingDao.findAllFollowers(userId);
    console.log("All followers !!!!!!!!! ",followers);
    res.json({followers})
}

const unfollow = async (req, res) => {
    console.log(req.params)
    const unfollowId = req.params;
    const status = await followingDao.deleteFollower(unfollowId);
    res.json(status)

}

export default (app) => {
    app.get('/follow/:usid', findAllFollowers);
    app.post('/follow', addFollower);
    app.delete('/unfollow/:usid/:fid', unfollow)

}

