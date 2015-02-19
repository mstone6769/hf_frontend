(function() {
	'use strict';
	var app = angular.module('application');
	// This filter allows you to use ng-bind-html when html is coming from the API
	app.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);
})();