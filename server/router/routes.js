const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controler');

router.get('/',Controller.start);

module.exports = router;

 