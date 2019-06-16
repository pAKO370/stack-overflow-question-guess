


/**
 * 
 * Gets the answers for a given question id
 */
function __getAnswers(questionId) {
    return new Promise(function (fulfill, reject) {
        var requestAnswerObject = {
            method: "GET",
            uri: `https://api.stackexchange.com/2.2/questions/${answerIds}/answers?order=desc&sort=activity&site=stackoverflow&filter=withbody`,
            headers: {
                "Content-Type": "application/json",
                "Accept-Encoding": "gzip"
            },
            gzip: true,
            json: true
        };
        Request(requestAnswerObject)
            .then(function (result) {
                console.log(result);
            })
            .catch(function (ex) {

            });
    });
}
