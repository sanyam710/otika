angular.module("AgentHelp").config(function ($routeProvider) {
    $routeProvider
        .when("/admin/users", {
            name: "admin-users",
            templateUrl: "/templates/admin/users.html",
            controller: "AdminUsersCtrl"
        })
        .when("/admin/users/edit_user/:id?", {
            
            name: "admin-user-alter",
            templateUrl: "/templates/admin/users/form.html",
            controller: "FormUserCtrl"
        })
        .when("/admin/users/add_user", {
            
            name: "admin-user",
            templateUrl: "/templates/admin/users/form.html",
            controller: "FormUserCtrl"
        })
        .when("/admin/password-reset", {
            name: "admin-password-reset",
            templateUrl: "/templates/admin/profile/password-reset.html",
            controller: "ProfilePasswordResetCtrl"
        })
    $routeProvider.otherwise("/admin/users");
})



