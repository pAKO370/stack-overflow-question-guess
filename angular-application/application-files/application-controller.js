"use strict";

/* Controllers */

angular.module("app")
    .controller("MainController",
        ["$scope","$state",
            function ($scope, $state) {
               $state.go("question-list"); 
            }
        ]);