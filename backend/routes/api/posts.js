const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth.js');
const request = require('request');

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

//@route    GET api/posts
//@desc     Get all posts
//@access   Private
router.get("/", auth, async (req,res) => {
    try{
        const posts = await Post.find().select('-saved').sort({date: -1}).lean();
        const postsFinally = posts.map(post => ({...post, saved: post.user.toString() === req.user.id ? true : false}));
        res.json(postsFinally);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
})

//@route    GET api/posts/profile/:username
//@desc     Get all posts published by specific username
//@access   Private
router.get("/profile/:username", auth, async (req,res) => {
    try{
        const profilePosts = await Post.find({username: req.params.username}).sort({date: -1});

        res.json(profilePosts);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
})

//@route    GET api/posts/saved/:username
//@desc     Get all saved posts related to specific username
//@access   Private
router.get('/saved/me', auth, async (req,res) => {
    try{
        const posts = await Post.find().select('-saved').sort({date: -1}).lean();
        const postsFinally = posts.map(post => ({...post, saved: post.user.toString() === req.user.id ? true : false})).filter(post => post.saved);
        res.json(postsFinally);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
});

//@route    GET api/posts/:id
//@desc     Get post by ID
//@access   Private
router.get('/:id', auth, async (req,res) => {
    try{
        const post = await Post.findById(req.params.id).select('-saved').lean();

        if(!post){
            return res.status(404).json({msg: 'Post not found!'});
        }

        const postFinally = {...post, saved: post.user.toString() === req.user.id ? true : false}

        res.json(postFinally);
    }catch(err){
        console.error(err.message);
        if(err.kind === "ObjectId"){
            return res.status(404).json({msg: 'Post not found!'});
        }
        res.status(500).send('Server Error!');
    }
});

//@route    DELETE api/posts/:id
//@desc     Delete post by ID
//@access   Private
router.delete('/:id', auth, async (req,res) => {
    try{
        const user = await User.findById(req.user.id);
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({msg: 'Post not found!'});
        }

        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not authorized!'});
        }

        await post.remove();

        user.saved = user.saved.filter(savedElem => savedElem.post.toString() !== req.params.id);

        await user.save();

        res.json({msg: "Post removed"});
    }catch(err){
        console.error(err.message);
        if(err.kind === "ObjectId"){
            return res.status(404).json({msg: "Post not found!"})
        }
        res.status(500).send('Server Error!');
    }
});

//@route    PUT api/posts/like/:id
//@desc     Like a post
//@access   Private
router.put('/like/:id', auth, async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);

        if(post.likes.filter((like) => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg: 'Post already liked!'});
        }

        post.likes.unshift({user: req.user.id});

        await post.save();

        res.json(post.likes);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
});

//@route    PUT api/posts/unlike/:id
//@desc     Unlike a post
//@access   Private
router.put('/unlike/:id', auth, async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);

        if(post.likes.filter((like) => like.user.toString() === req.user.id).length === 0){
            res.status(400).json({msg: "Post has not yet been liked!"});
        }

        const removeIndex = post.likes.map((like) => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
})

//@route    PUT api/posts/save/:id
//@desc     Save a post
//@access   Private
router.put('/save/:id', auth, async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);

        if(post.saved.filter(saveElem => saveElem.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg: 'Post already saved!'});
        }

        post.saved.unshift({user: req.user.id});

        await post.save();

        res.json({msg: 'Post saved!'});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
});

//@route    PUT api/posts/unsave/:id
//@desc     Unsave a post
//@access   Private
router.put('/unsave/:id', auth, async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);

        if(post.saved.filter(saveElem => saveElem.user.toString() === req.user.id).length === 0){
            res.status(400).json({msg: 'Post has not yet been saved!'});
        }

        const removeIndex = post.saved.map(saveElem => saveElem.user.toString()).indexOf(req.user.id);

        post.saved.splice(removeIndex, 1);

        await post.save();

        res.json({msg: 'Post unsaved!'});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
});

//@route    POST api/posts/comment/:id
//@desc     Comment on a post
//@access   Private
router.post('/comment/:id', [auth, [check("text", "Text is required!").not().isEmpty()]], async (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try{
        const user = await User.findById(req.user.id);
        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            user: req.user.id,
            username: user.username,
            avatar: user.avatar
        }

        post.comments.unshift(newComment);

        await post.save();

        res.json(post.comments);
    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
});

//@route    DELETE api/posts/comment/:id/:comment_id
//@desc     Delete comment
//@access   Private
router.delete('/comment/:id/:comment_id', auth, async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);

        const comment = post.comments.find((comment) => comment.id === req.params.comment_id);

        if(!comment){
            return res.status(404).json({msg: 'Comment does not exist!'});
        }

        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not authorized!'});
        }

        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

        post.comments.splice(removeIndex, 1);

        await post.save();

        res.json(post.comments);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
});


module.exports = router;