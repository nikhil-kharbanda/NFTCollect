const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Post a new comment if auth
router.post('/', withAuth, async(req, res) => {
    console.log(req.body, req.session.user_id)
    try {
        //create new comment with def of the content, id attached to it, and user who posted it
        const newComment = await Comment.create({
            content: req.body.content,
            collectId: req.body.collectId,
            userId: req.session.user_id.id
        });

        console.log(newComment);
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

//delete comment by id
router.delete("/:id", withAuth, (req, res) => {
    Comment.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then((commentData) => {
            if (!commentData) {
                res.status(404).json({ message: "No comment found with this id" });
                return;
            }
            res.json(commentData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

module.exports = router;