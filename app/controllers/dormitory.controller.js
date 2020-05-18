const db = require("../models");
const Dormitory = db.dormitory;
const Op = db.Sequelize.Op;

// Create and Save a new Dormitory
exports.create = (req, res) => {
    // Validate request
    if (!req.body.dId) {
        res.status(400).send({
            message: "dId can not be empty!"
        });
        return;
    }

    // Create a Dormitory
    const dormitory = {
        dId: req.body.dId,
        peopleNum: req.body.peopleNum,
        accommodationCharge: req.body.accommodationCharge,
        telephone: req.body.telephone,
        flatId: req.body.flatId
    };

    // Save Dormitory in the database
    Dormitory.create(dormitory)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Dormitory."
            });
        });
};

// Retrieve all Flats from the database.
exports.findAll = (req, res) => {
    const dId = req.query.dId;
    var condition = dId ? { dId: { [Op.like]: `%${dId}%` } } : null;

    Dormitory.findAll({ where: condition })
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

// Find a single Dormitory with an dId
exports.findOne = (req, res) => {
    const dId = req.params.dId;

    Dormitory.findByPk(dId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Dormitory with dId=" + dId
            });
        });
};

// Update a Dormitory by the dId in the request
exports.update = (req, res) => {
    const dId = req.params.dId;

    Dormitory.update(req.body, {
        where: { dId: dId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Dormitory was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Dormitory with dId=${dId}. Maybe Dormitory was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Dormitory with dId=" + dId
            });
        });
};

// Delete a Dormitory with the specified dId in the request
exports.delete = (req, res) => {
    const dId = req.params.dId;

    Dormitory.destroy({
        where: { dId: dId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Dormitory was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Dormitory with dId=${dId}. Maybe Dormitory was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Dormitory with dId=" + dId
            });
        });
};

// Delete all Flats from the database.
exports.deleteAll = (req, res) => {
    Dormitory.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Flats were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all dormitory."
            });
        });
};

// // Find all published Flats
// exports.findAllPublished = (req, res) => {
//     Dormitory.findAll({ where: { published: true } })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving dormitory."
//             });
//         });
// };