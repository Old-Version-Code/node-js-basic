const asyncHanlder = require("express-async-handler");
const Blog = require('../models/blogModel');

//@ Get all blog page
//@router  Get /api/blogs
//@access private
const getBlogs = asyncHanlder(async(req, res) => { 
    const blogs = await Blog.find({ user_id: req.user.id});
    res.status(200).json(blogs);
});


//@ Get create New blog page
//@router  POST /api/blogs
//@access private
const createBlog = asyncHanlder(async(req, res) => { 
    console.log("This is BlogPost Data", req.body);
    const {username, category, baseurl, title, content, userimage}= req.body;
    if(!username || !category || !baseurl || !title || !content || !userimage){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const blog = await Blog.create({
        username,
        category,
        baseurl,
        title,
        content,
        userimage,
        user_id: req.user.id
    });
    res.status(200).json(blog);
});


//@ Get Get blog page by id
//@router  POST /api/blogs/:id
//@access private
const getBlog = asyncHanlder(async(req, res) => { 
    const blog = await Blog.findById(req.params.id);
    if(!blog){
        res.status(404);
        throw new Error("Blog Pages not found Please Move to Main menu")
    }
    res.status(200).json(blog);
});


//@ Get Update blog page by id
//@router  PUT /api/blogs/:id
//@access private
const updateBlog = asyncHanlder(async(req, res) => { 
    const blog = await Blog.findById(req.params.id);
    if(!blog){
        res.status(404);
        throw new Error("Blog Pages not found Please Move to Main menu");
    }

    if(blog.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user blogs page");
    }
    
    const updateBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updateBlog);
});

//@ Get DELETE blog page by id
//@router  DELETE /api/blogs/:id
//@access private
const deleteBlog = asyncHanlder(async(req, res) => { 
    const blog = await Blog.findById(req.params.id);
    if(!blog){
        res.status(404);
        throw new Error("Blog Pages not found Please Move to Main menu");
    }

    if(blog.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user blogs page");
    }

    await Blog.deleteOne({_id: req.params.id});

    res.status(200).json(blog);
});



module.exports  = {getBlogs, createBlog, getBlog, updateBlog, deleteBlog};