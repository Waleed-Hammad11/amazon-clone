const User = require('../models/userModel')
const sendEmail = require('../utils/sendEmail')
const crypto = require(`crypto`)
const APIFeatures = require("../utils/apiFeatures");
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.register =catchAsync(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        role
    });

    const verificationToken = user.getVerificationToken();
    await user.save({ validateBeforeSave: false }); 

    const verifyUrl = `${req.protocol}://${req.get('host')}/api/auth/verifyemail/${verificationToken}`;

    const message = `please click on the link to activate the account \n\n ${verifyUrl}`;

    try {
        await sendEmail({
        email: user.email,
        subject:  `account activation`,
        message
        });

        res.status(200).json({
        success: true,
        data: 'email has been sent please check inbox'
        });
    } catch (err) {
        user.verificationToken = undefined;
        user.verificationTokenExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new AppError('Email could not be sent. Please try again later.', 500));
    }
}) 

exports.login =catchAsync(async function (req,res,next){

        const {password,email}=req.body
        if(!password || !email){
            return next(new AppError('Please provide email and password', 400));
        }

        const user = await User.findOne({email}).select('+password')
        const isMatch = await user.matchPassword(password)
        if(!user || isMatch ){
            return next(new AppError('Incorrect email or password', 401));
        }

        if (!user.isVerified) {
            return next(new AppError('Please verify your email first!', 401))
        }
        

        const token = user.getSignedJwtToken()

        res.status(200).json({success:true , token})

}) 


exports.verifyEmail =catchAsync(async (req, res, next) => {

    const verificationToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        verificationToken,
        verificationTokenExpire: { $gt: Date.now() } 
    });

    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400));
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;
    await user.save();

    const token = user.getSignedJwtToken();

    res.status(200).json({
        success: true,
        data: 'The account has been activated successfully',
        token
    });

}) 

