const ErrorHandler = require("../Utils/ErrorHandler");

module.exports = (err,req,res,next)=>{
    err.status =err.status||500;
    err.message = err.message||'Internal Server Error';

    if(err.name == 'CastError'){
        err = new ErrorHandler(`Resource Not Found , Invalid ${err.path}`,400);
    }

    if(err.code === 11000){
        err = new ErrorHandler(`${Object.keys(err.keyValue)} already Exists.`,400)
    }

    res.status(err.status).json({
        success:false,
        message:err.message
    })
}