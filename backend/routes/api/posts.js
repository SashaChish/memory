const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth.js');

const Post = require('../../models/Post.js');
const User = require('../../models/User.js');

//@route    POST api/posts
//@desc     Create a post
//@access   Private
router.post('/', [auth, [
    check("description", "Description is required!").not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try{
        const user = await User.findById(req.user.id);

        const newPost = new Post({
            user: req.user.id,
            description: req.body.description,
            picture: req.body.picture,
            username: user.username,
            avatar: user.avatar
        });

        const post = await newPost.save();
        res.json(post);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;