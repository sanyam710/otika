angular.module("AgentHelp").controller("AgentProfileEditCtrl", ["$scope", "AdminService", function ($scope, AdminService) {
    $scope.profile = {
        info: {},
        intimation_key : "",
        url : "",

        btnLoader: false,
        init: function () {
            this.intimation_key = utility.localStorage.get("intimation_key");
            this.url=BASE_WEB_URL+ADD_INTIMATION+this.intimation_key;
        },
        updatePassword: function () {
            if (this.btnLoader) {
                return;
            }
            if ($scope.passwordResetForm.$valid) {
                this.btnLoader = true;

                AdminService.profile.updatePassword(this.info.oldPassword, this.info.newPassword, this.info.retypedPassword, (error, data) => {
                    if (error) {
                        return;
                    }

                    this.btnLoader = false;
                    $scope.toast.show("Password was updated", "success");
                })
            }
        },
        copyurl: function () {
            navigator.clipboard.writeText(this.url);
            $scope.toast.show("Link Copied","success");
        },
    }

    $scope.profile.init();
}])
