var Sequelize = require("sequelize");

const questionsReturned = {

    modelName: "questions-returned",
    /* The list of columns and their corresponding definitions */
    modelColumns: {
        id: {
            type: Sequelize.STRING(36),
            autoIncrement: false,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        questionId: {
            type: String(255),
            allowNull: true
        }
    },
    modelOptions: {
        tableName: "questions-returned",
        charset: "latin1",
        freezeTableName: true,
        createdAt: "timeCreated",
        updatedAt: "timeUpdated",
        timestamps: true,
        paranoid: true,
        deletedAt: "timeDeleted"

    }

};
