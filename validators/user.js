const {check}=require("express-validator")

exports.userRegisterValidator=[
    check("name","Name is required").not().isEmpty(),
    check("email","Please enter a valid email").isEmail(),
    check("password","Password of atleast 6 characters is required").isLength({min:6})

]


exports.userLoginValidator=[
    check("email","Valid email address is required").isEmail(),
    check("password","Password of min length 6 is required").isLength({min:6})
]