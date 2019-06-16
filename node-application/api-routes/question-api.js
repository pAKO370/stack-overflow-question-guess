const Express = require("express");
const Router = Express.Router();
const Request = require("request-promise");
const { gzip, ungzip } = require('node-gzip');

Router.get("/", function (req, res) {
  console.log("test");
  __getAllQuestions()
    .then(function (result) {
      res.status(200).json(result);
    })
    .catch(function (ex) {
      res.status(400).json(ex)
    })
});

/**
 *  Method to get questions with accepted answers
 */
function __getAllQuestions() {
  return new Promise(function (fulfill, reject) {
    var requestObject = {
      method: "GET",
      uri: `https://api.stackexchange.com/2.2/search/advanced?accepted=True&order=desc&sort=creation&site=stackoverflow`,
      headers: {
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip"
      },
      gzip: true,
      json: true
    };
    Request(requestObject)
      .then(function (result) {
        fulfill(result);
        return;
      })
      .catch(function (ex) {
        reject(ex);
        return;
      })
  })
}
module.exports = Router;