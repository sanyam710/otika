angular.module("AgentHelp").controller("FormUserCtrl", ["$scope", "AdminService", "$routeParams", function ($scope, AdminService, $routeParams) {

    $scope.userForm = {
        id: $routeParams.id,
        // info:window.dataStorage.getItem("toBeEditedUser") ? window.dataStorage.getItem("toBeEditedUser"): {},
        info: utility.dataStorage.get("toBeEditedUser") ? utility.dataStorage.get("toBeEditedUser") : {},
        pageLoader: true,
        init: function () {
            if (this.id) {
                AdminService.dashboard.getUserProfile(this.id, (error, data) => {
                    if (error) {
                        $scope.toast.show(error, "error");
                        return;
                    }
                    this.info = data;
                    this.pageLoader = false;
                })
            } else {
                this.info = {};
                this.info["user_type"] = USER_TYPE_AGENT;
                // window.dataStorage.setItem("toBeEditedUser", {})
                utility.dataStorage.set("toBeEditedUser", {})
                this.pageLoader = false;
            }
        },
        updateUser: function () {
            this.btnLoader = true;
            this.info["user_id"] = this.info.id;
            AdminService.dashboard.updateUser(this.info, (error, data) => {
                this.btnLoader = false;
                if (error) {
                    $scope.toast.show(error, "error");
                    return;
                }
                $scope.toast.show("User Profile was Updated", "success");
            })
        },
        saveUser: function () {
            this.btnLoader = true;
            if (this.info.mobile_no.length < 10) {
                $scope.toast.show("Phone Number Is Incorrect", "error");


            }
            else {
                AdminService.dashboard.saveUser(this.info, (error, data) => {
                    this.btnLoader = false;
                    if (error) {
                        $scope.toast.show(error, "error");
                        return;
                    }
                    $scope.toast.show("New User was added!", "success");
                    window.location.href = "/landing.html#!/admin/users";
                })
            }
        }
    }

    $scope.entities = {
        add: function (entity) {
            AdminService.dashboard.saveUserEntity($scope.userForm.id, entity.id, (error, data) => {
                if (error) {
                    $scope.toast.show(error, "error");
                    return;
                }
                $scope.toast.show("Added New Entity", "success");
                $scope.userForm.info.user_entities.push(data);
            })
        },
        remove: function (entity) {
            AdminService.dashboard.deleteUserEntity(entity.id, (error, data) => {
                if (error) {
                    $scope.toast.show(error, "error");
                    return;
                }
                $scope.toast.show("Entity Deleted", "success");
                utility.ArrayUtility.splice($scope.userForm.info.user_entities, entity)
            })
        }
    }

    $scope.languages = {
        map: {},
        add: function (language) {
            AdminService.dashboard.saveUserLanguage($scope.userForm.id, language.id, (error, data) => {
                if (error) {
                    $scope.toast.show(error, "error");
                    return;
                }
                $scope.toast.show("Added New Language", "success");
            })
        },
        remove: function (language) {
            AdminService.dashboard.deleteUserLanguage(language.id, (error, data) => {
                if (error) {
                    $scope.toast.show(error, "error");
                    return;
                }
            })
        },

    }

    $scope.pageView.init(() => {
        $scope.userForm.init();
    })
}])
