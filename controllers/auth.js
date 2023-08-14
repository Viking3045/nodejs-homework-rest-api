const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {nanoid} = require("nanoid")
const gravatar = require("gravatar");
const {User} = require("../models/user");
const path = require("path");
const fs = require("fs/promises");
const {HttpError,sendEmail, ctrlWrapper} = require("../helpers");
const Jimp = require("jimp");

const {SECRET_KEY, BASE_URL} = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars")

const register = async(req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});

if(user){
    throw HttpError(409, "Email in use")
}

const hashPassword = await bcrypt.hash(password, 10);
const verificationToken = nanoid();


const avatarUrl = gravatar.url(email);

    const newUser = await User.create({...req.body, password:hashPassword, verificationToken, avatarUrl});

    const verifyEmail = {
        to: email,
        subject: "Verify email success",
        html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}"> Click to verify email</a>`,
    }

    await sendEmail(verifyEmail)


res.status(201).json({
    user:{
        email: newUser.email,
        subscription: newUser.subscription
    }
   
})
}

 const verify = async(req, res)=>{
    const {verificationToken} = req.params;
    const user = await User.findOne({verificationToken})
    if(!user){
        throw HttpError(404, "User not found")
    }
    await User.findByIdAndUpdate(user._id,{verify:true, verificationToken:""})


    res.status(200).json({
            message: 'Verification successful',
    })
 }

 const resendVerify = async(req, res)=>{
    const {email} = req.body;
    const user = await User.findOne({email});

    if(!user){
        throw HttpError(400, "missing required field email")
    }
    if(user.verify){
        throw HttpError(400, "Verification has already been passed")
    }

    const verifyEmail = {
        to: email,
        subject: "Verify email success",
        html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}"> Click to verify email</a>`,
    }

    await sendEmail(verifyEmail)

    res.status(200).json({
        message: "Verification email sent"
      })
 }

const login = async(req,res) =>{
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(!user){
        throw HttpError(401, "Email or password is wrong")
    }

    if(!user.verify){
        throw HttpError(404, "Not verification")
    }



    const passwordCompare = await  bcrypt.compare(password, user.password);
    if(!passwordCompare){
        throw HttpError(401, "Email or password is wrong")
    }

    const payload ={
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"})
    
    await User.findByIdAndUpdate(user._id, {token});

    res.json({
        token,
        user:{
            email: user.email,
            subscription: user.subscription,
        }
    })
}

const getCurrent = async(req, res) => {
 const {email, subscription} = req.user

 res.json({
    email,
    subscription
})
}

const logout = async(req, res) => {
    const {_id} =req.user;
    await User.findByIdAndUpdate( _id, {token:""});

    res.status(204).json({
       message: "No Content"
    })
    // res.json({
    //     message: "oke"
    // })
}

const updateSubscription = async (req, res, next) => {
    const { _id } = req.user;
    const { subscription } = req.body;
    await User.findByIdAndUpdate(_id, { subscription });
  
    res.json({ _id, subscription,  });
  };

  const updateAvatar = async(req, res) =>{
    const {_id} =req.user;
    const {path:tempUpload, originalname} =req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    const rawAvatar = await Jimp.read(tempUpload);
    rawAvatar.resize(250, 250);
    await rawAvatar.writeAsync(tempUpload);

    await fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, {avatarUrl});

    res.json({
        avatarUrl,
    })
  }

module.exports = {
    register: ctrlWrapper(register),
    verify: ctrlWrapper(verify),
    resendVerify: ctrlWrapper(resendVerify),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar:ctrlWrapper(updateAvatar),
}

