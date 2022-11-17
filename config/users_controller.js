const e = require('express');
const User = require('../models/user');
const fs = require('fs');
const path = require('path')

// module.exports.profile = function(req, res){
//     
//     if(req.cookies.user_id){
//         User.findOne({_id: req.body.back}, function(err, user){
//             if(err){
//                 console.log("Cant find ");
//                 return;
//             }
    
//             if(user){
//                 return res.render('user_profile', {
//                     title: 'User Profile',
//                     userData: user,
//                 })
//             }
//             return res.redirect('/users/sign-in');
//         })
//     } else {
//         return res.redirect('/users/sign-in'); 
//     }
// }

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profileUser: user,
        })
    })
}


module.exports.signup = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('signup', {
        title: 'SIGN UP'
    })
}

module.exports.signin = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('signin', {
        title: 'SIGN IN'
    })
}

module.exports.create = function(req, res){
    console.log(req.body);
    if(req.body.password != req.body.cpassword){
        return res.redirect('back');
    }
    
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("Error in finding user");
            return;
        }

        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log("Error in creating user");
                    return;
                }
                console.log("user created!!");
                return res.redirect('/users/sign-in');
            })
        } else {
            return res.redirect('back');
        }
    })
    
}

/*module.exports.createSession = function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("Error in finding user in sign in");
            return;
        }

        if(user){
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            res.cookie('user_id', user._id);
            return res.redirect('/users/profile');

        } else {
            return res.redirect('back');

        }
    })
    
}*/

module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'You have logged out');
        return res.redirect('/');
    })

    
}

module.exports.update = async function(req, res) {
    // current logged in user req.user.id
    // req.params.id gives id jiski update karni hai

    if(req.user.id == req.params.id){
        try{
            let user = await User.findByIdAndUpdate(req.params.id, req.body);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('****** Multer Error ******');
                } else {
                    // console.log(req.file);
                    user.name = req.body.name;
                    user.email = req.body.email;
                    if(req.file){

                        if(user.avatar){
                            fs.unlinkSync(path.join(__dirname, '..' , user.avatar))
                        }
                        user.avatar = User.avatarPath + '/' + req.file.filename
                    }
                    user.save();
                    return res.redirect('back');
                }
            })
        } catch(error){
            req.flash('error');
            return res.redirect('back');
        }
    } else {
        req.flash('error', 'Unathorised');
        return res.status(401).send('Unauthorized')
    }
   
}