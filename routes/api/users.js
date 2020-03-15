const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
// validators
const {userValidator}=require("../../validators/user")
const {runValidation}=require("../../validators/index")


// User Model
const User=require("../../models/User")



// @route   Post api/users
// @desc    Registe user
// @access  Public
router.post("/",userValidator,runValidation,async(req,res)=>{
    const error=validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
})


module.exports=router