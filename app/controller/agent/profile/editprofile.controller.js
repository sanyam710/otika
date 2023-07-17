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
        copylink:function(){
            console.log("ewrewr");
            var table = document.getElementById("link");
            // table.style.display = 'table';
            var range = document.createRange();
            console.log(range);
            range.selectNode(table);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'Table copied to clipboard!' : 'Unable to copy table.';
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Link Copied Successfully',
        });;
        console.log(msg);
      } catch (err) {
        console.log('Unable to copy table. Error:', err);
      }

      window.getSelection().removeAllRanges();
    //   table.style.display = 'none';
        }
    }

    $scope.profile.init();
}])
