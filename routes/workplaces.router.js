const express = require('express');
const router = express.Router();
const ctrl = require('../routes.ctrl/workplaces.ctrl')
const auth = require('../middlewares/authentication')


router.get('/all', ctrl.getAll)
router.post('/new', ctrl.postnewWorkPlace);
router.delete('/delete/:id', ctrl.deleteWorkPlace);
router.put('/update', ctrl.updateWorkPlace);


module.exports = router;