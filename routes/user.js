const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../module/user.js');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const { isLoggIn } = require('../middleware.js');
const { savedRedirectUrl } = require('../middleware.js');
const userController = require('../controllers/users.js');


//show signUp page
router.get('/signup', userController.signUpForm);

//Handle signup
router.post('/signup', userController.signUp);

//show login page
router.get('/login', userController.loginForm);

//Handle login
router.post('/login',
    savedRedirectUrl,
    passport.authenticate('local',
        { failureFlash: true, failureRedirect: '/login' }),
    userController.login

);

//Handle logout
router.get('/logout', userController.logout);


module.exports = router;