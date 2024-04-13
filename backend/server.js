const connectDB = require('./Config/database');
const app = require('./app')

//config.env
if(process.env.NODE_ENV !== 'PRODUCTION'){
    require('dotenv').config({path:"backend/Config/.env"});
}

connectDB()

//Uncaught Error
process.on('uncaughtException',err=>{
    console.log(`message:${err.message}`);
    console.log('Shutting down the server due to the Unhandled Promise Rejection');
    process.exit(1);
})

//port 
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})

//Unhandled promise rejection
process.on("unhandledRejection",err=>{
    console.log(`message:${err.message}`);
    console.log('Shutting down the server due to the Unhandled Promise Rejection');
    server.close(()=>{
        process.exit(1);
    })
})