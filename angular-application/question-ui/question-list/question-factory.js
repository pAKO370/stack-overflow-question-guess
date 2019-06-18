"use strict";

angular.module("app").factory("QuestionFactory", ["$http", "$q", function ($http, $q) {
    var factory = {};
    /** Gets all questions from stack overflow and database */
    factory.getQuestions = function () {
        var deferredResult = $q.defer();

        var deferSuccess = function (result) {
            /* Resolve the promise */
            deferredResult.resolve(result.data);
        };
        /* Local callback for error */
        var defercreateError = function (ex) {
            /* Reject the promise there was a problem */
            deferredResult.reject(ex.data);
        };
        $http({
            method: 'GET',
            url: '/api/questions'
        }).then(deferSuccess, defercreateError);
        return deferredResult.promise;
    };
    /** Gets all answers for a given question */
    factory.getAnswers = function (questionId) {
        var deferredResult = $q.defer();

        var deferSuccess = function (result) {
            /* Resolve the promise */
            deferredResult.resolve(result.data);
        };
        /* Local callback for error */
        var defercreateError = function (ex) {
            /* Reject the promise there was a problem */
            deferredResult.reject(ex.data);
        };
        $http({
            method: 'GET',
            url: `/api/answers/${questionId}`
        }).then(deferSuccess, defercreateError);
        return deferredResult.promise;
    };

    return factory;
}]);