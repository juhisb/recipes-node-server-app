import * as reviewerDao from '../daos/ReviewerDao.js'

const ReviewerController = (app) => {

    const findPendingReviewers = async (req, res) => {
        const pending = await reviewerDao.findPendingList();
        res.json(pending)
    }

    const updateReviewer = async (req, res) => {
        const rid = req.params.rId;
        const updatedReviewer = req.body;
        const update = await reviewerDao.updateReviewer(rid, updatedReviewer);
        res.json(update)
    }

    const deleteReviewer = async (req, res) => {
        const rid = req.params.rId;
        const status = await reviewerDao.deleteReviewer(rid);
        res.send(status)
    }

    const findReviewer = async (req, res) => {
        const rId = req.params.rId;
        const rev = await reviewerDao.findReviewer(rId);
        res.json(rev)
    }

    const findApprovedReviewers = async (req, res) => {
        const approved = await reviewerDao.findApprovedList();
        res.json(approved)
    }

    const registerReviewer = async (req, res) => {
        const reviewer = req.body
        const existingReviewer = await reviewerDao.findByUsername(reviewer.username)
        if (existingReviewer) {
            res.sendStatus(403)
            return
        }
        const insertedReviewer = await reviewerDao.createReviewer(reviewer)
        res.json(insertedReviewer)
        console.log('registered as reviewer on server!');
    }

    const findReviewerExist = async (req, res) => {
        const username = req.params.username;
        console.log(username)
        const rev = await reviewerDao.findReviewerExist(username);
        res.json(rev)
    }

    app.post('/register-reviewer', registerReviewer);
    app.get('/reviewer/pending', findPendingReviewers)
    app.get('/reviewer/approved', findApprovedReviewers)
    app.put('/reviewer/update/:rId', updateReviewer)
    app.delete('/reviewer/delete/:rId', deleteReviewer)
    app.get('/reviewer/:rId', findReviewer)
    app.get('/reviewer/user/:username', findReviewerExist)


}

export default ReviewerController