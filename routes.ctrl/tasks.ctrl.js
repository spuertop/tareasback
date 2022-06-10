let taskCtrl = {};
const Tasks = require('../models/Tasks');
const TasksGroups = require('../models/TasksGroups');

//ctrl FOR TASKS GROUPS
taskCtrl.getAllGroups = async(req, res) => { 
    try {
        const groups = await TasksGroups.findAll();
        return res.status(200).json(groups);
    } catch (error) {
        return res.status(403).json({ msg: "Error", error: error.toString() })
    }
}
taskCtrl.addGroup = async(req, res) => {
    try {
        const newGroup = await TasksGroups.create(req.body);
        return res.status(200).json(newGroup);
    } catch (error) {
        return res.status(403).json({ msg: "Error", error: error.toString() })
    }
}
taskCtrl.updateGroup = async(req, res) => { 
    console.log(req.body)
    try {
        await TasksGroups.update(req.body, {where: { id: req.body.id }});
        let updatedGroup = await TasksGroups.findByPk(req.body.id)
        return res.status(200).json(updatedGroup);
    } catch (error) {
        console.log(error)
        return res.status(403).json({ msg: "Error", error: error.toString() })
    }
}

taskCtrl.deleteGroup = async(req, res) => {
    let id = req.params.id;
    try {
        let answer = await TasksGroups.destroy({ where: {id}, force: true });
        return res.status(200).json(answer);
    } catch(error) {
        console.log(error)
        return res.status(403).json({ msg: "Error", error: error.toString() })
    } 
}
//ctrl FOR TASKS
taskCtrl.getAllTasks = async(req, res) => { 
    try {
        const tasks = await Tasks.findAll();
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(403).json({ msg: "Error", error: error.toString() })
    }
}
taskCtrl.addTaks = async(req, res) => { 
    try {
        const task = await Tasks.create(req.body);
        return res.status(200).json(task);
    } catch (error) {
        console.log(error)
        return res.status(403).json({ msg: "Error", error: error.toString() })
    }
}
taskCtrl.updateTask = async(req, res) => { 
    console.log(req.body)
    try {
        await Tasks.update(req.body, {where: { id: req.body.id }});
        let task = await Tasks.findByPk(req.body.id);
        console.log('Task returned', task);
        return res.status(200).json(task);
    } catch (error) {
        console.log(error)
        return res.status(403).json({ msg: "Error", error: error.toString() })
    }
}
taskCtrl.deleteTask = async(req, res) => { 
    let id = req.params.id;
    try {
        let answer = await Tasks.destroy({ where: {id}, force: true });
        return res.status(200).json(answer);
    } catch(error) {
        console.log(error)
        return res.status(403).json({ msg: "Error", error: error.toString() })
    } 
}

/** SNIPPETS */

//router.get('/all', ctrl.getAll)
taskCtrl.getAll = async (req, res) => {
    //Get all incluyendo soft-deleted
    try {
        const allCustomers = await Tasks.findAll({ 
            attributes: ['id', 'name', 'deletedAt'], 
            include: [{model:TasksGroups, attributes: ['id', 'name', 'deletedAt'], through: {attributes: []}}],
            paranoid: false 
        });
        return res.status(200).json(allCustomers);
    } catch (error) {
        console.log(error)
        return res.status(403).json({ msg: "Error", error: error.toString() })
    }
}

taskCtrl.postnewCustomer = async (req, res) => {
    console.log(req.body) //{name}
    let ob = req.body;
    try {
        const newCostumer = await Tasks.create({ name: ob.name });
        let answer = await Tasks.findByPk(newCostumer.id, { paranoid: false });
        return res.status(200).json(answer);
    } catch (error) {
        return res.status(403).json({ msg: "Error", error: error.toString() })
    }
}

//router.delete('/delete/:id', ctrl.deleteCustomer);
taskCtrl.deleteCustomer = async (req, res) => {
    let ob = {id: req.params.id};
    console.log(ob)
    try {
        let answer = await Tasks.destroy({ where: { id: ob.id }, force: true });
        return res.status(200).json(answer);
    } catch (error) {
        console.log(error)
        return res.status(403).json({ msg: "Error", error: error.toString() })
    }
}

//router.put('/update', ctrl.updateCustomer);
taskCtrl.updateCustomer = async (req, res) => {
    let ob = req.body;
    try {
        await Tasks.restore({ where: { id: ob.id }});
        await Tasks.update({name: ob.name}, {where: { id: ob.id }});
        let customer = await Tasks.findByPk(ob.id);
        
        //New Workplaces
        let frontWorkPlacesList = [];
        ob.workplaces.forEach(item => frontWorkPlacesList.push(item.id));

        //Old Workplaces
        let workplacesOfCustore = await customer.getWorkplaces();
        let backWorkPlacesList = [];
        workplacesOfCustore.forEach(item => backWorkPlacesList.push(item.dataValues.id))

        //Add new workplaces
        for(let i = 0; i < ob.workplaces.length; i++){
            await customer.addWorkplace(await TasksGroups.findByPk(ob.workplaces[i].id));
            //await answer.removeCustomer(await Customer.findByPk(1))
        }
        //Delete absent workplaces
        for(let i = 0; i < backWorkPlacesList.length; i++){
            if(!frontWorkPlacesList.includes(backWorkPlacesList[i])){
                await customer.removeWorkplace(await TasksGroups.findByPk(backWorkPlacesList[i]))
            }
        }

        if (!ob.deletedAt) { //Si petición dice desactivado
            await Tasks.destroy({ where: { id: ob.id  }});
        }
        let answer = await Tasks.findOne({ where: { id: ob.id }, paranoid: false });       
        return res.status(200).json(answer);
    } catch (error) {
        console.log(error)
        return res.status(403).json({ msg: "Error", error: error.toString() })
    }
}


module.exports = taskCtrl;