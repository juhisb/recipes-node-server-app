import * as userDao from "../daos/UserDao.js";

const AdminController = (app) => {
    const login = async (req, res) => {
        const credentials = req.body;

        const existingUser = await userDao.findAdminByCredentials(credentials.username, credentials.password, "ADMIN")
        if (!existingUser) {
            res.sendStatus(401)
            return
        }
        req.session['currentAdmin'] = existingUser
        res.json(existingUser)
    }

    const logout = async (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }

    const profile = (req, res) => {
        console.log("Admin Profile");
        if (req.session['currentAdmin']) {
            res.send(req.session['currentAdmin'])
        } else {
            console.log('Admin session not found!')
            res.sendStatus(403)
        }
    }

    // const getLoggedInAdmin = async (req, res) => {
    //     if (req.session['currentAdmin']) {
    //         res.send(req.session['currentAdmin'])
    //     } else {
    //         res.sendStatus(403)
    //     }
    // }


    app.post("/admin/login", login);
    app.get("/admin/profile", profile);
    // app.get("/admin/details", getLoggedInAdmin)
    app.post('/admin/logout', logout)
}

export default AdminController;