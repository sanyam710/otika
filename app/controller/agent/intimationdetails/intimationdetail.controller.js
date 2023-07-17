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
                this.pageLoader=false;
                this.list = data;
                var parts = this.list.admit_date.split("T");
                var dateStr = parts[0];
                var dateParts = dateStr.split("-");
                var year = dateParts[0];
                var month = dateParts[1];
                var day = dateParts[2];
                // console.log
                var monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
                ];
                var date = day + " " + monthNames[Number(month) - 1] + " " + year;
                this.list.admit_date=date;
            })
        },
        copyTable:function(){
            console.log("ewrewr");
            var table = document.getElementById("intimation_detail_table");
            table.style.display = 'table';
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
            text: 'Table has been copied successfully',
        });;
        console.log(msg);
      } catch (err) {
        console.log('Unable to copy table. Error:', err);
      }

      window.getSelection().removeAllRanges();
      table.style.display = 'none';
        }
    }
    $scope.intimation_detail.init();
}])