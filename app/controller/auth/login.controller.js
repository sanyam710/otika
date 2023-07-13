let app = angular.module("app", []);

app.controller("loginCtrl", function ($scope, $http, $timeout) {
        $scope.user = {
            showPassword : false,
            email: "",
            password: "",
            error: "",
            btnLoader: false,
            getLogin: function () {
                if ($scope.loginForm.$valid) {
                    this.btnLoader = true;
                    $scope.http.post("/user/request_access", {
                        email: this.email,
                        password: this.password
                    }, (error, data) => {
                        this.btnLoader = false;
                        if (error) {
                            this.error = error;
                            $timeout(() => {
                                this.error = null;
                            }, 3000)
                            return
                        }

                        let obj = {
                            apiKey: data.api_key,
                            email: data.email,
                        }

                        utility.localStorage.set("userInfo", obj);
                        utility.localStorage.set("user_type", data.user_type);
                        utility.localStorage.set("user_id", data.id);
                        utility.localStorage.set("intimation_key", data.intimation_key);
                        if(data.user_type == USER_TYPE_ADMIN){
                            utility.localStorage.set("loggedInUserType", ADMINISTRATIVE);
                            window.location.href = "/landing.html#!/admin/users";
                        }
                        else if(data.user_type == USER_TYPE_AGENT){
                            utility.localStorage.set("loggedInUserType", AGENT);
                            window.location.href = "/landing.html#!/agent/users";
                        }
                    })
                }
            },

            togglePasswordVisibility:function(){
                $scope.showPassword = !$scope.showPassword;
            }
        }


        $scope.http = {
            post: function (url, params, callback) {
                $http.post(BASE_URL + url, params, {}).then(function (result) {
                    if (result.data.status === "error") {
                        callback(result.data.message, null);
                    } else if (result.data.status === "success") {
                        callback(null, result.data.contents);
                    } else {
                        callback("Unknown error occurred!");
                    }
                }, function () {
                    callback("Unknown error occurred!");
                });
            }
        }
    }
);
