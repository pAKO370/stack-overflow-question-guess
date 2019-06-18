"use strict";

/* Controllers */

angular.module("app")
    .controller("QuestionAnswersModalController",
        ["$scope", "$http", "$modalInstance", "questionObject", "$sce", "toaster", "QuestionFactory",
            function ($scope, $http, $modalInstance, questionObject, $sce, toaster, QuestionFactory) {
                var answerScore = 10;
                /** Injected question object to use for getting answers */
                $scope.question = questionObject;
                /** Valriables to enable/disable the UI questions */
                var isNew = true;
                var isSolved = false;
                if ($scope.question && $scope.question.id) {
                    isNew = false;
                }
                if (!$scope.question.questionSolved) {
                    $scope.question.questionSolved = false;
                } else {
                    isSolved = true;
                }
                /** Sets style for display purposes */
                $scope.getStyle = function (index) {
                    if (index % 2 === 0) {
                        return { 'background-color': '#cbeced' };
                    } else {
                        return { 'background-color': '#667788' }
                    }
                };

                /** Gets answers for the given question */
                function getAnswers() {
                    /** If it is a new question, get the answers */
                    if (isNew) {
                        QuestionFactory.getAnswers($scope.question.question_id)
                            .then(function successCallback(response) {
                                $scope.question.answers = response.items;
                            }, function errorCallback(ex) {
                                toaster.pop("error", "Error retrieving answers", "");
                            });
                    }
                }

                /** Method to check if the guess is the accepted answer */
                $scope.checkForAcceptedAnswer = function (answer) {
                    if (!answer.isGuessed) {
                        answer.isGuessed = 0;
                    }
                    if (!$scope.question.questionSolved) {
                        answer.isGuessed += 1;
                        $scope.question.isGuessed = true;
                        if (answer.is_accepted) {
                            answer.isAccepted = true;
                            $scope.question.questionSolved = true;
                            toaster.pop("success", "That is the accepted answer", `Answer is worth ${answerScore} points!`);
                        } else {
                            if (answerScore > 1) {
                                answerScore -= 1;
                            }
                            toaster.pop("error", "That is not the accepted answer", "");
                        }
                    }
                };
                /** Closes the modal */
                $scope.closeModal = function () {
                    $modalInstance.close({ question: $scope.question, score: answerScore, isSolved: isSolved });
                }
                /** Calls the getAnswers method */
                getAnswers();
            }]);