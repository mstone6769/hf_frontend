(function() {
	'use strict';
	var app = angular.module('application');
	app.value('apiURL', 'http://hfi2.herokuapp.com');
	app.factory('accountService', ['apiURL','$http', '$localStorage', function accountFactory(apiURL, $http, $localStorage){
		var userAPI = apiURL + '/users';

		var userLogin = function (user) {
			return $http({
					method: 'POST',
					url: userAPI + '/sign_in',
					headers:  {
						'Accept': 'application/json;odata=verbose'
					},
					params: {'user[email]': user.email, 'user[password]': user.password}
				}).then(
					function(response) {
						console.log(response);
						if (response.data.success) {
							$localStorage.user = response.data.user;
						}
						return response.data;
					},
					function(error) {
						console.log(error);
					});
		};
		var createUser = function (user) {
			return $http({
					method: 'POST',
					url: userAPI,
					headers:  {
						'Accept': 'application/json;odata=verbose'
					},
					params: { 'user[email]': user.email, 'user[password]': user.password, 'user[name]': user.name }
				}).then(
					function(response) {
						console.log(response);
						return response.data;
					},
					function(error) {
						console.log(error);
					});
		};
		var getCurrentUser = function () {
			return $localStorage.user;
		};

		var logoutUser = function () {
			return $localStorage.$reset();
			window.location = '/';
		};

		return {
			userLogin: userLogin,
			createUser: createUser,
			getCurrentUser: getCurrentUser,
			logoutUser: logoutUser
		};
	}]);
	app.controller('LoginController', ['accountService', function(accountService){
		var login = this;
		login.logMeIn = function(user, headerUser) {
			console.log(user.email, user.password);
			accountService.userLogin(user).then(function(accountResponse) {
				login.response = accountResponse;
				headerUser = accountResponse.user;
			});
		};

	}]);
	app.controller('HeaderController', ['accountService', '$scope', function(accountService, $scope){
		var header = this;
		header.user = accountService.getCurrentUser();

		header.logout = function () {
			accountService.logoutUser();
		};

	}]);
	app.controller('SignupController', ['accountService', function(accountService){
		var signup = this;
		signup.createAccount = function(user) {
			accountService.createUser(user).then(function(accountResponse) {
				signup.response = accountResponse;
			});
		};
	}]);
})();