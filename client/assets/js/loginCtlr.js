(function() {
	'use strict';
	var app = angular.module('application');
	app.factory('accountService', ['$http', function accountFactory($http){
		var apiURL = 'http://hfi2.herokuapp.com/users';

		var userLogin = function (user) {
			return $http({
					method: 'POST',
					url: apiURL + '/sign_in',
					headers: {
						'Accept': 'application/json;odata=verbose'
					},
					params: {email: user.email, password: user.password}
				}).then(
					function(response) {
						console.log(response.data);
						return response.data;
					},
					function(error) {
						console.log(error);
					});
		};
		var createUser = function (user) {
			return $http({
					method: 'POST',
					url: apiURL,
					headers: {
						'Accept': 'application/json;odata=verbose'
					},
					data: { email: user.email, password: user.password }
				}).then(
					function(response) {
						console.log(response.data);
						return response.data;
					},
					function(error) {
						console.log(error);
					});
		};

		return {
			userLogin: userLogin
		};
	}]);
	app.controller('LoginController', ['accountService', function(accountService){
		var login = this;
		login.logMeIn = function(user) {
			console.log(user.email, user.password);
			accountService.userLogin(user).then(function(accountResponse) {
				login.response = accountResponse;
			});
		};

	}]);
	app.controller('SignupController', ['accountService', function(accountService){
		var signup = this;
		signup.createAccount = function(user) {
			console.log(user.name, user.email, user.password);
		};
	}]);
})();