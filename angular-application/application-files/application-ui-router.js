"use strict";

angular.module("app")
    .config(
        ["$stateProvider", "$urlRouterProvider", "$locationProvider",
            function ($stateProvider, $urlRouterProvider, $locationProvider) {
                
                $urlRouterProvider.otherwise("/");
                $stateProvider
                    .state('questions', {
                        url: "/",
                        templateUrl: "question-ui/question-list/question-list.html",
                        controller: "QuestionListController"
                    })
            }]);