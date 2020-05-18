module.exports = (sequelize, Sequelize) => {
    const Dormitory = sequelize.define("dormitory", {
        dId: {
            primaryKey: true,
            type: Sequelize.STRING,
            unique: true,
        },
        peopleNum: {
            type: Sequelize.INTEGER
        },
        accommodationCharge: {
            type: Sequelize.DOUBLE
        },
        telephone: {
            type: Sequelize.STRING
        },
    });

    return Dormitory;
};