let recordsCtrl = {};
const Record = require('../models/Records');


recordsCtrl.getRecordsNow = async(req, res)=> {
    try {
        const ahoramismo = await Record.findAll({where: {horaFin: null}});
        return res.status(200).json(ahoramismo);
    } catch (error) {
        return res.status(500).json({msg: "Error", error: error.toString()})
    }
}

module.exports = recordsCtrl;