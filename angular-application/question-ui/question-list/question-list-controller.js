"use strict";

/* Controllers */

angular.module("app")
    .controller("QuestionListController",
        ["$scope", "$http", "$modal","QuestionFactory",
            function ($scope, $http, $modal, QuestionFactory) {

                /** Method to set styles on odd/even rows */
                $scope.getStyle = function (index) {
                    if (index % 2 === 0) {
                        return { 'background-color': '#6e8ab7', 'cursor': 'pointer' };
                    } else {
                        return { 'background-color': '#bac3d3', 'cursor': 'pointer' }
                    }
                };

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
                        result = result;
                        $http.post('/api/questions', JSON.stringify(result.question), { headers: { 'Content-Type': 'application/json' } })
                            .then(function successCallback(response) {
                                $scope.currentScore = result.score;
                                getAllQuestions();
                                // this callback will be called asynchronously
                                // when the response is available
                            }, function errorCallback(response) {
                                toaster.pop("danger", "Error saving result", "");
                            });


                    });
                }
                $scope.isNew = true;

                //$scope.questionsArray = [{ title: "test", question_id: 1 }, { title: "test2", question_id: 2 }];
                //$scope.attemptedQuestion = [{ title: "test other", question_id: 1 }, { title: "test 5555", question_id: 2 }]

                /**  Get all Questions */
                function getAllQuestions() {
                    QuestionFactory.getQuestions()
                        .then(function successCallback(response) {
                            $scope.questionsArray = response.newQuestions;
                            $scope.attemptedQuestion = response.savedQuestion;
                            // this callback will be called asynchronously
                            // when the response is available
                        }, function errorCallback(response) {
                            toaster.pop("danger", "Error retrieving questions", "");
                        });
                }

                getAllQuestions();
            }
        ]);