import * as userDao from '../daos/UserDao.js'

let currentUser = null

const UsersController = (app) => {
    const findUser = async (req, res) => {
        const user = await userDao.findUser(req.params.usid);
        res.json(user);
    }

    const findAllUsers = async (req, res) => {
        const user = await userDao.findAllUsers();
        res.json(user);
    }

    const deleteUser = async (req, res) => {
        const usid = req.params.usid
        const status = await userDao.deleteUser(usid)
        res.json(status);
    }

    const updateUser = async (req, res) => {
        const usid = req.params.usid
        const updates = req.body
        const status = await userDao.updateUser(usid, updates)
        req.session['currentUser'] = updates
        res.json(status);
    }

    const registerUser = async (req, res) => {
        console.log("Register");
        const user = req.body
        const existingUser = await userDao.findByUsername(user.username)
        if (existingUser) {
            res.sendStatus(403)
            return
        }
        const insertedUser = await userDao.createUser(user)
        req.session['currentUser'] = insertedUser
        res.json(insertedUser)
    }

    const login = async (req, res) => {
        const credentials = req.body
        const existingUser = await userDao
            .findByCredentials
            (credentials.username, credentials.password)
        if (!existingUser) {
            res.sendStatus(401)
            return
        }
        req.session['currentUser'] = existingUser
        res.json(existingUser)
    }

    const logout = (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }

    const profile = (req, res) => {
        console.log("Profile");
        // console.log("sess" ,req.session['currentUser'] )
        if (req.session['currentUser']) {
            res.send(req.session['currentUser'])
        } else {
            console.log('session not found!')
            res.sendStatus(403)
        }
    }

    const searchByUsername = async (req, res) => {
        const user = await userDao.searchByUsername(req.params.uname);
        res.json(user);
    }

    const findUserId = async (req, res) => {
        const username = req.params.uname
        const userId = await userDao.findByUsernameRev(username);
        res.json(userId)
    }

    app.get('/profile/all', findAllUsers);
    app.get('/profile/:usid', findUser);
    app.get('/profile', profile)
    app.delete('/profile/:usid', deleteUser)
    app.put('/profile/:usid', updateUser)
    app.post('/register', registerUser)
    app.post('/login', login)
    app.post('/logout', logout)
    app.get('/searchByUsername/:uname', searchByUsername)
    app.get('/user/reviewer/:uname', findUserId)
}

export default UsersController