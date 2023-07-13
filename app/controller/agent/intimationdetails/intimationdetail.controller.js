angular.module("AgentHelp").controller("AgentIntimationDetailsCtrl", ["$scope", "$routeParams","AgentService", function ($scope, $routeParams, AgentService) {

    $scope.intimation_detail = {
        list: [],
        pageLoader: true,
        init: function () {
              id = $routeParams.id;
            AgentService.intimations.retrieveIntimationDetails(id, (error, data) => {

                if (error) {
                    return;
                }
                this.list = data;
                this.pageLoader = false;
            })
        },
    }
    $scope.intimation_detail.init();
}])