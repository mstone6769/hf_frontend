(function() {
	'use strict';
	var app = angular.module('application');
	app.factory('campaignService', ['$http', function campaignFactory($http){
		var apiURL = 'http://hfi2.herokuapp.com';

		var getCampaigns = function () {
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
			getCampaigns: getCampaigns
		};
	}]);

	app.controller('campaignController', ['campaignService', function(campaignService){
		
		var campaignCtlr = this;

		campaignCtlr.campaigns = campaignService.getCampaigns();

	}]);

})();