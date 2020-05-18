const db = require("../models");
const Flat = db.flat;
const Op = db.Sequelize.Op;

// Create and Save a new Flat
exports.create = (req, res) => {
    // Validate request
    if (!req.body.fId) {
        res.status(400).send({
            message: "fId can not be empty!"
        });
        return;
    }

    // Create a Flat
    const flat = {
        fId:req.body.fId,
        layers: req.body.layers,
        peopleNum: req.body.peopleNum,
        roomNum: req.body.roomNum,
        openTime: req.body.openTime,
    };

    // Save Flat in the database
    Flat.create(flat)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Flat."
            });
        });
};

// Retrieve all Flats from the database.
exports.findAll = (req, res) => {
    const fId = req.query.fId;
    var condition = fId ? { fId: { [Op.like]: `%${fId}%` } } : null;

    Flat.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving flat."
            });
        });
};

// Retrieve all FlatIds from the database.
exports.findAllIds = (req, res) => {
    const fId = req.query.fId;
    var condition = fId ? { fId: { [Op.like]: `%${fId}%` } } : null;

    Flat.findAll({ where: condition ,attributes:['fId']})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving dormitory."
            });
        });
};

// Find a single Flat with an fId
exports.findOne = (req, res) => {
    const fId = req.params.fId;

    Flat.findByPk(fId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Flat with fId=" + fId
            });
        });
};

// Update a Flat by the fId in the request
exports.update = (req, res) => {
    const fId = req.params.fId;

    Flat.update(req.body, {
        where: { fId: fId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Flat was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Flat with fId=${fId}. Maybe Flat was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Flat with fId=" + fId
            });
        });
};

// Delete a Flat with the specified fId in the request
exports.delete = (req, res) => {
    const fId = req.params.fId;

    Flat.destroy({
        where: { fId: fId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Flat was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Flat with fId=${fId}. Maybe Flat was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Flat with fId=" + fId
            });
        });
};

// Delete all Flats from the database.
exports.deleteAll = (req, res) => {
    Flat.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Flats were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all flat."
            });
        });
};

// // Find all published Flats
// exports.findAllPublished = (req, res) => {
//     Flat.findAll({ where: { published: true } })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving flat."
//             });
//         });
// };