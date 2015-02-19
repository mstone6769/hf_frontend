angular.module('application')
.controller('HomeController', ['$scope', '$stateParams', '$state', '$http', 'getCampaigns', function ($scope, $stateParams, $state, $http, getCampaigns) {
  
  // This allows us to use ControllerAs syntax
  /// Look mom! I don't have to use $scope  !!!
  var homeCtlr = this;

  homeCtlr.campaigns  = 'Not retrieved yet.';

  homeCtlr.callCampaigns = function(stage) {
     homeCtlr.campaigns = getCampaigns(stage);
  };

}

  
]).
factory('getCampaigns', function(stage) {

    var config = { 
      headers:  
        "Accept" "application/json;odata=verbose"
      };

    var campaigns = [];
    var responsePromise = $http
      .get("http://hfi2.herokuapp.com/crowdreview#crowdreview_list", config)
      .success(function (data, status, headers, config) {
        campaigns = data;
      })
      .error(function (data, status, headers, config) {
        campaigns = 'Failed to get campaigns: ' + data;
      });

      return campaigns;

 });