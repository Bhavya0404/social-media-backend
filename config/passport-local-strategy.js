const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req, email, password, done){
        // find user and establish identity
          // property we looking: email passed
        User.findOne({email: email}, function(err, user){
            if(err){
                req.flash('error', err);
                return done(err);
            }

            if(!user || user.password != password){
                req.flash('error', 'Invalid creds');
                // err - null, authentication - false
                return done(null, false);
            }

            return done(null, user);
        })
    }
))

// serialising the user to decide which key to be kept in the cookies

passport.serializeUser(function(user, done){
    //  decides which property to be sent to cookie
    done(null, user.id);
})

// desrializing the user from the key in cookies

passport.deserializeUser(function(id, done){
    //  id comes, browser makes a req and finds the user
    User.findById(id, function(err, user){
        if(err){
            console.log('error in finding user');
            return done(err);
        }

        return done(null, user);
    })
})


// check if user is authenticated
// DONT USE CURLY BRACKETS HERE

passport.checkAuthentication = function(req, res, next){
    // if user is  signed in then pass req to next fn(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    // if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the cookie and we are sending this to the locals for the views
        res.locals.user = req.user
    }

    next();
}
module.exports = passport;