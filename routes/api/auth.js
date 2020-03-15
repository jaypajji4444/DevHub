const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');



module.exports=router;