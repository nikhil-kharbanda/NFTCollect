const router = require("express").Router();
const { Collect, User, Comment } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

//CREATE a post, adding new image to database
router.post("/", async(req, res) => {

    console.log(req.body);
    console.log(req.files.sampleFile.name);

    let finalImg = req.files.sampleFile.name;
    let upload = "./imgs/" + req.files.sampleFile.name;

    req.files.sampleFile.mv(upload, async function(err) {
        if (err) return res.status(500).send(err);
        //upload picture with metadata of post name, description, user who is posting it, and the image
        try {
            const dbPostData = await Collect.create({
                collectName: req.body.uploadTitle,
                content: req.body.description,
                userId: req.session.user_id.id,
                imageTag: finalImg,
            });

            //refresh the page
            res.redirect('/feed');

            //if error occurs or image could not be uploaded
        } catch (err) {
            res.status(400).json(err);
        }
    });
});

//get single post by id
router.get(":/id", (req, res) => {
    Collect.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "collectName", "content", "imageTag", "dateCreated"],
            include: [{
                    model: User,
                    attributes: ['userName'],
                },
                {
                    model: Comment,
                    attributes: ["id", "content", "dateCreated", "userId"],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
            ]
        })
        .then((postData) => {
            if (!postData) {
                res.status(404).json({ message: "No post found with this id" });
                return;
            }
            res.json(postData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

//delete a post by id
router.delete("/:id", withAuth, (req, res) => {
    Collect.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then((postData) => {
            if (!postData) {
                res.status(404).json({ message: "No post found with this id" });
                return;
            }
            res.json(postData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

module.exports = router;