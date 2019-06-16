"use-strict";
/** Required libraries for the app to run */
const express = require('express')
const app = express();

/**
 *  Routes for getting and saving questions
 */
app.use("/api/questions", require("./api-routes/question-api"));
app.use(express.static("./angular-application"));

/*app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('angular-appliation' + '/index.html', { root: __dirname });
});
/** Starts a node server  */
app.listen("3000", function () {
    console.log("Listening on 3000");
    /** After server is started, create database and initialize sequlize */
    const DataBaseInit = require("./database-configuration/database-creation");
    var databaseInit = new DataBaseInit();
    databaseInit.createDatabaseAndInitSequelize()
        .then(function (result) {
            console.log("test");
        })
        .catch(function (ex) {
            console.log("test");
        })
});