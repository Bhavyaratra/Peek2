const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controler');

router.get('/',Controller.start);
router.get('/notes',Controller.show);
router.get('/notes/:id',Controller.getNote);
////////////////////////////////////

router.delete('/notes/:id',Controller.deleteNote);
router.put('/notes/:id',Controller.updateNote);

////////////////////////////////////
router.post('/notes',Controller.save);

module.exports = router;

 