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

	app.directive('endpage', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/endpage.html',
			controller: 'StartpageController'
		};
	}).controller('EndpageController', function ($scope) {
		

	});

	app.directive('question', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/question.html',
			controller: 'QuestionController'
		};
	}).controller('QuestionController', function ($scope, $http) {
		$scope.numFolders = 1;
		$scope.numQuestions = 1;
		$scope.currentFolderArray = [];
		$scope.currentQuestionArray = [];
		$scope.videoPlaying = false;

		$scope.folderIndex = -1;
		$scope.questionIndex = -1;
		$scope.questionText = "Did you notice a conflict between video and audio?";
		$scope.answers = [];

		$scope.videoContainer = document.getElementById('testVideo');
		var source = document.createElement('source');

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

				// Create the XHR object.
				function createCORSRequest(method, url) {
				  var xhr = new XMLHttpRequest();
				  if ("withCredentials" in xhr) {
				    // XHR for Chrome/Firefox/Opera/Safari.
				    xhr.open(method, url, true);
				  } else if (typeof XDomainRequest != "undefined") {
				    // XDomainRequest for IE.
				    xhr = new XDomainRequest();
				    xhr.open(method, url);
				  } else {
				    // CORS not supported.
				    xhr = null;
				  }
				  return xhr;
				}

				var data = {};
		        data.fullname = $scope.fullname;
		        data.emailaddress = $scope.emailaddress;
		        data.message = $scope.message;
		        data.answers = JSON.stringify($scope.answers);

				var url = 'https://avroshk.000webhostapp.com/scripts/submitanswers.php';
				payload = data;

				var xhr = createCORSRequest('POST', url);
				if (!xhr) {
				    alert('CORS not supported');
				    return;
				}

				xhr.onload = function() {
				    var text = xhr.responseText;
				    alert('Response from CORS request to ' + url + ': ' + text);
				};

				xhr.onerror = function() {
				    alert('Woops, there was an error making the request.');
				};

				xhr.send();	


				// return $http.post(url, payload).then(function(result) {
		  //           console.log('Contact form: success');
	   //          	$scope.formSubmitted = true;
				// 	$scope.fullname = "";
				// 	$scope.emailaddress = "";
				// 	$scope.message = "";
				// 	$scope.answers = {};
				// 	$scope.contactForm.$setPristine();
		  //       }).catch(function(err) {
		  //           console.log('Contact form: failure');
		  //       });
			}
		};

		$scope.loadNextQuestion = function(answer) {
			var currentAnswer = {};
			if (answer !== undefined) {
				currentAnswer = { 'folderId': $scope.currentFolderArray[$scope.folderIndex], 'videoId': $scope.currentQuestionArray[$scope.questionIndex], 'answer': answer  };
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
