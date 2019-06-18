
const Express = require("express");
const Router = Express.Router();
const Request = require("request-promise");

/* Gets question with answers */
Router.get("/:questionId", function(req,res){
    if(req.query && req.query.isExisting){
    __getAnswersFromDatabase(req.params.questionId)
    .then(function (result) {
        res.status(200).json(result);
      })
      .catch(function (ex) {
        res.status(400).json(ex)
      })
    } else {
        __getAnswers(req.params.questionId)
    .then(function (result) {
        res.status(200).json(result);
      })
      .catch(function (ex) {
        res.status(400).json(ex)
      })
    }
});

/**
 * 
 * Gets the answers for a given question id
 */
function __getAnswers(questionId) {
    return new Promise(function (fulfill, reject) {
        var requestAnswerObject = {
            method: "GET",
            uri: `https://api.stackexchange.com/2.2/questions/${questionId}/answers?order=desc&sort=activity&site=stackoverflow&filter=withbody`,
            headers: {
                "Content-Type": "application/json",
                "Accept-Encoding": "gzip"
            },
            gzip: true,
            json: true
        };
        Request(requestAnswerObject)
            .then(function (result) {
                fulfill(result);
                return;
            })
            .catch(function (ex) {
                reject(ex);
                return;
            });
    });
}


module.exports = Router;