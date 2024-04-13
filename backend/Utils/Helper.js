const nodemailer = require('nodemailer')

exports.sendEmail = async(to,subject,text) =>{
      // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    service:process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_USER, 
      pass: process.env.MAIL_PASS, 
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.MAIL_USER, 
    to, 
    subject, 
    text
  });
  return info;
}

exports.generateOTP = (length)=>{
    let otp = '';
    for(let i=0;i<length;i++){
        otp+= Math.floor(Math.random()*10)
    }
    return otp;
}