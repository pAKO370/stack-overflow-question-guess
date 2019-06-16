"use strict";

/* Controllers */

angular.module("app")
    .controller("MainController",
        ["$scope","$state",
            function ($scope, $state) {
                console.log("test");
               $state.go("question-list"); 
            }
        ]);