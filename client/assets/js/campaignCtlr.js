(function() {
	'use strict';
	var app = angular.module('application');
	app.factory('campaignService', ['apiURL', '$http', function campaignFactory(apiURL, $http){
		var apiURL = apiURL;

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

		campaignService.getCampaigns().then(function(response) {
			campaignCtlr.campaigns = response;
		});

	}]);

})();