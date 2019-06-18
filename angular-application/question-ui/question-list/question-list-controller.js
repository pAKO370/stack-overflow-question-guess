"use strict";

/* Controllers */

angular.module("app")
    .controller("QuestionListController",
        ["$scope", "$http", "$modal", "QuestionFactory", "toaster",
            function ($scope, $http, $modal, QuestionFactory, toaster) {
                /** Boolean scope variable for displaying questions */
                $scope.isNew = true;
                /** Method to set styles on odd/even rows */
                $scope.getStyle = function (index) {
                    if (index % 2 === 0) {
                        return { 'background-color': '#6e8ab7', 'cursor': 'pointer' };
                    } else {
                        return { 'background-color': '#bac3d3', 'cursor': 'pointer' }
                    }
                };
                $scope.currentScore = 0;
                /**
                 *  Method to open modal for question answers
                 */
                $scope.openModal = function (questionObject) {
                    var modalInstance = $modal.open({
                        templateUrl: "question-ui/question-list/modal/question-answers-modal.html",
                        controller: "QuestionAnswersModalController",
                        size: 'lg',
                        resolve: {
                            questionObject: function () {
                                return questionObject;
                            }
                        }
                    });
                    modalInstance.result.then(function (result) {
                        $scope.questionsArray = [];
                        if (!result.isSolved) {
                            result = result;
                            $http.post('/api/questions', JSON.stringify(result.question), { headers: { 'Content-Type': 'application/json' } })
                                .then(function successCallback(response) {
                                    if (result.question.questionSolved) {
                                        $scope.currentScore += result.score;
                                    }
                                    getAllQuestions();
                                }, function errorCallback(response) {
                                    toaster.pop("danger", "Error saving result", "");
                                });
                        }
                    });
                }

                function removeAttemptedQuestions(questions) {
                    var returnArray = [];
                    for (var newIndex = 0; newIndex < questions.newQuestions.length; newIndex++) {
                        var noMatch = true;
                        for (var existingIndex = 0; existingIndex < questions.savedQuestions.length; existingIndex++) {
                            if (questions.newQuestions[newIndex].question_id === questions.savedQuestions[existingIndex].question_id) {
                                noMatch = false;
                            }
                        }
                        if (noMatch) {
                            returnArray.push(questions.newQuestions[newIndex]);
                        }
                    }
                    return returnArray;
                }
                /**  Get all Questions */
                function getAllQuestions() {
                    QuestionFactory.getQuestions()
                        .then(function successCallback(response) {
                            $scope.questionsArray = removeAttemptedQuestions(response);
                            $scope.attemptedQuestion = response.savedQuestions;

                        }, function errorCallback(response) {
                            toaster.pop("danger", "Error retrieving questions", "");
                        });
                }
                /** Call method to get questions */
                getAllQuestions();
            }
        ]);