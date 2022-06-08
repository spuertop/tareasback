let workPlaceCtrl = {};
const Workplace = require('../models/Workplace');

workPlaceCtrl.getAll = async (req, res) => {
    //Get all incluyendo soft-deleted
    try {
        const allWorkPlaces = await Workplace.findAll({ paranoid: false });
        return res.status(200).json(allWorkPlaces);
    } catch (error) {
        console.log(error)
        return res.status(403).json({ msg: "Error", error: error.toString() })
    }
}

workPlaceCtrl.postnewWorkPlace = async (req, res) => {
    //console.log(req.body) //{name}
    let ob = req.body;
    try {
        const newWorkPlace = await Workplace.create({ name: ob.name });
        if (!ob.deletedAt) {
            await Workplace.destroy({ where: { id: newWorkPlace.id }}); //Paranoid destruction
        }
        let answer = await Workplace.findByPk(newWorkPlace.id, { paranoid: false });
        return res.status(200).json(answer);
    } catch (error) {
        return res.status(403).json({ msg: "Error", error: error.toString() })
    }
}


workPlaceCtrl.deleteWorkPlace = async (req, res) => {
    let ob = {id: req.params.id};
    console.log(ob)
    try {
        let answer = await Workplace.destroy({ where: { id: ob.id }, force: true });
        return res.status(200).json(answer);
    } catch (error) {
        console.log(error)
        return res.status(403).json({ msg: "Error", error: error.toString() })
    }
}

workPlaceCtrl.updateWorkPlace = async (req, res) => {
    let ob = req.body;
    console.log(ob)
    try {
        await Workplace.restore({ where: { id: ob.id }});
        await Workplace.update({name: ob.name}, {where: { id: ob.id }});

        if (!ob.deletedAt) { //Si petición dice desactivado
            await Workplace.destroy({ where: { id: ob.id  }});
        }
        let answer = await Workplace.findOne({ where: { id: ob.id }, paranoid: false });       
        return res.status(200).json(answer);
    } catch (error) {
        return res.status(403).json({ msg: "Error", error: error.toString() })
    }
}


module.exports = workPlaceCtrl;