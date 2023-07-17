angular.module("AgentHelp").config(function ($routeProvider) {
    $routeProvider
        .when("/agent/intimations", {
            name: "Intimations",
            templateUrl: "/templates/agent/intimation/list.html",
            controller: "AgentIntimationListCtrl"
        })
        .when("/agent/intimation-details/:id?", {
            name: "agent",
            templateUrl: "/templates/agent/intimation/details.html",
            controller: "AgentIntimationDetailsCtrl"
        })
        .when("/agent/password-reset", {
            name: "admin-password-reset",
            templateUrl: "/templates/agent/profile/password-reset.html",
            controller: "AgentProfileEditCtrl"
        })
        .when("/agent/links", {
            name: "links",
            templateUrl: "/templates/agent/links/links.html",
            controller: "LinkCtrl"
        })
    $routeProvider.otherwise("/agent/intimations");
})

