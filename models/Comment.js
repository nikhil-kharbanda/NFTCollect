const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

//The comment model
//A comment will include an id, the content, date created, and the user who posted it.
//Would also inlude which post it is attached to
Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateCreated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: "user",
            key: "id",
        },
    },
    collectId: {
        type: DataTypes.INTEGER,
        references: {
            model: "collect",
            key: "id",
        },
    },
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
});

module.exports = Comment;