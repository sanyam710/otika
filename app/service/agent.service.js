angular.module("AgentHelp").service("AgentService", ["$http", "AuthService", function ($http, AuthService) {
    let obj = {};


    obj.masters = {
        retrieveMasters: function (callback) {
            obj.postHttp("/admin/get_master", {}, callback)
        }
    }

    obj.intimations = {
        retrieveIntimations: function (user_id, callback) {
            obj.postHttp("/intimation/get_all_intimations_by_agent", {user_id: user_id}, callback)
        },
        retrieveIntimationDetails: function (intimation_id, callback) {
            obj.postHttp("/intimation/get_intimation_by_id", {intimation_id}, callback)
        },
        saveUser: function (user, callback) {
            obj.postHttp("/user/add_user", user, callback)
        },
        getUserProfile: function (id, callback) {
            obj.postHttp("/admin/get_user_profile", {user_id: id}, callback)
        },
        updateUser: function (user, callback) {
            obj.postHttp("/admin/update_user_profile", user, callback)
        },
    }

    obj.profile = {
        updatePassword: function (oldPassword, newPassword, retypedPassword, callback) {
            obj.postHttp("/user/update_password", {
                new_password: newPassword,
                old_password: oldPassword,
                retype_new_password: retypedPassword
            }, callback);
        }
    }

    obj.postHttp = function (url, params, callback) {
        if (AuthService.details) {
            params['api_key'] = AuthService.details.apiKey;
        }
        $http.post(BASE_URL + url, params, {}).then(function (result) {
            if (result.data.status == "error") {
                callback(result.data.message, null);
            } else if (result.data.status == "success") {
                callback(null, result.data.contents);
            } else {
                callback("Unknown error occurred!");
            }
        }, function () {
            callback("Unknown error occurred!");
        });
    };

    return obj;
}])
