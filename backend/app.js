const express = require('express')
const errorMiddlewares = require('./Middlewares/error')
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const corsConfig = {
    origin: true,
    credentials: true,
};
  
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended:true}));
app.use(express.json());


//router import
const userRouter = require('./Routers/UserRouter')
const portfolioRouter = require('./Routers/PortfolioRouter')


// Using Routers
app.use('/api/v1/user',userRouter);
app.use('/api/v1/portfolio',portfolioRouter);


// Middlewares
app.use(errorMiddlewares)

module.exports = app;