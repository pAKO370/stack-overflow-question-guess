var Sequelize = require("sequelize");

const questionsReturned = {

    modelName: "questionsGuessed",
    /* The list of columns and their corresponding definitions */
    modelColumns: {
        id: {
            type: Sequelize.STRING(36),
            autoIncrement: false,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        questionData: {
            type: Sequelize.BLOB,
            allowNull: true
        }
    },
    modelOptions: {
        tableName: "questionsGuessed",
        charset: "latin1",
        freezeTableName: true,
        createdAt: "timeCreated",
        updatedAt: "timeUpdated",
        timestamps: true,
        paranoid: true,
        deletedAt: "timeDeleted"

    }

};

module.exports = questionsReturned;
