const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();
const auth = require('../auth/authenticate')

//* Notes get requests 
router.get('/',Controller.start);
router.get('/notes',Controller.show);
router.get('/notes/:id',Controller.getNote);

//* Users get requests 
router.get('/register/',Controller.showUser);
router.get('/register/:id',Controller.getUser);
////////////////////////////////////

router.delete('/notes/:id',Controller.deleteNote);

////////////////////////////////////
router.patch('/notes/:id',Controller.patchNote);
router.post('/notes',auth,Controller.save);

router.post('/register',Controller.saveUser);
router.post('/login',auth,Controller.loginUser);
module.exports = router;

 