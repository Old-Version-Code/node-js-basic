const mongoose = require('mongoose');


const blogSchema = mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },

    username:{
        type:String,
        required:[true, "Please add the blog page"],
    },

    category:{
        type:String,
        required:[true, "Please add the blog category"],
    },

    baseurl:{
        type:String,
        required:[true, "Please add the blog baseurl"],
    },

    title:{
        type:String,
        required:[true, "Please add the blog title"],
    },

    content:{
        type:String,
        required:[true, "Please add the blog content"],
    },

    userimage:{
        type:String,
        // required:[true, "Please add the blog category"],
    },
},
{
    timestamps:true,
}
);

module.exports = mongoose.model("Blog", blogSchema);
