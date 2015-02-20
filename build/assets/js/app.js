!function(){"use strict";function config($urlProvider,$locationProvider){$urlProvider.otherwise("/"),$locationProvider.html5Mode({enabled:!1,requireBase:!1}),$locationProvider.hashPrefix("!")}function run(){FastClick.attach(document.body)}angular.module("application",["ui.router","ngAnimate","foundation","foundation.dynamicRouting","foundation.dynamicRouting.animations"]).config(config).run(run),config.$inject=["$urlRouterProvider","$locationProvider"]}();
angular.module("application").controller("HomeController",["$scope","$stateParams","$state","$http","getCampaigns",function($scope,$stateParams,$state,$http,getCampaigns){var homeCtlr=this;homeCtlr.campaigns="Not retrieved yet.",homeCtlr.callCampaigns=function(stage){homeCtlr.campaigns=getCampaigns(stage)}}]).factory("getCampaigns",["$http",function(){{var config={headers:{Accept:"application/json;odata=verbose"}},campaigns=[];$http.get("http://hfi2.herokuapp.com/crowdreview#crowdreview_list",config).success(function(data){campaigns=data}).error(function(data){campaigns="Failed to get campaigns: "+data})}return campaigns}]);
angular.module("application").controller("HomeController",["$scope","$stateParams","$state","$http",function($scope,$stateParams,$state,$http){var homeCtlr=this;homeCtlr.projects="Not retrieved yet.",homeCtlr.getProjects=function(){{var config={headers:{Accept:"application/json;odata=verbose"}};$http.get("http://hfi2.herokuapp.com/crowdreview#crowdreview_list",config).success(function(data){homeCtlr.projects=data}).error(function(data){homeCtlr.projects="Failed to get Projects: "+data})}},homeCtlr.getProjects()}]).controller("CampaignController",["$scope","$stateParams","$state","$http",function($scope,$stateParams,$state,$http){var campaignCtlr=this;campaignCtlr.campaigns="Not retrieved yet.",campaignCtlr.getCampaigns=function(){{var config={headers:{Accept:"application/json;odata=verbose"}};$http.get("http://hfi2.herokuapp.com/campaigns/"+$stateParams.id,config).success(function(data){campaignCtlr.campaigns=data}).error(function(data){campaignCtlr.campaigns="Failed to get Project: "+data})}},campaignCtlr.getCampaigns()}]);
!function(){"use strict";var app=angular.module("application");app.filter("to_trusted",["$sce",function($sce){return function(text){return $sce.trustAsHtml(text)}}])}();