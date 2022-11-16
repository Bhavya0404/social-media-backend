const mongoose = require('mongoose')


const commentSchema = mongoose.Schema({
    comments: {
        type: String,
        required: true,
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }
}, {
    timestamps: true
})

const comment = mongoose.model('comment', commentSchema);
module.exports = comment;