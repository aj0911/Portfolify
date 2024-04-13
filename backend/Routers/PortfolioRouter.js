const express = require('express');
const { AddPortfolioData, UpdatePortfolioData, RemovePortfolioData, GetPortfolioData } = require('../Controllers/PortfolioController');

const router = express.Router()

router.post('/add',AddPortfolioData).put('/edit/:id',UpdatePortfolioData).delete('/delete/:id',RemovePortfolioData).get('/get/:id',GetPortfolioData)
module.exports = router;