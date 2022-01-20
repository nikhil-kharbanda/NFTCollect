const router = require("express").Router();
const { User } = require("../../models");

//create a new user when signup page active
router.post("/signup", async(req, res) => {
    console.log(req.body)
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = { id: userData.id, name: userData.userName };
            req.session.logged_in = true;

            res.json({ user: userData, message: "You are now logged in!" });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//log the user in (check the database to see if user signed up before), and redirect to feed after
router.post("/login", async(req, res) => {
    console.log(req.body)
        //find a user with name
    try {
        const userData = await User.findOne({ where: { userName: req.body.username } });
        if (!userData) {
            res
                .status(400)
                .json({ message: "Incorrect email or password, please try again" });
            return;
        }

        //checks password
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: "Incorrect email or password, please try again" });
            return;
        }

        //save session details
        req.session.save(() => {
            req.session.user_id = { id: userData.id, name: userData.userName };
            req.session.logged_in = true;

            res.json({ user: userData, message: "You are now logged in!" });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//delete the session details until a new user logs in
router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).redirect('/');

        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;