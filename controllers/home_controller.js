const Post = require('../models/post')
const User = require('../models/user')


module.exports.home = async function(req, res){
    
    try {
        let post = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })

        let user = await User.find({})

        return res.render('home', {
            title: "Home",
            posts: post,
            allUsers: user,
        });
    } catch (err){
        console.log("Error in home controller", err);
        return;
    }

        

  

}


 // Post.find({}, function(err, post){
    //     if(err){
    //         console.log("No post is available for the user");
    //         return;
    //     }

    //     return res.render('home', {
    //         title: "Home",
    //         posts: post,
    //     });
       
    // })

// module.exports.actionName = function(req, res){}