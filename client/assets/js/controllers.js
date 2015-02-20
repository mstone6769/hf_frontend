angular.module('application')
.controller('HomeController', ['$scope', '$stateParams', '$state', '$http', function ($scope, $stateParams, $state, $http) {
  
  // This allows us to use ControllerAs syntax
  /// Look mom! I don't have to use $scope  !!!
  var homeCtlr = this;

  homeCtlr.projects  = 'Not retrieved yet.';


  /// This needs to be moved to a service
  homeCtlr.getProjects = function () {

    var config = { 
      headers:  {
        "Accept": "application/json;odata=verbose"
      }
    };

    var responsePromise = $http
      .get("http://hfi2.herokuapp.com/crowdreview#crowdreview_list", config)
      .success(function (data, status, headers, config) {
        homeCtlr.projects  = data;
      })
      .error(function (data, status, headers, config) {
        homeCtlr.projects = 'Failed to get Projects: ' + data;
      });
  };

  homeCtlr.getProjects();

}

])
.controller('CampaignController', ['$scope', '$stateParams', '$state', '$http', function ($scope, $stateParams, $state, $http) {
  
  // This allows us to use ControllerAs syntax
  /// Look mom! I don't have to use $scope  !!!
  var campaignCtlr = this;

  campaignCtlr.details  = 'Not retrieved yet.';


  /// This needs to be moved to a service
  campaignCtlr.getProjects = function () {

    var config = { 
      headers:  {
        "Accept": "application/json;odata=verbose"
      }
    };

    var responsePromise = $http
      .get("http://hfi2.herokuapp.com/campaigns/:id", config)
      .success(function (data, status, headers, config) {
        campaignCtlr.projects  = data;
      })
      .error(function (data, status, headers, config) {
        campaignCtlr.projects = 'Failed to get Projects: ' + data;
      });
  };

  campaignCtlr.getProjects();

}

]);