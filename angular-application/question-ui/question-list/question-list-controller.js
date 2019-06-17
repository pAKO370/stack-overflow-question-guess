"use strict";

/* Controllers */

angular.module("app")
    .controller("QuestionListController",
        ["$scope", "$state", "$http", "$modal",
            function ($scope, $state, $http, $modal) {

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
                        result = JSON.stringify(result);
                        $http.post('/api/questions', result,{headers: {'Content-Type': 'application/json'} })
                            .then(function successCallback(response) {
                                // this callback will be called asynchronously
                                // when the response is available
                            }, function errorCallback(response) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                            });


                    });
                }



                /**  Get all Questions */
                $http({
                      method: 'GET',
                      url: '/api/questions'
                  }).then(function successCallback(response) {
                      $scope.questionsArray = response.data.newQuestions;
                      $scope.attemptedQuestion = response.data.savedQuestion;
                      // this callback will be called asynchronously
                      // when the response is available
                  }, function errorCallback(response) {
                      // called asynchronously if an error occurs
                      // or server returns response with an error status.
                  });
                  /** Method to switch to next view when question is clicked*/


            }
        ]);