"use strict";

/* Controllers */

angular.module("app")
    .controller("QuestionListController",
        ["$scope", "$state", "$http",
            function ($scope, $state, $http) {
                /**  Get all Questions */
                $scope.questionsArray = [{title: "test"},{title: "test2"}]
              /*  $http({
                    method: 'GET',
                    url: '/api/questions'
                }).then(function successCallback(response) {
                    $scope.questionsArray = response.data.items;
                    // this callback will be called asynchronously
                    // when the response is available
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
                /** Method to switch to next view when question is clicked*/


            }
        ]);