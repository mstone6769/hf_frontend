(function() {
	'use strict';
	var app = angular.module('application');
	app.factory('accountService', ['$http', function accountFactory($http){
		var apiURL = 'http://hfi2.herokuapp.com/users';

		var userLogin = function (user) {
			return $http({
					method: 'POST',
					url: apiURL + '/sign_in',
					headers:  {
						'Accept': 'application/json;odata=verbose'
					},
					params: {'user[email]': user.email, 'user[password]': user.password}
				}).then(
					function(response) {
						console.log(response);
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

		return {
			userLogin: userLogin,
			createUser: createUser
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
			accountService.createUser(user).then(function(accountResponse) {
				signup.response = accountResponse;
			});
		};
	}]);
})();