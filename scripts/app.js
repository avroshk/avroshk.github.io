(function () {
	var app = angular.module('listening-test', ['ngRoute','ngAnimate']);

	app.config(function($routeProvider) {
	    $routeProvider
		    .when("/", {
				template: '<div></div>'
	    	})
	    	.when("/listening-test", {
				templateUrl: 'templates/startpage.html'
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
		$scope.teststarted = false;
		$scope.testended = false;

		$rootScope.$on('loadPage', function (event, pageid) {
			if (pageid !== "") {
				$scope.open(pageid);
			}
    	});

   		$scope.startTest = function () {
			$scope.teststarted = true;
		};

	}]);

	app.directive('startpage', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/startpage.html',
			controller: 'StartpageController'
		};
	}).controller('StartpageController', function ($scope) {
		
	});

	app.directive('question', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/question.html',
			controller: 'QuestionController'
		};
	}).controller('QuestionController', function ($scope, $http) {
		$scope.questionText = "Did you notice a conflict between video and audio?";

		$scope.videoContainer = document.getElementById('testVideo');
		var source = document.createElement('source');

		$scope.resetTest = function () {
			$scope.numFolders = 1;
			$scope.numQuestions = 2;
			$scope.currentFolderArray = [];
			$scope.currentQuestionArray = [];
			$scope.videoPlaying = false;

			$scope.folderIndex = -1;
			$scope.questionIndex = -1;
			
			$scope.answers = [];
		}

		$scope.resetQuestionArray = function () {
			$scope.currentQuestionArray = [];
		}

		$scope.resetFolderArray = function () {
			$scope.currentFolderArray = [];
		}

		$scope.createQuestionArray = function () {
			$scope.resetQuestionArray();
			for (var i = 1; i <= $scope.numQuestions; i++) {
			   $scope.currentQuestionArray.push(i);
			}
			$scope.currentQuestionArray = shuffle($scope.currentQuestionArray);
		};

		$scope.createFolderArray = function () {
			$scope.resetFolderArray();
			for (var i = 1; i <= $scope.numFolders; i++) {
			   $scope.currentFolderArray.push(i);
			}
			$scope.currentFolderArray = shuffle($scope.currentFolderArray);
		};

		$scope.submitAnswers = function () {

			if (!$scope.contactForm.$valid) {
				$scope.hasErrors = true;
			} else {
		
				var url = 'https://avroshk.000webhostapp.com/scripts/submitanswers.php?';

				url = url+'fullname='+$scope.fullname+'&'+'emailaddress='+$scope.emailaddress+'&'+'message='+$scope.message+'&'+'answers='+ $scope.answers.toString();
			
				return $http.get(url).then(function(result) {
		            console.log('Contact form: success');
	            	$scope.formSubmitted = true;
					$scope.fullname = "";
					$scope.emailaddress = "";
					$scope.message = "";
					$scope.answers = {};
					$scope.contactForm.$setPristine();
		        }).catch(function(err) {
		            console.log('Contact form: failure');
		        });
			}
		};

		$scope.loadNextQuestion = function(answer) {
			var currentAnswer = {};
			if (answer !== undefined) {
				if (answer) 
					say = "yes";
				else
					say = "no";
				currentAnswer = "("+$scope.currentFolderArray[$scope.folderIndex]+','+$scope.currentQuestionArray[$scope.questionIndex]+','+ say +")";
				$scope.answers.push(currentAnswer);
			}

			$scope.questionIndex = $scope.questionIndex + 1;

			if ($scope.questionIndex % $scope.numQuestions === 0) {
				$scope.createQuestionArray();
				console.log($scope.currentQuestionArray);
				$scope.folderIndex = $scope.folderIndex + 1;
				$scope.questionIndex = 0;

				if ($scope.folderIndex > $scope.numFolders-1) {
					$scope.testended = true;
					console.log($scope.answers);
				}
			} 

			if (!$scope.testended) {
				$scope.videoSrc = 'media/video/' + $scope.currentFolderArray[$scope.folderIndex] + '/' + 
					$scope.currentQuestionArray[$scope.questionIndex] + '.mp4';

				console.log($scope.videoSrc);
				source.setAttribute('src',$scope.videoSrc);
				$scope.videoContainer.appendChild(source);
				$scope.videoContainer.play();
			}
		};

		$scope.videoContainer.onplay = function () {
			$scope.videoPlaying = true;
			$scope.$apply();
		};

		$scope.videoContainer.onpause = function () {
			$scope.videoPlaying = false;
			$scope.$apply();
		};

		$scope.startAgain = function () {
			$scope.resetTest();
		};

		function shuffle(array) {
		  	var currentIndex = array.length, temporaryValue, randomIndex;

		  	// While there remain elements to shuffle...
		  	while (0 !== currentIndex) {

			    // Pick a remaining element...
			    randomIndex = Math.floor(Math.random() * currentIndex);
			    currentIndex -= 1;

			    // And swap it with the current element.
			    temporaryValue = array[currentIndex];
			    array[currentIndex] = array[randomIndex];
			    array[randomIndex] = temporaryValue;
			}

		  return array;
		}

		//First load
		$scope.resetTest();

		$scope.createFolderArray();
		console.log($scope.currentFolderArray);
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

})();
