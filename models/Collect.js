const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Collect extends Model {}

//The posts model
//Contains an id (int), a name, description, tag, the date uploaded, and the user who posted it
Collect.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    collectName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageTag: {
        type: DataTypes.STRING,
    },
    dateCreated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
    },
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'collect',
});

module.exports = Collect;