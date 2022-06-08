const express = require('express');
const router = express.Router();
const ctrl = require('../routes.ctrl/customers.ctrl')
const auth = require('../middlewares/authentication')


router.get('/all', ctrl.getAll)
router.post('/new', ctrl.postnewCustomer);
router.delete('/delete/:id', ctrl.deleteCustomer);
router.put('/update', ctrl.updateCustomer);


module.exports = router;