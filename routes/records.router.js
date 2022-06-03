const express = require('express');
const router = express.Router();
const ctrl = require('../routes.ctrl/records.ctrl')
const auth = require('../middlewares/authentication')


router.get('/now', ctrl.getRecordsNow)





module.exports = router;