"use-strict";
/** Required libraries for the app to run */
const express = require('express')
const app = express();
const BodyParser =  require("body-parser");
/**
 *  Routes for getting and saving questions
 */

 /** Body parser library to allow json in the request body */
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}) );
  
  
/** Serves up static content */
app.use(express.static("./angular-application"));

app.use("/api/questions", require("./api-routes/question-api"));
app.use("/api/answers", require("./api-routes/answer-api"));
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
            console.log("Database table created");
        })
        .catch(function (ex) {
            console.error(ex);
        })
});