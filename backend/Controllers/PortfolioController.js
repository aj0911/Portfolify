const catchAsyncErrors = require("../Middlewares/catchAsyncErrors");
const PortfolioModel = require("../Models/PortfolioModel");
const ErrorHandler = require("../Utils/ErrorHandler");

//Add Portfolio Data
exports.AddPortfolioData = catchAsyncErrors(async(req,res,next)=>{
    const {user,designation,cv_url,about,socials,services,testimonials,projects} = req.body;

    const data = await PortfolioModel.create({
        user,
        designation,
        cv_url,
        about,
        socials,
        services,
        projects,
        testimonials,
        timeStamp:Date.now()
    })

    res.status(200).json({
        success:true,
        message:'Data Added Successfully',
        data
    })
})

//Remove Portfolio Data
exports.RemovePortfolioData = catchAsyncErrors(async(req,res,next)=>{
    const {id} = req.params;
    const portfolioData = await PortfolioModel.findById(id);
    if(!portfolioData){
        return next(new ErrorHandler('No such data is present.',400))
    }
    await portfolioData.deleteOne();

    res.status(200).json({
        success:true,
        message:'Data Deleted Successfully',
        portfolioData
    })
})

//Update Portfolio Data
exports.UpdatePortfolioData = catchAsyncErrors(async(req,res,next)=>{
    const {id} = req.params;
    const {designation,cv_url,about,socials,services,testimonials,projects} = req.body;
    const portfolioData = await PortfolioModel.findById(id);
    if(!portfolioData){
        return next(new ErrorHandler('No such data is present.',400))
    }
    portfolioData.designation = designation;
    portfolioData.cv_url = cv_url;
    portfolioData.about = about;
    portfolioData.socials = socials;
    portfolioData.services = services;
    portfolioData.testimonials = testimonials;
    portfolioData.projects = projects;
    await portfolioData.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
        message:'Data Updated Successfully',
        portfolioData
    })
})

//Get Portfolio Data
exports.GetPortfolioData = catchAsyncErrors(async(req,res,next)=>{
    const {id} = req.params;
    const portfolioData = await PortfolioModel.findById(id);
    if(!portfolioData){
        return next(new ErrorHandler('No such data is present.',400))
    }

    res.status(200).json({
        success:true,
        message:'Data Fetched Successfully',
        portfolioData
    })
})