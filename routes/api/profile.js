const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
// validators
const { userExperienceValidator,profileValidator } = require("../../validators/user")
const { runValidation } = require("../../validators/index")
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');

const Profile = require("../../models/Profile")
const User = require("../../models/User")
const Post = require('../../models/Posts');
const { route } = require('./users');



// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        });
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        // only populate from user document if profile exists
        res.json(profile.populate('user', ['name', 'avatar']));
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post("/", profileValidator, runValidation, auth, async (req, res) => {
    // const {
    //     company,
    //     location,
    //     website,
    //     bio,
    //     skills,
    //     status,
    //     githubusername,
    //     youtube,
    //     twitter,
    //     instagram,
    //     linkedin,
    //     facebook
    // } = req.body;

    // const profileFields = {
    //     user: req.user.id,
    //     company,
    //     location,
    //     website: website === '' ? '' : normalize(website, { forceHttps: true }),
    //     bio,
    //     skills:skills,
    //     status,
    //     githubusername
    // };

    // // Build social object and add to profileFields
    // const socialfields = { youtube, twitter, instagram, linkedin, facebook };

    // for (const [key, value] of Object.entries(socialfields)) {
    //     if (value.length > 0)
    //         socialfields[key] = normalize(value, { forceHttps: true });
    // }
    // profileFields.social = socialfields;
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }
    // Social (optional fields)
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    try {
        let profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true, upsert: true })
        res.status(200).json(profile)
    }
    catch (err) {
        res.status(500).json("server Error")
    }

})

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', async (req, res) => {
    try {
        console.log(req.params.user_id)
        const profile = await Profile.findOne({ user: req.params.user_id })
        if (!profile) {
            return res.json("No profile found")
        }
        res.status(200).json(profile)
    }
    catch (err) {
        if (err.kind == "ObjectId") return res.json("Profile Not found")
        res.status(500).json("Server Error")
    }
})


// @route    DELETE api/profile
// @desc     Delete profile, user & posts personal
// @access   Private

router.delete("/", auth, async (req, res) => {
    try {
        // Remove posts
        const post = await Post.deleteMany({ user: req.user.id })
        // Remove profile
        const profile = await Profile.remove({ user: req.user.id })
        // Remve User
        const user = await Profile.remove({ user: req.user.id })

        res.json({ msg: 'User deleted' });
    }
    catch (err) {
        res.status(500).send('Server Error');
    }
})



// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private

router.post("/experience", auth, userExperienceValidator, runValidation, async (req, res) => {
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        // Unshilft() add the value at beginning of array and return the new length
        profile.experience.unshift(newExp);
        await profile.save();
        res.status(200).json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const foundProfile = await Profile.findOne({ user: req.user.id });

        foundProfile.experience = foundProfile.experience.filter(
            exp => exp._id.toString() !== req.params.exp_id
        );

        await foundProfile.save();
        return res.status(200).json(foundProfile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});


module.exports = router