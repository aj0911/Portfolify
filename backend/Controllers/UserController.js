const catchAsyncErrors = require("../Middlewares/catchAsyncErrors");
const UserModel = require("../Models/UserModel");
const ErrorHandler = require("../Utils/ErrorHandler");
const { sendEmail } = require("../Utils/Helper");

// Register
exports.register = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password,avatar} = req.body;
    const user = await UserModel.create({
        name,
        email,
        password,
        avatar,
        timeStamp:Date.now()
    })
    res.status(200).json({
        success:true,
        message:'Successfully Register',
        user
    })
})

// Get User
exports.getUser = catchAsyncErrors(async(req,res,next)=>{
    const {id} = req.params;
    const user = await UserModel.findById(id)
    res.status(200).json({
        success:true,
        message:'User Found Successfully',
        user
    })
})

// Login
exports.login = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return next( new ErrorHandler('Login Details is Mandatory',400));
    }
    //Finding user by email along with its password.
    const user = await UserModel.findOne({email}).select("+password");

    if(!user || !(await user.comparePassword(password))){
        return next( new ErrorHandler('Invalid Email or Password',401)); 
    }
    res.status(202).json({
        success:true,
        message:'Login Successfull',
        user
    })
})

// sendOTP
exports.sendOTP = catchAsyncErrors(async(req,res,next)=>{
    const {email} = req.body;
    const length = 5;
    if(!email){
        return next(new ErrorHandler('Email is mandatory',400));
    }
    const user = await UserModel.findOne({email});
    if(!user){
        return next(new ErrorHandler('Email is not Registered',400));
    }
    const otp = await user.getResetPasswordToken(length);
    const info = await sendEmail(email,
        `OTP From Portfolify`,
        `Your OTP to reset your passoword is ${otp}`)
    res.status(200).json({
        success:true,
        message:`OTP Sent to ${email} successfully.`,
        // info
    })
})

exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const {otp} = req.params;
    const {email,password, confirmPassword} = req.body;
    if(!password || !confirmPassword || !email){
        return next(new ErrorHandler('All the fields are mandatory',400));
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler('Password and Confirm Password must be same',402));
    }
    const user = await UserModel.findOne({email});
    if(!user){
        return next(new ErrorHandler('Email is not Registered',400));
    }
    if(!(await user.compareOTP(otp))){
        return next(new ErrorHandler('Invalid OTP',402));
    }
    user.password = password;
    user.resetPasswordToken = '';
    await user.save({
        validateBeforeSave:true
    })
    res.status(200).json({
        success:true,
        message:`Password Updated successfully`,
        user
    })
})