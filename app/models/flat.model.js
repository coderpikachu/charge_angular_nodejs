module.exports = (sequelize, Sequelize) => {
    const Flat = sequelize.define("flat", {
        fId: {
            primaryKey: true,
            type: Sequelize.STRING,
            unique:true,
        },
        layers: {
            type: Sequelize.INTEGER
        },
        roomNum: {
            type: Sequelize.INTEGER
        },
        openTime:{
            type: Sequelize.TIME
        }
    });

    return Flat;
};