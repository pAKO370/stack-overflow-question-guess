const Express = require("express");
const Router = Express.Router();
const Request = require("request-promise");

/** Endpoint for getting all questions */
Router.get("/", function (req, res) {
  __getAllQuestions()
    .then(function (result) {
      res.status(200).json(result);
    })
    .catch(function (ex) {
      res.status(400).json(ex)
    })
});
/** Endpoint for saving question */
Router.post("/", function (req, res) {
  __saveQuestion(req.body)
    .then(function (result) {
      res.status(200).json(result);
    })
    .catch(function (ex) {
      res.status(400).json(ex)
    })
});

/** Private method for asving and editing questions */
function __saveQuestion(question) {
  return new Promise(function (fulfill, reject) {
    var saveObject = {
      questionData: JSON.stringify(question)
    };
    /** Using sequelize for basic CRUD due to ease of use */
    /** If the incoming question has an id, it has been created already so it needs to be updated. Id it is a new question, it will be created */
    if (question && question.id) {
      global.databaseConnection.models.questionsGuessed.update(saveObject, { where: { id: question.id } })
        .then(function (result) {
          fulfill(result);
          return;
        })
        .catch(function (ex) {
          reject(ex);
          return;
        })
    } else {
      global.databaseConnection.models.questionsGuessed.create(saveObject)
        .then(function (result) {
          fulfill(result);
          return;
        })
        .catch(function (ex) {
          reject(ex);
          return;
        })
    }
  });
}
/** Takes the data retrieved from the database and maps into an object that mimicks the stack question object */
function __mapQuestionData(questions) {
  var returnArray = [];
  if (questions && questions.length > 0) {
    for (var x = 0; x < questions.length; x++) {
      var tempObject = JSON.parse(questions[x].dataValues.questionData);
      tempObject.id = questions[x].dataValues.id;
      returnArray.push(tempObject);
    }
  }
  return returnArray;
}
/**
 *  Method to get questions with accepted answers
 */
function __getAllQuestions() {
  return new Promise(function (fulfill, reject) {
    var returnObject = {
      newQuestions: [],
      savedQuestions: []
    }
    var requestObject = {
      method: "GET",
      uri: `https://api.stackexchange.com/2.2/search/advanced?accepted=True&answers=12&site=stackoverflow`,
      headers: {
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip"
      },
      gzip: true,
      json: true
    };
    Request(requestObject)
      .then(function (result) {
        returnObject.newQuestions = result.items;
        return global.databaseConnection.models.questionsGuessed.findAll();
      })
      .then(function (results) {
        returnObject.savedQuestions = __mapQuestionData(results);
        fulfill(returnObject);
        return;
      })
      .catch(function (ex) {
        reject(ex);
        return;
      })
  });
}

module.exports = Router;