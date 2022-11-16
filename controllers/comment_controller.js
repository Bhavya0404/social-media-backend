const Comment = require('../models/comments')
const Post = require('../models/post')


module.exports.create = async function(req, res){
    try {
        let post = await Post.findById(req.body.postid) 
        if(post){
            let comment = await Comment.create({
                comments: req.body.content,
                user: req.user._id,
                post: req.body.postid,
            })
                
            // Updating comments in posts schema
            post.comments.push(comment);
            post.save();

            res.redirect('/');
        
        }
    } catch(err){
        console.log("Error in comment Controller, create", err);
        return;
    }
        
   
}

module.exports.destroy = async function(req, res) {

    try {
        let comment = await Comment.findById(req.params.id)
        if(comment.user == req.user.id){
            let postId = comment.post;

            comment.remove();

            await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}) 
        } 
        return res.redirect('back');
    } catch(err) {
        console.log("error in comment controller, destroy", err);
        return;
    }
}