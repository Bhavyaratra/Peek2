const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controler');

router.get('/',Controller.start);
router.get('/notes',Controller.show);


////////////////////////////////////
router.post('/notes',Controller.save);

module.exports = router;

 