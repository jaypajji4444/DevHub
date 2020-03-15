const {check}=require("express-validator")

exports.userValidator=[
    check("name","Name is required").not().isEmpty(),
    check("email","Please enter a valid email").isEmail(),
    check("password","Password of atleast 6 characters is required").isLength({min:6})

]