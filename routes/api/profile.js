const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
//const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');



module.exports=router