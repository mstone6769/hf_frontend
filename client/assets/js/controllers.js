angular.module('application')
.controller('HomeController', ['$scope', '$stateParams', '$state', '$http', function ($scope, $stateParams, $state, $http) {
   $scope.projects = 'Not retrieved yet.';
   $scope.getProjects = function () {

    var config = { headers:  {
        "Accept": "application/json;odata=verbose"
    }
  };

   var responsePromise = $http.get("http://hfi2.herokuapp.com/crowdreview#crowdreview_list", config);

   responsePromise.success(function (data, status, headers, config) {
      $scope.projects = data;
   });

   responsePromise.error(function (data, status, headers, config) {
      $scope.projects= 'Failed to get Projects: ' + data;
   });

  

};

$scope.getProjects();

}

  

]);