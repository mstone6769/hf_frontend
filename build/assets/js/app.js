!function(){"use strict";function config($urlProvider,$locationProvider){$urlProvider.otherwise("/"),$locationProvider.html5Mode({enabled:!1,requireBase:!1}),$locationProvider.hashPrefix("!")}function run(){FastClick.attach(document.body)}angular.module("application",["ui.router","ngAnimate","ngStorage","foundation","foundation.dynamicRouting","foundation.dynamicRouting.animations"]).config(config).run(run),config.$inject=["$urlRouterProvider","$locationProvider"]}();
!function(){"use strict";var app=angular.module("application");app.factory("campaignService",["apiURL","$http",function(apiURL,$http){var apiURL=apiURL,getCampaigns=function(){return $http({method:"GET",url:apiURL+"/crowdreview",headers:{Accept:"application/json;odata=verbose"}}).then(function(response){return console.log(response),response.data},function(error){console.log(error)})};return{getCampaigns:getCampaigns}}]),app.controller("campaignController",["campaignService",function(campaignService){var campaignCtlr=this;campaignService.getCampaigns().then(function(response){campaignCtlr.campaigns=response})}])}();
angular.module("application").controller("HomeController",["$scope","$stateParams","$state","$http","getCampaigns",function($scope,$stateParams,$state,$http,getCampaigns){var homeCtlr=this;homeCtlr.campaigns="Not retrieved yet.",homeCtlr.callCampaigns=function(stage){homeCtlr.campaigns=getCampaigns(stage)}}]).factory("getCampaigns",["$http",function(){{var config={headers:{Accept:"application/json;odata=verbose"}},campaigns=[];$http.get("http://hfi2.herokuapp.com/crowdreview#crowdreview_list",config).success(function(data){campaigns=data}).error(function(data){campaigns="Failed to get campaigns: "+data})}return campaigns}]);
angular.module("application").controller("HomeController",["$scope","$stateParams","$state","$http",function(){}]);
!function(){"use strict";var app=angular.module("application");app.filter("to_trusted",["$sce",function($sce){return function(text){return $sce.trustAsHtml(text)}}])}();
!function(){"use strict";var app=angular.module("application");app.factory("accountService",["apiURL","$http","$localStorage","$state","$rootScope",function(apiURL,$http,$localStorage,$state,$rootScope){var userAPI=apiURL+"/users",userLogin=function(user){return $http({method:"POST",url:userAPI+"/sign_in",headers:{Accept:"application/json;odata=verbose"},params:{"user[email]":user.email,"user[password]":user.password}}).then(function(response){return response.data.success&&($localStorage.user=response.data.user,$rootScope.$broadcast("user-loggedin"),$state.go("account")),response.data},function(error){console.log(error)})},createUser=function(user){return $http({method:"POST",url:userAPI,headers:{Accept:"application/json;odata=verbose"},params:{"user[email]":user.email,"user[password]":user.password,"user[name]":user.name}}).then(function(response){return response.data&&($localStorage.user=response.data,$rootScope.$broadcast("user-loggedin"),$state.go("account")),response.data},function(error){console.log(error)})},getCurrentUser=function(){return $localStorage.user},logoutUser=function(){$localStorage.$reset(),$rootScope.$broadcast("user-loggedout"),$state.go("homepage")};return{userLogin:userLogin,createUser:createUser,getCurrentUser:getCurrentUser,logoutUser:logoutUser}}]),app.controller("LoginController",["accountService",function(accountService){var login=this;login.logMeIn=function(user){accountService.userLogin(user).then(function(accountResponse){login.response=accountResponse})}}]),app.controller("HeaderController",["accountService","$scope","FoundationApi",function(accountService,$scope,FoundationApi){var header=this;header.user=accountService.getCurrentUser(),header.userLoggedIn=header.user,header.logout=function(){accountService.logoutUser()},$scope.$on("user-loggedin",function(){header.userLoggedIn=!0,header.user=accountService.getCurrentUser(),FoundationApi.publish("login","close")}),$scope.$on("user-loggedout",function(){header.userLoggedIn=!1,FoundationApi.publish("userMenu","close")})}]),app.controller("SignupController",["accountService",function(accountService){var signup=this;signup.createAccount=function(user){accountService.createUser(user).then(function(accountResponse){signup.response=accountResponse,user.name=user.email=user.password=""})}}]),app.controller("AccountController",["accountService","FoundationApi",function(accountService){var account=this;account.user=accountService.getCurrentUser()}])}();
!function(){"use strict";var app=angular.module("application");app.value("apiURL","http://hfi2.herokuapp.com")}();