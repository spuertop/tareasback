let customerCtrl = {};
const Customers = require('../models/Customers');
const Workplace = require('../models/Workplace');

//router.get('/all', ctrl.getAll)
customerCtrl.getAll = async (req, res) => {
    //Get all incluyendo soft-deleted
    try {
        const allCustomers = await Customers.findAll({ 
            attributes: ['id', 'name', 'deletedAt'], 
            include: [{model:Workplace, attributes: ['id', 'name', 'deletedAt'], through: {attributes: []}}],
            paranoid: false 
        });
        return res.status(200).json(allCustomers);
    } catch (error) {
        console.log(error)
        return res.status(403).json({ msg: "Error", error: error.toString() })
    }
}

//router.post('/new', ctrl.postnewCustomer);
customerCtrl.postnewCustomer = async (req, res) => {
    console.log(req.body) //{name}
    let ob = req.body;
    try {
        const newCostumer = await Customers.create({ name: ob.name });
        if (!ob.deletedAt) {
            await Customers
        .destroy({ where: { id: newCostumer.id }}); //Paranoid destruction
        }
        let answer = await Customers
    .findByPk(newCostumer.id, { paranoid: false });
        return res.status(200).json(answer);
    } catch (error) {
        return res.status(403).json({ msg: "Error", error: error.toString() })
    }
}

//router.delete('/delete/:id', ctrl.deleteCustomer);
customerCtrl.deleteCustomer = async (req, res) => {
    let ob = {id: req.params.id};
    console.log(ob)
    try {
        let answer = await Customers.destroy({ where: { id: ob.id }, force: true });
        return res.status(200).json(answer);
    } catch (error) {
        console.log(error)
        return res.status(403).json({ msg: "Error", error: error.toString() })
    }
}

//router.put('/update', ctrl.updateCustomer);
customerCtrl.updateCustomer = async (req, res) => {
    let ob = req.body;
    try {
        await Customers.restore({ where: { id: ob.id }});
        await Customers.update({name: ob.name}, {where: { id: ob.id }});
        let customer = await Customers.findByPk(ob.id);
        
        //New Workplaces
        let frontWorkPlacesList = [];
        ob.workplaces.forEach(item => frontWorkPlacesList.push(item.id));

        //Old Workplaces
        let workplacesOfCustore = await customer.getWorkplaces();
        let backWorkPlacesList = [];
        workplacesOfCustore.forEach(item => backWorkPlacesList.push(item.dataValues.id))

        //Add new workplaces
        for(let i = 0; i < ob.workplaces.length; i++){
            await customer.addWorkplace(await Workplace.findByPk(ob.workplaces[i].id));
            //await answer.removeCustomer(await Customer.findByPk(1))
        }
        //Delete absent workplaces
        for(let i = 0; i < backWorkPlacesList.length; i++){
            if(!frontWorkPlacesList.includes(backWorkPlacesList[i])){
                await customer.removeWorkplace(await Workplace.findByPk(backWorkPlacesList[i]))
            }
        }

        if (!ob.deletedAt) { //Si petición dice desactivado
            await Customers.destroy({ where: { id: ob.id  }});
        }
        let answer = await Customers.findOne({ where: { id: ob.id }, paranoid: false });       
        return res.status(200).json(answer);
    } catch (error) {
        console.log(error)
        return res.status(403).json({ msg: "Error", error: error.toString() })
    }
}


module.exports = customerCtrl;