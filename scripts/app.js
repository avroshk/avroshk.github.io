(function () {
	var app = angular.module('listening-test', ['ngRoute','ngAnimate']);

	app.config(function($routeProvider) {
	    $routeProvider
		    .when("/", {
				template: '<div></div>'
	    	})
	    	.when("/listening-test", {
				templateUrl: 'templates/listening-test.html'
	    	})
	    	.otherwise({
	    		redirectTo: '/'
	    	});
	});

	// app.controller('RouteController', function ($rootScope, $scope, $route) {
	// 	// $rootScope.$broadcast('loadPage', $route.scurrent.$$route.page);
	// });

	app.controller('MainController', ['$rootScope','$scope','whichBrowser', function ($rootScope, $scope, whichBrowser) {
		var currentBrowser = whichBrowser();

		$rootScope.$on('loadPage', function (event, pageid) {
			if (pageid !== "") {
				$scope.open(pageid);
			}
    	});

		$scope.open = function (pageid) {

		};

		//Video
		$scope.openVideo = function(size, id) {

		    var modalInstance = $uibModal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'templates/modals/videoModal'+(id+1)+'.html',
		      windowClass: 'video-modal-window',
		      backdrop: true,
		      size: size,
		      animation: true
		    });
		};

		$scope.playVideo = function(id) {
		    $scope.openVideo('lg', id);
		};

		$scope.pauseOrPlay = function($event) {

			// --- Weird fix for firefox bug -- $apply already in progress - issue
			if(currentBrowser === 'firefox' && ($scope.$$phase === "$digest" || $scope.$$phase === "$apply")) {
				return;
			}
			// --- //

			var mainVideo;
			if ($event === undefined) {
				mainVideo = angular.element(document.querySelector('mainVideo'));
			} else {
				mainVideo = angular.element($event.currentTarget);
			}
			if (mainVideo[0] !== undefined && mainVideo[0].paused) {
          		mainVideo[0].play();
          		$scope.myInterval = false;
          	} else {
          		mainVideo[0].pause();
          		$scope.myInterval = 5000;
          	}
   		};

   		$scope.pauseVideo = function() {
			var mainVideo;
			mainVideo = angular.element(document.querySelector('.mainVideo'));
			if (mainVideo[0] !== undefined && !mainVideo[0].paused) {
          		mainVideo[0].pause();
          		$scope.myInterval = 5000;
          	} 
   		};

	}]);

	app.directive('info', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/info.html',
			controller: 'InfoController'
		};
	}).controller('InfoController', function ($scope) {
		

	});

	


	app.directive('contact', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/contact.html',
			controller: 'ContactController'
		};
	}).controller('ContactController', function ($scope, $timeout, $http, $log) {
		$scope.qforms = [
			{id:'askQuestion', text: 'Ask a Question'},
			{id:'reqAccess', text: 'Request Access to Teacher Materials'},
			{id:'reportBug', text: 'Report a bug'},
			{id:'joinGroup', text: 'Join our mailing list for news and updates on EarSketch'}
			];

		$scope.activeQForm = 'askQuestion';
		$scope.showContactForm = false;
		$scope.hideMessage = false;
		$scope.formSubmitted = false;
		$scope.hasErrors = false;

		$scope.openQForm = function (qformName) {
			$scope.formSubmitted = false;
			$scope.activeQForm = qformName;
		};

		$scope.isQFormOpen = function (qformName) {
			return ($scope.activeQForm === qformName);
		};

		function resetHasErrors () {
			$scope.hasErrors = false;
		}

		$scope.sendContactInfo = function () {

			if (!$scope.contactForm.$valid) {
				$scope.hasErrors = true;
				$timeout(resetHasErrors, 500);
			} else {
				var data = {};
		        data.username = $scope.username;
		        data.useremail = $scope.useremail;
		        data.message = $scope.usermessage;
		        data.userbiolink = '';
		        data.accessRequest = false;

				var url = window.location.origin + window.location.pathname + 'scripts/php/contact.php';

				if ($scope.activeQForm === 'askQuestion') {
					$scope.showContactForm = false;
					$scope.hideMessage = false;

					payload = data;

				} else if ($scope.activeQForm === 'reqAccess') {
					data.userbiolink = $scope.userbiolink;
					data.accessRequest = true;

					payload = data;
				}

				$scope.formSubmitted = true;
				$scope.username = "";
				$scope.useremail = "";
				$scope.usermessage = "";
				$scope.userbiolink = "";
				$scope.contactForm.$setPristine();

				return $http.post(url, payload).then(function(result) {
		            console.log('Contact form: success');
		        }).catch(function(err) {
		            console.log('Contact form: failure');
		        });
			}
		};
	});

	app.service('whichBrowser', ['$window', function($window) {
	     return function() {
	        var userAgent = $window.navigator.userAgent;
	        var browsers = {chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer/i};
	        for(var key in browsers) {
	            if (browsers[key].test(userAgent)) {
	                return key;
	            }
	       	};
	       	return 'unknown';
	    }
	}]);

	//Info page directives

	

	app.directive('policy', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/policy.html',
			controller: 'PolicyController'
		};
	}).controller('PolicyController', function ($scope) {

	});

	app.directive('credits', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/credits.html',
			controller: 'CreditsController'
		};
	}).controller('CreditsController', function ($scope) {

	});

	app.directive('backgroundImage', function () {
		return function(scope, element, attrs) {
	        var url = attrs.backgroundImage;
	        element.css({
	            'background-image': 'url(' + url +')',
	            'background-size' : 'cover',
	            'background-position' : 'center bottom'
	        });
	    };
	});

	app.directive('playVideo', function($parse) {
	  	return {
	    	restrict: 'A',
	    	link: function(scope, elem, attrs) {
	      		elem[0].play();
	    	}
	  	};
	});

})();
