angular.module("AgentHelp").controller("LinkCtrl", ["$scope", "AgentService", function ($scope, AgentService) {
    $scope.link = {
        intimation_key: "",
        url: "",
        btnLoader: false,
        init: function () {
            this.intimation_key = utility.localStorage.get("intimation_key");
            this.url = BASE_WEB_URL + ADD_INTIMATION + this.intimation_key;
        },
        copylink: function () {
            var table = document.getElementById("link");
            var range = document.createRange();
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
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'error',
                    text: 'Unable To Copy Link',
                });;
            }
            window.getSelection().removeAllRanges();
        }
    }

    $scope.link.init();
}])
