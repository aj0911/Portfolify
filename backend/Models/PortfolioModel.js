const mongoose = require('mongoose');

const PortfolioSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    designation:{
        name:{
            type:String,
            required:[true,'Designation Name is mandatory.']
        },
        years:{
            type:Number,
            required:[true,'Designation Experience Year is mandatory.']
        }
    },
    cv_url:{
        type:String,
        required:[true,'CV Url is mandatory.']
    },
    about:{
        type:String,
        required:[true,'About Content is mandatory.']
    },
    socials:{
        github:String,
        fb:String,
        linkedIn:String,
        twitter:String,
        phoneNo:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
    },
    services:[
        {
            name:{
                type:String,
                required:true
            },
            items:[{
                type:String,
                required:true
            }]
        }
    ],
    projects:[
        {
            name:{
                type:String,
                required:true
            },
            img_url:{
                type:String,
                required:true
            },
            desc:{
                type:String,
                required:true
            },
        }
    ],
    testimonials:[
        {
            name:{
                type:String,
                required:true
            },
            designation:{
                type:String,
                required:true
            },
            img_url:{
                type:String,
                required:true
            },
            desc:{
                type:String,
                required:true
            },
        }
    ],
    timeStamp:Number,
})

module.exports = mongoose.model('Portfolio',PortfolioSchema);

