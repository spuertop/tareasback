let customerCtrl = {};
const Customers = require('../models/Customers');

//router.get('/all', ctrl.getAll)
customerCtrl.getAll = async (req, res) => {
    //Get all incluyendo soft-deleted
    try {
        const allWorkPlaces = await Customers.findAll({ paranoid: false });
        return res.status(200).json(allWorkPlaces);
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
        const newWorkPlace = await Customers.create({ name: ob.name });
        if (!ob.deletedAt) {
            await Customers
        .destroy({ where: { id: newWorkPlace.id }}); //Paranoid destruction
        }
        let answer = await Customers
    .findByPk(newWorkPlace.id, { paranoid: false });
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
    console.log(ob)
    try {
        await Customers.restore({ where: { id: ob.id }});
        await Customers.update({name: ob.name}, {where: { id: ob.id }});

        if (!ob.deletedAt) { //Si petición dice desactivado
            await Customers.destroy({ where: { id: ob.id  }});
        }
        let answer = await Customers.findOne({ where: { id: ob.id }, paranoid: false });       
        return res.status(200).json(answer);
    } catch (error) {
        return res.status(403).json({ msg: "Error", error: error.toString() })
    }
}


module.exports = customerCtrl;