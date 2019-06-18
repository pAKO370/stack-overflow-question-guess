"use strict";

/* Controllers */

angular.module("app")
    .controller("QuestionAnswersModalController",
        ["$scope", "$http", "$modalInstance", "questionObject", "$sce", "toaster","QuestionFactory",
            function ($scope, $http, $modalInstance, questionObject, $sce, toaster,QuestionFactory) {
                var answerScore = 10;
                /** Injected question object to use for getting answers */
                $scope.question = questionObject;
                var isNew = true;
                if($scope.question && $scope.question.id){
                    isNew = false;
                }
                $scope.getStyle = function (index) {
                    if (index % 2 === 0) {
                        return { 'background-color': '#cbeced' };
                    } else {
                        return { 'background-color': '#edf9f9' }
                    }
                };
                $scope.question.answers = [{ "body": "<p>THis is an aswer</p>", "is_accepted": true }, { "body": "<p>THis is an aswer</p>", "is_accepted": false }];
                function getAnswers() {
                    QuestionFactory.getAnswers()
                    .then(function successCallback(response) {
                        $scope.question.answers = response.data.items;
                    }, function errorCallback(ex) {
                        toaster.pop("danger", "Error retrieving answers", "");
                    });
                }

                $scope.checkForAcceptedAnswer = function (answer) {
                    if ($scope.allGuessed) {

                    } else {
                        answer.isGuessed = true;
                        $scope.question.isGuessed = true;
                        if (answer.is_accepted) {
                            $scope.allGuessed = true;
                            toaster.pop("success", "That is the accepted answer", `Answer is worth ${answerScore} points!`);
                        } else {
                            if (answerScore > 1) {
                                answerScore -= 1;
                            }
                            toaster.pop("waring", "That is not the accepted answer", "");
                        }
                    }
                };
                $scope.closeModal = function () {
                    $modalInstance.close({question: $scope.question, score: answerScore});
                }
                //getAnswers();
            }]);