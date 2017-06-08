(function () {
	var app = angular.module('portfolio-website', ['ngRoute','ngAnimate']);

	app.config(function($routeProvider, $locationProvider) {
	    $routeProvider
		    .when("/", {
		    	templateUrl: 'templates/portfolio.html'
				// template: '<div></div>'
	    	})
	    	.when("/info", {
	    		controller: 'InfoController',
				templateUrl: 'templates/info.html'
	    	})
	    	.when("/listening-test", {
				templateUrl: 'templates/startpage.html'
	    	})
	    	.when("/diarization", {
	    		controller: 'DiarizationController',
				templateUrl: 'templates/diarization.html'
	    	})
	    	.when("/birdsong-segmentation", {
				templateUrl: 'templates/birdsong-segmentation.html'
	    	})
	    	.otherwise({
	    		redirectTo: '/'
	    	});

	    // use the HTML5 History API
        $locationProvider.html5Mode(true);
	});

	// app.controller('RouteController', function ($rootScope, $scope, $route) {
	// 	// $rootScope.$broadcast('loadPage', $route.scurrent.$$route.page);
	// });

	app.controller('MainController', ['$rootScope','$scope','whichBrowser', function ($rootScope, $scope, whichBrowser) {
		var currentBrowser = whichBrowser();
		$scope.teststarted = false;
		$scope.testended = false;

   		$scope.startTest = function () {
			$scope.teststarted = true;
		};
	}]);

	app.directive('portfolio', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/portfolio.html',
			controller: 'PortfolioController'
		};
	}).controller('PortfolioController', function ($scope) {
	});

	app.directive('portfolioHeader', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/portfolio-header.html',
			controller: 'PortfolioHeaderController'
		};
	}).controller('PortfolioHeaderController', function ($scope) {
	});

	app.directive('diarizationSample', function () {
		return {
			restrict: 'E',
			scope: {
            	testfile: '@testfile',
            	id: '@id',
            	transcription: '@transcription'
        	},
			templateUrl: 'templates/diarization-sample.html',
			link: function ($scope, $element, $attrs) {
				$scope.testfile = $attrs.testfile;
			},
			controller: 'DiarizationSampleController'
			
		};
	}).controller('DiarizationSampleController',['$scope', function ($scope) {
		$scope.pageLoaded = false;
		$scope.numSpeakers = 0;
		$scope.numSnippets = 0;
		$scope.speakers = [];
		$scope.snippets = [];
		$scope.loadedSnippets = 0;
		$scope.areSnippetsLoaded = false;
		$scope.currentPlayTime = 0;
		$scope.activeSpeaker = -1; 
		$scope.activeClip = -1; 
		$scope.oldActiveClip = -1;
		$scope.loadingComplete = false;

		var file = 'media/content/result_'+$scope.testfile+'.csv';
		var transcription_file = 'media/content/transcription_'+$scope.testfile+'.txt';


		$scope.colorsArray = ["#003366","#99CCCC","#3399CC","#336699","#0099FF"];


		$scope.csv = [];

		
		var rawFile = new XMLHttpRequest();
		var transcriptionFile = new XMLHttpRequest();
	    
	    rawFile.open("GET", file, false);
	    transcriptionFile.open("GET", transcription_file, false);

	    rawFile.onreadystatechange = function ()
	    {
	        if(rawFile.readyState === 4)
	        {
	            if(rawFile.status === 200 || rawFile.status == 0)
	            {	
	                angular.forEach(rawFile.responseText.split('\n'), function(line) {
	                	if (line == "") {

	                	} else {
	                		var parts = line.split(',');
					        var json = {"id":parts[0].trim(), "speaker":parts[1].trim(),"timestamp":parts[2].trim()};
					        $scope.csv.push(json);
					        $scope.numSnippets++;
	                	}
	                });	 
	                transcriptionFile.send(null);         															               
	            }
	        }
	    }

	    transcriptionFile.onreadystatechange = function ()
	    {
	        if(rawFile.readyState === 4)
	        {
	            if(rawFile.status === 200 || rawFile.status == 0)
	            {	
	                angular.forEach(transcriptionFile.responseText.split('\n'), function(line,id) {
	            		if(id > 1 && id < $scope.numSnippets+2) {
	            			$scope.csv[id-2].text = line;
	            		}
	                });	          															               
	            }
	        }
	    }

	    rawFile.send(null);

	    $scope.csv.sort(function(a, b) {
		    return parseFloat(a.speaker) - parseFloat(b.speaker);
		});
	    
	    var clips = [];

		angular.forEach($scope.csv, function(obj) {
			if (parseInt(obj.speaker) === $scope.numSpeakers) {
				clips.push(obj);
			} else {
				$scope.speakers.push(clips);
				clips = [];
				clips.push(obj);
				$scope.numSpeakers++;
			}
		});

		if (clips.length > 0) {
			$scope.speakers.push(clips);
			$scope.numSpeakers++;
		}

	
		$scope.play = function () {
			$scope.sample.play();
		}

		$scope.pause = function () {
			$scope.sample.pause();
		}

		$scope.stop = function () {
			$scope.sample.stop();
			$scope.clearTranscription();
			$scope.currentPlayTime = 0;
			$scope.activeSpeaker = -1;
			$scope.activeClip = -1;
		}

		$scope.reloadSnippets = function () {

			angular.forEach($scope.csv, function(obj) {
		
				var widthPerc = $scope.snippets[parseInt(obj.id)-1].getDuration()*100/$scope.sample.getDuration();
				
				angular.forEach($scope.speakers[parseInt(obj.speaker)], function (clip,i) {
					if (clip.id == obj.id) {
						
						var marginPerc = clip.timestamp*100/$scope.sample.getDuration(); 
						
						$scope.speakers[parseInt(obj.speaker)][i].margin = marginPerc;
						$scope.speakers[parseInt(obj.speaker)][i].clipwidth = $scope.snippets[parseInt(obj.id)-1].getDuration();
						$scope.speakers[parseInt(obj.speaker)][i].clipboundary = parseFloat(obj.timestamp) + parseFloat($scope.speakers[parseInt(obj.speaker)][i].clipwidth);
						$scope.speakers[parseInt(obj.speaker)][i].style = "left: "+marginPerc+"%; width: "+widthPerc+"% !important;";

					}
				});
	
			});
			$scope.loadingComplete = true;
			$scope.$apply();
			angular.forEach($scope.csv, function(obj) {	
				$scope.snippets[parseInt(obj.id)-1].load('media/audio/'+$scope.testfile+'_'+obj.id+'_'+obj.speaker+'.wav');
			});

		};

		$scope.loadSnippets = function () {
			angular.forEach($scope.csv, function(obj) {
				// $scope.snippets[parseInt(obj.id)-1].params.waveColor = $scope.colorsArray[obj.speaker];
				$scope.snippets[parseInt(obj.id)-1].load('media/audio/'+$scope.testfile+'_'+obj.id+'_'+obj.speaker+'.wav');
				$scope.snippets[parseInt(obj.id)-1].on('ready', function () {
					$scope.snippetsLoaded();
				});
			});
		};

		$scope.snippetsLoaded = function() {
			$scope.loadedSnippets++;
			// console.log('SippetLoaded: '+$scope.loadedSnippets);
			if ($scope.loadedSnippets === $scope.numSnippets) {
				$scope.areSnippetsLoaded = true;
				$scope.reloadSnippets();
			}
			
		}

		$scope.isReady = function () {
			$scope.snippets = [];
			for (var i=0; i<$scope.numSnippets; i++) {

				var id = '#snippet-'+(i+1).toString()+$scope.testfile;
				var snippet = WaveSurfer.create({
				    container: id,
				    waveColor: '#336699',
				    progressColor: '#999999',
				    interact: false,
				    cursorWidth: 0,
				    // barWidth: 1,
		    		// barHeight: 1,
				    height: 30
				});

				$scope.snippets.push(snippet);
			}

			$scope.loadSnippets();
		};

		$scope.$watch('pageLoaded', function(){
			if ($scope.pageLoaded) {
			    $scope.sample = WaveSurfer.create({
				    container: '#sample-'+$scope.testfile,
				    waveColor: 'rgba(0,31,111,0.8)',
				    progressColor: '#999999',
				    // barWidth: 1,
				    // barHeight: 1,
				    height: 50
				});

				$scope.sample.load('media/audio/'+$scope.testfile+'.wav');
				$scope.sample.on('ready', function() {
					$scope.isReady();
				});
				
				$scope.sample.on('audioprocess', function() {
					$scope.currentPlayTime = $scope.sample.getCurrentTime();

					angular.forEach($scope.speakers, function (speaker) {
						angular.forEach(speaker, function (clip) {
							if ($scope.currentPlayTime > clip.timestamp && $scope.currentPlayTime < clip.clipboundary) {
								$scope.activeSpeaker = clip.speaker;
								$scope.activeClip = clip.id;

								if ($scope.oldActiveClip === $scope.activeClip) {

								} else {
									$scope.oldActiveClip = $scope.activeClip;
									$scope.appendToTranscription(clip);
								}
							} 
						})
					});


					$scope.$apply();
				});

				$scope.sample.on('finish', function() {
					$scope.currentPlayTime = 0;
					$scope.activeSpeaker = -1;
					$scope.oldActiveClip = -1;
					$scope.clearTranscription();
					$scope.$apply();
				});
			}
			
		});
	}]);

	app.directive('diarization', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/diarization.html',
			controller: 'DiarizationController'
			
		};
	}).controller('DiarizationController',['$scope', function ($scope) {

		

	}]);

	app.directive('transcription', function() {
    return {
        restrict: "E",
        replace: true, 
        template: "<div class='transcription'><div class='fillspace'><div>"+
        		"<div class='transcription-line' ng-repeat='line in lines track by $index' "+
        		"ng-class=\"activeClip === line.id ? 'underline' : ''\">"+
        			"<span>{{line.text}}</span>"+
        		"</div>"+
        	"</div>",
        controller: function($scope, $element, $attrs) {
        	$scope.lines = [];
        },
        link: function($scope, $element, $attrs) {
            $scope.appendToTranscription = function(clip) {
				$scope.lines[clip.id] = clip;
				// console.log(clip.text);
            }
            $scope.clearTranscription = function() {
            	$scope.lines = [];
            }
        }
    }
});

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
		$scope.numFolders = 6;
		$scope.numQuestions = 6;
		$scope.currentFolderArray = [];
		$scope.currentQuestionArray = [];
		$scope.videoPlaying = false;

		$scope.folderIndex = -1;
		$scope.questionIndex = -1;
		
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

				var videoLocal = document.createElement('video');
				source.setAttribute('src',$scope.videoSrc);
				videoLocal.appendChild(source);
				$scope.video = videoLocal;
				$scope.videoContainer.appendChild(videoLocal);
				$scope.video.onplay = onPlayHandle;
				$scope.video.onpause = onPauseHandle;
				$scope.video.play();
			}
		};

		function onPlayHandle() {
			$scope.videoPlaying = true;
			$scope.$apply();
		};

		function onPauseHandle() {
			$scope.videoPlaying = false;
			$scope.videoContainer.removeChild($scope.videoContainer.childNodes[0]);
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
