const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersConrtoller = require('../config/users_controller');

// if middle one is true then goes to third para i.e controller

router.get('/profile/:id', passport.checkAuthentication ,usersConrtoller.profile);
router.get('/sign-up', usersConrtoller.signup);
router.get('/sign-in', usersConrtoller.signin);
router.post('/create-user', usersConrtoller.create);
router.get('/sign-out', usersConrtoller.destroySession)
router.post('/update/:id', usersConrtoller.update)
// router.post('/create-session', usersConrtoller.createSession)

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
) , usersConrtoller.createSession)


module.exports = router;