const express = require('express');
const router = express.Router();
const ctrl = require('../routes.ctrl/tasks.ctrl')
const auth = require('../middlewares/authentication')

//ROUTES FOR TASKS GROUPS
router.get('/groups', ctrl.getAllGroups);
router.post('/groups', ctrl.addGroup);
router.put('/groups', ctrl.updateGroup);
router.delete('/groups/:id', ctrl.deleteGroup);

//ROUTES FOR TASKS
router.get('/tasks', ctrl.getAllTasks);
router.post('/tasks', ctrl.addTaks);
router.put('/tasks', ctrl.updateTask);
router.delete('/tasks/:id', ctrl.deleteTask);

module.exports = router;