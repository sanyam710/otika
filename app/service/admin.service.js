angular.module("AgentHelp").service("AdminService", ["$http", "AuthService", function ($http, AuthService) {
    let obj = {};


    obj.masters = {
        retrieveMasters: function (callback) {
            obj.postHttp("/admin/get_master", {}, callback)
        }
    }

    obj.dashboard = {
        retrieveUsers: function (callback) {
            obj.postHttp("/user/get_all_agents", {}, callback)
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
        saveUserEntity: function (userId, entityId, callback) {
            obj.postHttp("/entity/create_user_entity", {user_id: userId, entity_id: entityId}, callback)
        },
        deleteUserEntity: function (userEntityId, callback) {
            obj.postHttp("/entity/remove_user_entity", {user_entity_id: userEntityId}, callback)
        },
        saveUserLanguage: function (userId, languageId, callback) {
            obj.postHttp("/language/create_user_language", {user_id: userId, language_id: languageId}, callback)
        },
        deleteUserLanguage: function (userLanguageId, callback) {
            obj.postHttp("/language/remove_user_language", {user_language_id: userLanguageId}, callback)
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
