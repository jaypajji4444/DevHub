const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
// validators
const {userLoginValidator}=require("../../validators/user")
const {runValidation}=require("../../validators/index")

const User=require("../../models/User")

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get("/",auth,async(req,res)=>{
try{
    const user=await User.findById(req.user.id).select("-password")
    res.status(200).json(user)
}
catch(err){
    res.status(500).json("Server Error")
}
})

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post("/",userLoginValidator,runValidation,async(req,res)=>{
    const {email,password}=req.body
    try{
        const user =await User.findOne({email})
        if(!user){
            return res.status(400).json("User does not exists")
        }
        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(500).json({errors:[{msg:"Invalid password!!"}]})
        }

        const payload={
            id:user._id,
            email:user.email
        }

        jwt.sign(payload,config.get("jwtSecret"),{expiresIn:"360000"},(err,token)=>{
            if(err)throw err;
            res.status(200).json({msg:"Login Successful",token:token})
        })


    }
    catch(err){
        res.status(500).json("Server error!!")
    }
})

module.exports=router;