import * as reviewDao from '../daos/ReviewDao.js'
import {findUser} from "../daos/UserDao.js";
const ReviewController = (app) => {
    const findAllReviewsForRecipe = async (req, res) => {
        const recipeReviews = await reviewDao.findAllRecipeReviews(req.params.id);
        let returnVal = []
        for(let i in recipeReviews) {
            const rev = await findUser(recipeReviews[i].reviewBy)
            console.log("recipeReviews[i]", recipeReviews[i])
            console.log("rev", rev)
            const obj = {
                ...recipeReviews[i]["_doc"],
                "reviewer": rev
            };
            console.log("obj", obj)
            returnVal.push(obj)
        }
        console.log(returnVal)
        res.json(returnVal);
    }

    const findAllReviewsByUser = async (req, res) => {
        const userReviews = await reviewDao.findAllUserReviews(req.params.uid);
        res.json(userReviews);
    }

    const createReview = async (req, res) => {
        const review = req.body;
        const newReview = await reviewDao.createReview(review);
        console.log(newReview)
        const rev = await findUser(newReview['reviewBy'])
        const obj = {
            ...newReview["_doc"],
            "reviewer": rev
        };
        res.json(obj);
    }

    const removeReview = async (req, res) => {
        const status = await reviewDao.removeReview(req.params.rid)
        res.json(status);
    }

    const findAverageRating = async (req, res) => {
        const recipeReviews = await reviewDao.findAllRecipeReviews(req.params.id);
        let sumRating = 0;
        let avgRating = 0;
        for(let i in recipeReviews) {
            sumRating += recipeReviews[i].rating
        }
        const totalReviews = Object.keys(recipeReviews).length;
        if (totalReviews > 0) {
            avgRating = Math.round((sumRating/totalReviews) * 10) / 10
        }
        res.json(avgRating);
    }

    app.get('/review/recipe/:id', findAllReviewsForRecipe);
    app.get('/review/user/:uid', findAllReviewsByUser);
    app.post('/review', createReview)
    app.delete('/remove-review/:rid', removeReview)
    app.get('/review/avg-rating/:id', findAverageRating)
}

export default ReviewController