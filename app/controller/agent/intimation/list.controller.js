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
                this.pageLoader=false;
                
                
                for(var i =0;i<this.list.length;i++)
                {
                    console.log(this.list[i]);
                    var parts = this.list[i].admit_date.split("T");
                    var dateStr = parts[0];
                    var dateParts = dateStr.split("-");
                    var year = dateParts[0];
                    var month = dateParts[1];
                    var day = dateParts[2];
                    console.log(day);
                    var monthNames = [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                    ];
                    var date = day + " " + monthNames[Number(month) - 1] + " " + year;
                    this.list[i].admit_date=date

                }
                
                
            })
        },
        navigateToIntimationDetails: function (intimation,id) {
            $scope.goTo("/agent/intimation-details/" + id);
        },
    }

    $scope.intimations.init();
}])
