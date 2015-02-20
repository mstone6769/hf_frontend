(function() {
	'use strict';
	var app = angular.module('application');
	app.factory('campaignService', ['$http', function campaignFactory($http){
		var apiURL = 'http://hfi2.herokuapp.com/';

		var getAllCampaigns = function () {
			return $http({
					method: 'GET',
					url: apiURL + '/crowdreview',
					headers:  {
						'Accept': 'application/json;odata=verbose'
					}
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