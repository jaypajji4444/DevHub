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


exports.profileValidator=[
    check("status","status is required").not().isEmpty(),
    check("skills","Skills is required").not().isEmpty()
]


exports.userExperienceValidator=[
    check('title', 'Title is required')
      .not()
      .isEmpty(),
    check('company', 'Company is required')
      .not()
      .isEmpty(),
    check('from', 'From date is required and needs to be from the past')
      .not()
      .isEmpty()
      .custom((value, { req }) => (req.body.to ? value < req.body.to : true))
  ]