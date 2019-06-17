"use-strict";
const Sequelize = require("sequelize");
var Config = require("./../config");
const Mysql = require("mysql2");
/**  File for database creation using sequelize */

/***
 * 
 *  Using sequlize for table creation. Mysql commands should be used for database queries. 
 * 
 */

var initDatabase = function () {
    /** Method to initialize sequelize and create tables */
    function initSequelize() {
        return new Promise(function (fulfill, reject) {
            const sequelize = new Sequelize(Config.mysqlDatabaseName, Config.mysqlUser, Config.mysqlPassword, {
                host: Config.mysqlHost,
                dialect: "mysql"
            });
            sequelize
                .authenticate()
                .then(function (result) {
                    var model = require("./models/question");
                    sequelize.define(model.modelName, model.modelColumns, model.modelOptions);
                    return sequelize.sync();
                })
                .then(function () {
                    console.log('Connection has been established successfully.');
                    global.databaseConnection = sequelize;
                    fulfill();
                })
                .catch(function (ex) {
                    console.error('Unable to connect to the database:', ex);
                    reject(ex);
                });
        })
    }
    /** Method create the database that will be used for this project */
    function createNewDatabase() {
        return new Promise(function (fulfill, reject) {
            var mysqlConnection = new Mysql.createConnection({
                host: Config.mysqlHost,
                user: Config.mysqlUser,
                password: Config.mysqlPassword,
                database: "mysql"
            });
            mysqlConnection.query("CREATE DATABASE IF NOT EXISTS `" + Config.mysqlDatabaseName + "`", function (ex) {
                if (ex) {
                    reject(ex);
                    return;
                } else {
                    mysqlConnection.close();
                    fulfill();
                    return;
                }
            });
        });
    };
    /** Public method used for creating database and syncing models using sequelize */
    this.createDatabaseAndInitSequelize = function () {
        return new Promise(function (fulfill, reject) {
            createNewDatabase()
                .then(function (result) {
                    return initSequelize();
                })
                .then(function(result){
                    fulfill(result);
                    return;
                })
                .catch(function (ex) {
                    reject(ex);
                    return;
                })
        });
    }
};

module.exports = initDatabase;