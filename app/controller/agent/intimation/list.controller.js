angular.module("AgentHelp").controller("AgentIntimationListCtrl", ["$scope", "AgentService", function ($scope, AgentService) {

    $scope.intimations = {
        intimationText: "",
        list: [],
        pageLoader: true,
        init: function () {

            user_id = window.localStorage.getItem("user_id");

            AgentService.intimations.retrieveIntimations(user_id, (error, data) => {

                if (error) {
                    return;
                }
                this.list = data;
                this.pageLoader = false;
            })
        },
        navigateToIntimationDetails: function (intimation,id) {
            $scope.goTo("/agent/intimation-details/" + id);
        },
    }

    $scope.intimations.init();
}])
