let workPlaceCtrl = {};
const Workplace = require('../models/Workplace');

workPlaceCtrl.getAll = async (req, res) => {
    //Get all incluyendo soft-deleted
    try {
        const allWorkPlaces = await Workplace.findAll({ paranoid: false });
        return res.status(200).json(allWorkPlaces);
    } catch (error) {
        return res.status(500).json({ msg: "Error", error: error.toString() })
    }
}

workPlaceCtrl.postnewWorkPlace = async (req, res) => {
    console.log(req.body) //{name, active}
    let ob = req.body;
    try {
        await Workplace.create({ name: ob.name });
        if (!ob.active) {
            const newPlace = await Workplace.findByPk(ob.name);
            await Workplace.destroy({ where: { code: newPlace.code }}); //Paranoid destruction
        }
        let answer = await Workplace.findByPk(ob.name, { paranoid: false });
        return res.status(200).json(answer);
    } catch (error) {
        return res.status(500).json({ msg: "Error", error: error.toString() })
    }
}


workPlaceCtrl.deleteWorkPlace = async (req, res) => {
    let ob = req.body;
    try {
        let answer = await Workplace.destroy({ where: { code: ob.code }, force: true });
        return res.status(200).json(answer);
    } catch (error) {
        return res.status(500).json({ msg: "Error", error: error.toString() })
    }
}

workPlaceCtrl.updateWorkPlace = async (req, res) => {
    let ob = req.body;
    try {
        await Workplace.restore({ where: { code: ob.code }});
        await Workplace.update({name: ob.name}, {where:{code: ob.code}});

        if (!ob.active) { //Si petición dice desactivado
            await Workplace.destroy({ where: { code: ob.code }});
        }
        let answer = await Workplace.findOne({ where: { code: ob.code }, paranoid: false });       
        return res.status(200).json(answer);
    } catch (error) {
        return res.status(500).json({ msg: "Error", error: error.toString() })
    }
}


module.exports = workPlaceCtrl;