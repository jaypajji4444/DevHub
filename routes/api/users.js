const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
// validators
const {userRegisterValidator}=require("../../validators/user")
const {runValidation}=require("../../validators/index")


// User Model
const User=require("../../models/User")


// @route   Post api/users
// @desc    Registe user
// @access  Public
router.post("/",userRegisterValidator,runValidation,async(req,res)=>{
const {name,email,password,coolpa}=req.body;
try{
  let user=await User.findOne({email})
  if(user){
      return res.json({errors:[{msg:"User already exists"}]});
  }
  // gravatar
  const avatar=gravatar.url(email,{
    s:"200",
    r:"pg",
    d:"mm"
  })
  user=await new User({
    name,email,password,avatar
  })

  const salt=await bcrypt.genSalt(10)
  user.password=await bcrypt.hash(password,salt);
  await user.save()

const payload={
    id:user._id,
    email:user.email
}
  jwt.sign( payload,
    config.get('jwtSecret'),
    { expiresIn: 86400*15 },
    (err, token) => {
      if (err) throw err;
      res.json({ token:token});
    })
}
catch(err){
  console.log(err)
  res.status(400).json("Server Error")
}
})


module.exports=router