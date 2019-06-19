"use strict";
/** Configuration values to be used in the applicaiton */
var configValues = {
    mysqlHost: "stack-overflow-project.c3nsipxp1bwk.us-east-1.rds.amazonaws.com",
    mysqlUser: "pfluegelcx",
    mysqlPassword: "6MvWaUGPp9B3DNsf",
    mysqlDatabaseName: "stack-project",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
};
module.exports = configValues;