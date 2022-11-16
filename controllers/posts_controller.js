const Post = require('../models/post')
const Comment = require('../models/comments')

module.exports.create  = async function(req, res) {

    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id,
        })
        req.flash('success', 'Post Published');
        return res.redirect('back');
    } catch(err) {
        req.flash('error', err);
        // console.log("Error in post Controller, Create", err);
        return;
    }
   
}

module.exports.destroy = async function(req, res) {
    // req.params.id gives us the if of post

    try {
        let post = await Post.findById(req.params.id)
    
        // .id is string
        // req.user.id gives us the id of logged in user
        // post.user is giving us the id of the user who created the post
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id}) 
            req.flash('success', 'Post Destroyed');
            return res.redirect('back');    
        } else {
            req.flash('error', 'You cannot delete this post');
            return res.redirect('back');
        }
        
        
        
    } catch(err){
        req.flash('error', err);
        // console.log("Error in post Controller, Destroy", err);
        return;
    }
    
    
    

    
    
}