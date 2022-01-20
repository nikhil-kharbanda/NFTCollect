const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Collect, User, Comment } = require("../models");
const { sequelize } = require("../models/User");

// TODO: new route, that will find all collects that matches the keyword in the collect name. This information would be sent into a feed

//Gets all the posts and redirects if user is auth to view and display on feed
router.get("/feed", withAuth, async(req, res) => {
    try {
        const collectsData = await Collect.findAll({
            include: [{
                    model: User,
                    attributes: ["userName", "id"],
                    required: true,
                },
                {
                    model: Comment,
                    attributes: ["content", "collectId", "userId", "id"],
                    required: false,
                    include: [{ model: User, attributes: ["userName"], required: false }],
                },
            ],
        });

        const collects = collectsData.map((collect) =>
            collect.get({ plain: true })
        );
        // console.log(collects);
        // console.log(collects[0].comments);

        console.log(req.session.user_id.id);
        console.log(collects[0]);

        //Render the feeds page

        res.render("feed", {
            collects,
            title: "feed",
            style: "feed.css",
            exStyle: "https://unicons.iconscout.com/release/v2.1.6/css/unicons.css",
            scripts: [{ script: "index.js" }, { script: "logout.js" }],
            user_id: req.session.user_id,
            idUser: req.session.user_id.id
        });
        //If feeds doesnt exist, error
    } catch (err) {
        console.log("is this here?");
        res.status(400).json(err);
    }
});

//Go to feed
router.get("/", (req, res) => {
    res.redirect("/feed");
});

//Login if user is not logged in already
router.get("/login", (req, res) => {
    res.render("index", {
        title: "Sign in",
        style: "style.css",
        scripts: [{ script: "login.js" }],
    });
});

//Signup if user has not created an account
router.get("/signup", (req, res) => {
    res.render("signup", {
        title: "Sign up",
        style: "style.css",
        scripts: [{ script: "signup.js" }],
    });
});

module.exports = router;