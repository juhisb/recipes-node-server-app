import * as pinnedRecipeDao from "../daos/PinnedRecipeDao.js";

const PinnedRecipeController = (app) => {
    const addPinnedRecipe = async (req, res) => {

        const userPinnedRecipe = req.body;
        const userRecipePair = await pinnedRecipeDao.findRecipePinnedByUser(userPinnedRecipe.userId, userPinnedRecipe.recipeId)
        if (userRecipePair) {
            res.sendStatus(403)
            return
        }
        const addedRecipe = await pinnedRecipeDao.addPinnedRecipe(userPinnedRecipe)
        res.json(addedRecipe);
    }

    const removePinnedRecipe = async (req, res) => {

        const userUnpinnedRecipe = req.body;
        const userRecipePair = await pinnedRecipeDao.findRecipePinnedByUser(userUnpinnedRecipe.userId, userUnpinnedRecipe.recipeId)
        if (!userRecipePair) {
            res.sendStatus(403)
            return
        }
        const removedRecipe = await pinnedRecipeDao.removePinnedRecipe(userUnpinnedRecipe)
        res.json(removedRecipe);
    }

    const findAllPinnedRecipe = async (req, res) => {
        const userId = req.params.userId;
        const pinnedRecipe = await pinnedRecipeDao.findAllPinnedRecipe(userId);
        res.json(pinnedRecipe)
    }

    const findPinCount = async (req, res) => {
        const recipeId = req.params.recipeId;
        const totalPins = await pinnedRecipeDao.findPinCount(recipeId);
        res.json(totalPins)
    }

    const findUserPinnedRecipe = async (req, res) => {
        const userPinnedRecipe = await pinnedRecipeDao.findRecipePinnedByUser(req.params.userId, req.params.recipeId)
        if (userPinnedRecipe)
            res.json(true)
        else
            res.json(false)
    }

    app.get('/userPinnedRecipe/:userId/:recipeId', findUserPinnedRecipe)
    app.get('/pinCount/:recipeId', findPinCount);
    app.get('/pin/:userId', findAllPinnedRecipe);
    app.post('/pin', addPinnedRecipe);
    app.post('/unpin', removePinnedRecipe);
}

export default PinnedRecipeController;