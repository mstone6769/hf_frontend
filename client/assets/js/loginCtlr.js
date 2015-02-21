(function() {
	'use strict';
	var app = angular.module('application');
	app.factory('accountService', ['apiURL','$http', '$localStorage', '$state', '$rootScope', 'FoundationApi', function accountFactory(apiURL, $http, $localStorage, $state, $rootScope, FoundationApi){
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
						if (response.data.success) {
							$localStorage.user = response.data.user;
							$rootScope.$broadcast('user-loggedin');
							$state.go('account');
						}
						return response.data;
					},
					function(error) {
						console.log(error);
					});
		};
		var updateUser = function (user) {
			return $http({
					method: 'PUT',
					url: apiURL + '/hfusers/' + user.id,
					headers:  {
						'Accept': 'application/json;odata=verbose'
					},
					params: {'user[email]': user.email, 'user[password]': user.password, 'user[name]': user.name, 'user[avatar]': user.avatar, 'user_email': user.email, 'user_token': user.authentication_token}
				}).then(
					function(response) {
						$localStorage.user = response.data;
						FoundationApi.publish('main-notifications', { content: 'Your account has been updated' });
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
						if (response.data) {
							$localStorage.user = response.data;
							$rootScope.$broadcast('user-loggedin');
							$state.go('account');
						}
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
			$localStorage.$reset();
			$rootScope.$broadcast('user-loggedout');
			$state.go('homepage');
		};

		return {
			userLogin: userLogin,
			createUser: createUser,
			updateUser: updateUser,
			getCurrentUser: getCurrentUser,
			logoutUser: logoutUser
		};
	}]);
	app.controller('LoginController', ['accountService', function(accountService){
		var login = this;
		login.logMeIn = function(user) {
			accountService.userLogin(user).then(function(accountResponse) {
				login.response = accountResponse;				
			});
		};

	}]);
	app.controller('HeaderController', ['accountService', '$scope', 'FoundationApi', function(accountService, $scope, FoundationApi){
		var header = this;
		header.user = accountService.getCurrentUser();
		header.userLoggedIn = header.user;
		header.logout = function () {
			accountService.logoutUser();
		};

		$scope.$on('user-loggedin', function(event, args) {
			header.userLoggedIn = true;
			header.user = accountService.getCurrentUser();
			// Closes login sidebar
			FoundationApi.publish('login', 'close');
		});

		$scope.$on('user-loggedout', function(event, args) {
			header.userLoggedIn = false;
			FoundationApi.publish('userMenu', 'close');
		});

	}]);
	app.controller('SignupController', ['accountService', function(accountService){
		var signup = this;
		signup.createAccount = function(user) {
			accountService.createUser(user).then(function(accountResponse) {
				signup.response = accountResponse;

				// Reset the Signup form
				user.name = user.email = user.password = '';
			});
		};
	}]);
	app.controller('AccountController', ['accountService', 'FoundationApi', function(accountService, FoundationApi){
		var account = this;
		account.user = accountService.getCurrentUser();
		account.updateAccount = function(user) {
			accountService.updateUser(user).then(function(accountResponse) {
				account.response = accountResponse;
			});
		};
	}]);
})();