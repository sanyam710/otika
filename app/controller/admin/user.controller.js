angular.module("AgentHelp").controller("AdminUsersCtrl", ["$scope", "AdminService", function ($scope, AdminService) {

    $scope.users = {
        userText: "",
        list: [],
        pageLoader: true,
        init: function () {

            if (parseInt(window.localStorage.getItem("user_type")) != USER_TYPE_ADMIN){
                return;
            }

            AdminService.dashboard.retrieveUsers((error, data) => {

                if (error) {
                    return;
                }
                this.list = data;
                this.pageLoader = false;
            })
        },
        editUser: function (user) {
            utility.dataStorage.set("toBeEditedUser", user);
            $scope.goTo(`/admin/users/edit_user/${user.id}`)
        },
        addNewUser: function () {
            $scope.goTo("/admin/users/add_user");
        }
    }

    $scope.users.init();
}])
