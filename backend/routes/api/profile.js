const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth.js');

const Profile = require('../../models/Profile.js');
const User = require('../../models/User.js');
const Post = require('../../models/Post.js');

//@route    GET api/profile/:username
//@desc     Get profiles info
//@access   Private
router.get('/:username', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ username: req.params.username })
			.select('-__v -saved')
			.lean();

		if (!profile) {
			return res.status(404).send('Profile not found!');
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error!');
	}
});

//@route    GET api/profile/posts/:username
//@desc     Get all posts published by specific username
//@access   Private
router.get('/posts/:username', auth, async (req, res) => {
	try {
		const profilePosts = await Post.find({ username: req.params.username })
			.sort({ date: -1 })
			.lean();
		const postsFinally = profilePosts.map((post) => ({
			_id: post._id,
			file: post.file,
			likes: post.likes.length,
			comments: post.comments.length,
		}));

		res.json(postsFinally);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error!');
	}
});

//@route    GET api/profile/saved/me
//@desc     Get all saved posts related to specific username
//@access   Private
router.get('/saved/me', auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 }).lean();
		const postsFinally = posts
			.filter((post) =>
				post.saved.some((elem) => elem.user.toString() === req.user.id)
			)
			.map((post) => ({
				_id: post._id,
				file: post.file,
				likes: post.likes.length,
				comments: post.comments.length,
			}));

		res.json(postsFinally);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error!');
	}
});

//@route    POST api/profile/avatar
//@desc     Change users avatar photo
//@access   Private
router.post(
	'/avatar',
	[auth, [check('avatar', 'Avatar is required!').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: erross.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');
			const posts = await Post.find({ user: req.user.id });
			const profile = await Profile.findOne({ user: req.user.id });

			user.avatar = req.body.avatar;
			await user.save();

			posts.map((post) => {
				post.avatar = req.body.avatar;
				post.save();
			});

			profile.avatar = req.body.avatar;
			await profile.save();

			res.json(user);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error!');
		}
	}
);

//@route    GET api/profile/followers
//@desc     Get all followers info
//@access   Private
router.get('/followers', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		const result = await Promise.all(
			profile.followers.map(async (follower) => {
				const user = await User.findById(follower.user.toString());

				return {
					user: follower.user.toString(),
					avatar: user.avatar,
					username: user.username,
					fullName: user.fullName,
				};
			})
		);

		res.json(result);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error!');
	}
});

//@route    POST api/profile/follower/add
//@desc     Adds follower
//@access   Private
router.post('/follower/add', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		profile.followers.unshift({ user: req.body.id });

		await profile.save();

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).send('User not found!');
		}
		res.status(500).send('Server Error!');
	}
});

//@route    POST api/profile/follower/remove
//@desc     Remove follower
//@access   Private
router.post('/follower/remove', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		const removeIndex = profile.followers
			.map((follower) => follower.user.toString())
			.indexOf(req.body.id);

		if (removeIndex === -1) {
			return res.status(404).send('User not found!');
		}

		profile.followers.splice(removeIndex, 1);

		await profile.save();

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).send('User not found!');
		}
		res.status(500).send('Server Error!');
	}
});

//@route    GET api/profile/following
//@desc     Get all following users info
//@access   Private
router.get('/following', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		const result = await Promise.all(
			profile.following.map(async (elem) => {
				const user = await User.findById(elem.user.toString());

				return {
					user: elem.user.toString(),
					avatar: user.avatar,
					username: user.username,
					fullName: user.fullName,
				};
			})
		);

		res.json(result);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error!');
	}
});

//@route    POST api/profile/following/add
//@desc     Add user to following
//@access   Private
router.post('/following/add', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		const followingProfile = await Profile.findOne({ user: req.body.id });
		profile.following.unshift({ user: req.body.id });
		followingProfile.followers.unshift({ user: req.user.id });

		await profile.save();
		await followingProfile.save();

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).send('User not found!');
		}
		res.status(500).send('Server Error!');
	}
});

//@route    POST api/profile/following/remove
//@desc     Remove user from following
//@access   Private
router.post('/following/remove', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		const followingProfile = await Profile.findOne({ user: req.body.id });
		const removeIndex = profile.following
			.map((elem) => elem.user.toString())
			.indexOf(req.body.id);
		const followerIndex = followingProfile.followers
			.map((elem) => elem.user.toString())
			.indexOf(req.user.id);

		if (removeIndex === -1) {
			return res.status(404).send('User not found!');
		}

		if (followerIndex === -1) {
			return res.status(404).send('User not found!');
		}

		profile.following.splice(removeIndex, 1);
		followingProfile.followers.splice(followerIndex, 1);

		await profile.save();
		await followingProfile.save();

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			res.status(404).send('User not found!');
		}
		res.status(500).send('Server Error!');
	}
});

module.exports = router;
