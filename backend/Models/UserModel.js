const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const { generateOTP } = require('../Utils/Helper')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Username must be required.'],
        maxLength:[30,'Name must be less than 30 characters']
    },
    email:{
        type:String,
        required:[true,"User Email must be required."],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"User Password must be required."],
        minLength:[8,"Password must be more than 8 characters."],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    timeStamp:Number,
    resetPasswordToken:String
})

//Converting Password Hash
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await  bcrypt.hash(this.password,10);
    this.resetPasswordToken = ''
})

//Compare Password
userSchema.methods.comparePassword = async function(pass){
    return bcrypt.compare(pass,this.password);
}
//Reset Password Token
userSchema.methods.getResetPasswordToken = async function(length=5){
    const resetPasswordToken = generateOTP(length);

    // hashing 
    const encode = await  bcrypt.hash(resetPasswordToken,10);
    this.resetPasswordToken = encode;
    this.save()
    return resetPasswordToken;
}
//Compare OTP
userSchema.methods.compareOTP = async function(otp){
    return bcrypt.compare(otp,this.resetPasswordToken);
}

module.exports = mongoose.model('User',userSchema);