"use strict";

/* Controllers */

angular.module("app")
    .controller("QuestionAnswersModalController",
        ["$scope", "$http", "$modalInstance", "questionObject", "$sce", "toaster",
            function ($scope, $http, $modalInstance, questionObject, $sce, toaster) {
                var answerScore = 10;
                /** Injected question object to use for getting answers */
                $scope.question = questionObject;
                $scope.getStyle = function (index) {
                    if (index % 2 === 0) {
                        return { 'background-color': '#cbeced' };
                    } else {
                        return { 'background-color': '#edf9f9' }
                    }
                };
                $scope.question.answers = [{ "body": "<p>THis is an aswer</p>", "is_accepted": true }, { "body": "<p>THis is an aswer</p>", "is_accepted": false }];
                //$scope.question.answers.body = $sce.trustAsHtml($scope.question.answers[]body);
                function getAnswers() {
                    $http({
                        method: 'GET',
                        url: `/api/answers/${$scope.question.question_id}`
                    }).then(function successCallback(response) {
                        $scope.question.answers = response.data.items;
                        $scope.question.answers.body = $sce.trustAsHtml($scope.question.answers.body);
                        // this callback will be called asynchronously
                        // when the response is available
                    }, function errorCallback(ex) {
                        console.error(ex);
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
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
                    $modalInstance.close($scope.question)
                }
                //getAnswers();
            }]);