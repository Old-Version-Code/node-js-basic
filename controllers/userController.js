const asyncHanlder = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');



//@ User create for blog page
//@router  POST /api/users/register
//@access public
const registerUser = asyncHanlder(async(req, res)=>{
    const { username, email, mobile, password } = req.body;
    if(!username || !email || !mobile || !password){
        res.status(400);
        throw new Error("All fields are mandatory.!")
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered.!");
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("This is hashedPassword" , hashedPassword);
    const user = await User.create({
        username,
        email,
        mobile,
        password:hashedPassword,
    });

    console.log(`User Created"  ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }else{
        res.status(400);
        throw new Error("User data not valid.!");
    }
    res.json({message:"Register the user"})
});



//@ User login write for blog page
//@router  Get /api/users/login
//@access public
const loginUser = asyncHanlder(async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory.!");
    }

    const user = await User.findOne({email});
    //compare password with hashedPassword
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                mobile: user.mobile,
                id: user.id,
            },
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}
        );
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
});


//@ User current time for blog page
//@router  Get /api/users/current
//@access private
const currentUser = asyncHanlder(async(req, res)=>{
    res.json(req.user);
});



module.exports = { registerUser, loginUser, currentUser}