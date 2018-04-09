(function () {
	var app = angular.module('portfolio-website', ['ngRoute','ngAnimate','chart.js','ngMaterial']);

	// Magic sauce, imediate so the value is stored and we don't need to lookup every check
    var _isNotMobile = (function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
        return !check;
    })();

    //simulate mobile phone
    // _isNotMobile = false;

	app.config(function($routeProvider, $locationProvider) {

	    $routeProvider
		    .when("/", {
		    	templateUrl: 'templates/portfolio.html',
				controller: 'PortfolioController'
	    	})
	    	.when("/info", {
	    		controller: 'InfoController',
				templateUrl: 'templates/info.html'
	    	})
	    	.when("/credits", {
	    		controller: 'CreditsController',
				templateUrl: 'templates/credits.html'
	    	})
	    	.when("/listening-test", {
				templateUrl: 'templates/startpage.html'
	    	})
	    	.when("/diarization", {
	    		controller: 'DiarizationController',
				templateUrl: 'templates/diarization.html'
	    	})
	    	.when("/diarization/4", {
				templateUrl: 'templates/diarization-example-4.html'
	    	})
	    	.when("/diarization/5", {
				templateUrl: 'templates/diarization-example-5.html'
	    	})
	    	.when("/diarization/6", {
				templateUrl: 'templates/diarization-example-6.html'
	    	})
	    	.when("/mixinginvr", {
				templateUrl: 'templates/mixinginvr.html',
				controller: 'MixingInVRController'
	    	})
	    	.when("/eclipse", {
	    		controller: 'EclipseController',
				templateUrl: 'templates/eclipse.html'
	    	})
	    	.when("/eclipse/hopkinsville", {
				templateUrl: 'templates/eclipse-hopkinsville.html',
				controller: 'EclipseHopkinsvilleController'
	    	})
	    	.when("/eclipse/atlanta", {
				templateUrl: 'templates/eclipse-atlanta.html',
				controller: 'EclipseAtlantaController'
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

	app.run(function($rootScope, $route, $location){
	   //Bind the `$locationChangeSuccess` event on the rootScope, so that we dont need to
	   //bind in induvidual controllers.

	   $rootScope.$on('$locationChangeSuccess', function() {
	        $rootScope.actualLocation = $location.path();
	    });

	   $rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
	        if($rootScope.actualLocation === newLocation) {
	            if (newLocation == '/eclipse') {
	            	$rootScope.$broadcast('stopplaying');
	            }
	        }
	    });
	});

	// app.controller('RouteController', function ($rootScope, $scope, $route) {
	// 	// $rootScope.$broadcast('loadPage', $route.scurrent.$$route.page);
	// });

	app.controller('TitleController', ['$scope','Page', function ($scope,Page) {
		$scope.Page = Page;
	}]);

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
	}).controller('PortfolioController', function ($rootScope, $scope, Page) {
		$scope.activePage = "home";
		Page.setTitle("Avrosh Kumar");
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
	}).controller('DiarizationSampleController',['$scope','whichBrowser','$location','$anchorScroll', function ($scope, whichBrowser, $location, $anchorScroll) {
		$scope.currentBrowser = whichBrowser();
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

		$scope.file = 'media/content/result_'+$scope.testfile+'.csv';
		$scope.transcription_file = 'media/content/transcription_'+$scope.testfile+'.txt';

		$scope.colorsArray = ["#003366","#99CCCC","#3399CC","#336699","#0099FF"];

		if ($scope.currentBrowser === 'safari' || $scope.currentBrowser === 'ie') {
			$scope.extension = 'm4a';
		} else {
			$scope.extension = 'ogg';
		}

		$scope.csv = [];
		$scope.clips = [];
		$scope.rawFile = new XMLHttpRequest();
		$scope.transcriptionFile = new XMLHttpRequest();

		$scope.rawFile.open("GET", $scope.file, true);

	    $scope.rawFile.onload = function () {
	        if($scope.rawFile.readyState === 4)
	        {
	            if($scope.rawFile.status === 200 || $scope.rawFile.status == 0)
	            {
                	angular.forEach($scope.rawFile.responseText.split('\n'), function(line) {
	                	if (line == "") {

	                	} else {
	                		var parts = line.split(',');
					        var json = {"id":parts[0].trim(), "speaker":parts[1].trim(),"timestamp":parts[2].trim()};
					        $scope.csv.push(json);
					        $scope.numSnippets++;
	                	}
	                });


	                if ($scope.transcription === "true") {
		        		$scope.transcriptionFile.open("GET", $scope.transcription_file, true);
		        		$scope.transcriptionFile.send(null);
		        	} else {
		        		$scope.loadSample();
		        	}
	            }
	        }
	    };

	    $scope.transcriptionFile.onload = function () {
	        if($scope.transcriptionFile.readyState === 4)
	        {
	            if($scope.transcriptionFile.status === 200 || $scope.transcriptionFile.status == 0)
	            {
                	angular.forEach($scope.transcriptionFile.responseText.split('\n'), function(line,id) {
	            		if(id > 1 && id < $scope.numSnippets+2) {
	            			$scope.csv[id-2].text = line;
	            		}
	                });
	                $scope.loadSample();
	            }
	        }
	    };

	    $scope.$on('$locationChangeStart', function(event, newUrl) {
	    	if (newUrl.includes('diarization#')) {
	    		event.preventDefault();
	    	}
		});

		$scope.play = function () {
			$scope.sample.play();
			if ($scope.id < 4) {
				$location.hash($scope.id);
				$anchorScroll();
			}
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
				$scope.snippets[parseInt(obj.id)-1].load('media/audio/'+$scope.extension+'/'+$scope.testfile+'_'+obj.id+'_'+obj.speaker+'.'+$scope.extension);
			});

		};

		$scope.loadSnippets = function () {
			angular.forEach($scope.csv, function(obj) {
				// $scope.snippets[parseInt(obj.id)-1].params.waveColor = $scope.colorsArray[obj.speaker];
				$scope.snippets[parseInt(obj.id)-1].load('media/audio/'+$scope.extension+'/'+$scope.testfile+'_'+obj.id+'_'+obj.speaker+'.'+$scope.extension);
				$scope.snippets[parseInt(obj.id)-1].on('ready', function () {
					$scope.snippetsLoaded();
				});
			});
		};

		$scope.snippetsLoaded = function() {
			$scope.loadedSnippets++;
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

		$scope.loadSample = function () {

			$scope.csv.sort(function(a, b) {
			    return parseFloat(a.speaker) - parseFloat(b.speaker);
			});

            angular.forEach($scope.csv, function(obj) {
				if (parseInt(obj.speaker) === $scope.numSpeakers) {
					$scope.clips.push(obj);
				} else {
					$scope.speakers.push($scope.clips);
					$scope.clips = [];
					$scope.clips.push(obj);
					$scope.numSpeakers++;
				}
			});

			if ($scope.clips.length > 0) {
				$scope.speakers.push($scope.clips);
				$scope.numSpeakers++;
			}

			$scope.$apply();

			$scope.sample = WaveSurfer.create({
			    container: '#sample-'+$scope.testfile,
			    waveColor: 'rgba(0,31,111,0.8)',
			    progressColor: '#999999',
			    // barWidth: 1,
			    // barHeight: 1,
			    height: 50
			});

			$scope.sample.load('/media/audio/'+$scope.extension+'/'+$scope.testfile+'.'+$scope.extension);

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
		};

		$scope.rawFile.send(null);

	}]);

	app.directive('diarization', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/diarization.html',
			controller: 'DiarizationController'

		};
	}).controller('DiarizationController',['$scope','$location','$anchorScroll', 'Page', function ($scope, $location, $anchorScroll, Page) {
		$scope.activePage = "diarization";
		Page.setTitle("Avrosh Kumar | Speaker Diarization");
		$scope.file = 'media/content/rms_threshold.csv';
		$scope.time = [];
		$scope.rms = [];
		$scope.threshold = [];
		$scope.colors = ['#45b7cd','#ff6384', '#ff8e72'];


		$scope.rmsFile = new XMLHttpRequest();
		$scope.rmsFile.open("GET", $scope.file, true);

	    $scope.rmsFile.onload = function () {
	        if($scope.rmsFile.readyState === 4)
	        {
	            if($scope.rmsFile.status === 200 || $scope.rmsFile.status == 0)
	            {
	            	var lineNum = 0;
                	angular.forEach($scope.rmsFile.responseText.split('\n'), function(line) {
	                	if (line == "") {

	                	} else {
	                		if (lineNum == 0) {
	                			$scope.time = line.split(',');
	                		} else if (lineNum == 1) {
	                			$scope.rms = line.split(',');
	                		} else if (lineNum == 2) {
	                			$scope.threshold = line.split(',');
	                		}
	              			lineNum++;
	                	}
	                });

					$scope.labels  = $scope.time;
					$scope.series = ['RMS', 'Threshold','Time'];
				  	$scope.data = [
				  		$scope.rms,
				  		$scope.threshold
				  	];

				  	$scope.onClickChart = function (points, evt) {
				    	console.log(points, evt);
				  	};
				  	$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
				  	$scope.options = {
				  		elements: {
					        line: {
					          	borderWidth: 0.5
					        },
					        point: {
					          	radius: 0
					        }
					    },
				    	scales: {
				      		xAxes: [{
					          	display: false,
					          	ticks: {
				                    callback: function(value, index, values) {
				                        return value+' seconds';
				                    }
				                }
					        }],
				      		yAxes: [{
				          		id: 'y-axis-1',
				          		type: 'linear',
				          		display: true,
				          		position: 'left',
				          		ticks: {
				          			callback: function(value, index, values) {
				                        return value+' dB';
				                    },
						            max: -5,
						            min: -65,
						            stepSize: 10
						        },
				        	},
				        	{
				          		id: 'y-axis-2',
					          	type: 'linear',
					          	display: false,
					          	position: 'right',
					          	ticks: {
						            max: -5,
						            min: -65,
						            stepSize: 10
						        }
				        	}],
				        	gridLines: {
					          	display: true
					        }
				    	}
			  		};
	            }
	        }
	    };

	    $scope.rmsFile.send(null);

	    $scope.showFigure = function(id) {
	    	if (id == 1) {
	    		$location.hash('line-chart');
	    	} else if (id == 2) {
	    		$location.hash('cluster-chart');
	    	}
	    	$anchorScroll();
	    }
	}]);


	app.directive('transcription', function() {
	    return {
	        restrict: "E",
	        replace: true,
	        template: "<div class='transcription'><div class='fillspace'><div>"+
	        		"<div class='transcription-line' ng-repeat='line in lines.slice().reverse() track by $index' "+
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
	            }
	            $scope.clearTranscription = function() {
	            	$scope.lines = [];
	            }
	        }
	    }
	});

	app.directive('mixinginvr', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/mixinginvr.html',
			controller: 'MixingInVRController'
		};
	}).controller('MixingInVRController', function ($scope, $http, $sce, Page) {
		$scope.activePage = "mixinginvr";
		Page.setTitle('Avrosh Kumar | Audio Mixing in VR');


		$http.get('/media/images/AvroshPoster_VRDAW.pdf', {responseType:'arraybuffer'})
		  	.success(function (response) {
		       	var file = new Blob([response], {type: 'application/pdf'});
		       	var fileURL = URL.createObjectURL(file);
		       	$scope.content = $sce.trustAsResourceUrl(fileURL);
		       	// $scope.$apply();
		});

	});

	app.directive('eclipse', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/eclipse.html',
			controller: 'EclipseController'
		};
	}).controller('EclipseController', function ($rootScope, $scope, $http, $sce, Page) {
		Page.setTitle('2017 Solar Eclipse | Sonification');
		$scope.activePage = "eclipse";

	});

	app.directive('eclipseHopkinsville', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/eclipse-hopkinsville.html',
			controller: 'EclipseHopkinsvilleController'
		};
	}).controller('EclipseHopkinsvilleController', function ($rootScope, $scope, Page, weatherData, $window, $interval, weatherHistory) {
		Page.setTitle('2017 Solar Eclipse | Sonification | Hopkinsville');
		$scope.contextCreated = false;
		$scope.showInfo = false;
		$scope.selectedSection = 1;
		$scope.selectedInfoType = 'desc'; // desc, mappings, sound-objs
		$scope.selectedMode = 'movements'; // about, movements, events
		$scope.infoPosition = 0
		$scope.infoHeightStyle = {'height' : '0px'}
		$scope.tableHeightStyle = {'height' : '0px'}

		$scope.eclipseStartTime = moment().utc().year(2017).month(7).date(21).hours(16).minutes(56).seconds(31).milliseconds(9);
		console.log('Hopkinsville: '+$scope.eclipseStartTime.format());

		//////////////////////////////////////////////
		$scope.eclipseC2Time = moment().utc().year(2017).month(7).date(21).hours(18).minutes(24).seconds(41).milliseconds(4);
		$scope.eclipseC4Time = moment().utc().year(2017).month(7).date(21).hours(18).minutes(27).seconds(21).milliseconds(4);
		// $scope.eclipseC2Time = moment().year(2017).month(7).date(21).hours(6).minutes(43).seconds(20);
		// $scope.eclipseC4Time = moment().year(2017).month(7).date(21).hours(6).minutes(46).seconds(00);

		$scope.timeToStartSonification = $scope.eclipseC2Time.clone();
		$scope.timeToStartSonification = $scope.timeToStartSonification.subtract(33, 'minutes');
		$scope.timeToStartSonification = $scope.timeToStartSonification.subtract(20, 'seconds');

		$scope.timeNowinMoment = $scope.timeToStartSonification.clone();

		$scope.part1InPerc = 43;
		$scope.part2InPerc = 79.78;
		$scope.part3InPerc = 86.16;

		$scope.vol = 70;
		$scope.weather = {};
		var weatherid = "4295251"; //Hopkinsville
		// $scope.readyToPlay = false;
		$scope.readyToPlayFinalPiece = false;
		$scope.sonificationStarted = false;
		$scope.touched = false;
		$scope.loading = false;
		$scope.isDesktop = false;
		$scope.isPhone = false;
		$scope.justStoppedPiece = false;
		var bufferLength = 0;
		var dataArray = [];

		var player = 0;
		var alpha = 0.75;
		var prevAmp = 0;

		var weatherStartTime = moment().utc().year(2017).month(7).date(21).hours(17).minutes(00).seconds(00);
		var weatherEndTime = moment().utc().year(2017).month(7).date(21).hours(21).minutes(00).seconds(00);

		$scope.initEclipse = function() {
			$scope.timeNow = 0;
			$scope.isPreTotality = true;
			$scope.isTotality = false;
			$scope.totalityEnded = false;
			$scope.seekTime = moment.duration(0);
			$scope.timeTillTotality = moment.duration($scope.eclipseC2Time.utc().diff($scope.timeNowinMoment));
		};

		$scope.initEclipse();

		$scope.toggleInfo = function() {
			$scope.infoPosition = angular.element(document.querySelector('#eclipseHopkinsvilleContainer .transport-slider')).prop('offsetTop') - 90;
			$scope.infoHeightStyle = { 'height' : $scope.infoPosition+'px' }
			$scope.tableHeightStyle = {'height' : ($scope.infoPosition-80)+'px'}
			$scope.showInfo = !$scope.showInfo;
		}

		$scope.selectMode = function (mode) {
			$scope.selectedMode = mode
		}

		$scope.bgInTotality = {
			'background-color': ''
		};

		$scope.createSoundContext = function () {
			Howler.autoSuspend = false;
			$scope.finalpiece = new Howl({
			  	src: ['media/audio/ogg/Eclipse_sonification_hopkinsville_master.ogg','media/audio/m4a/Eclipse_sonification_hopkinsville_master.m4a'],
			  	html5: true,
			  	volume: $scope.vol/100,
			  	onend: function() {
			    	$interval.cancel(player);
					player = 0;
			  	}
			});

			var analyserNode = Howler.ctx.createAnalyser();
			var sourceNode = Howler.ctx.createMediaElementSource($scope.finalpiece._sounds[0]._node);


			//Clear listener after first call.
			$scope.finalpiece.once('load', function() {
			  	console.log('Final piece Loaded!');
			  	$scope.readyToPlayFinalPiece = true;
			  	$scope.contextCreated = true;
			  	$scope.loading = false;
			  	$scope.lengthOfFinalPiece = $scope.finalpiece.duration();

					console.log($scope.lengthOfFinalPiece);

			  	sourceNode.connect(analyserNode);
		    	analyserNode.connect(Howler.ctx.destination);
		    	analyserNode.fftSize = 2048;
				bufferLength = analyserNode.fftSize;
				dataArray = new Uint8Array(bufferLength);
				analyserNode.getByteTimeDomainData(dataArray);

				if (_isNotMobile) {
					window.requestAnimationFrame(updateWave);
				} else {
					$scope.waves.waves[0].amplitude = 75;
				}
		    	$scope.$apply();
			});

			$scope.playPiece = function () {
				$scope.seekTo($scope.seekTime.asSeconds());
				if (!$scope.finalpiece.playing()) {
					$scope.finalpiece.play();
					if (!player) {
						player = $interval(tick, 1000);
					}
				}
			}

			$scope.playOrPausePiece = function () {
				if ($scope.readyToPlayFinalPiece) {
					if ($scope.finalpiece.playing()) {
						$scope.finalpiece.pause();
						$interval.cancel(player);
						player = 0;
					} else {
						$scope.playPiece();
					}
				}
			};

			$scope.seekTo = function(time) {
				$scope.finalpiece.seek(time);
			};

			$scope.stopPiece = function () {
				$scope.justStoppedPiece = true;
				$interval.cancel(player);
				player = 0;
				$scope.finalpiece.stop();
				$scope.initEclipse();
			};

			$scope.forwardToTotality = function () {
				$scope.timeNow = 1770;
				$scope.playPiece();
			};

			var tick = function() {
				let now = $scope.timeNowinMoment.clone();
				now.add($scope.timeNow, 'seconds');
				$scope.timeNow++;
		    	$scope.calcTime(now);
			}

			$scope.calcTime = function(now) {
				$scope.timeTillTotality = moment.duration($scope.eclipseC2Time.utc().diff(now));
	    		$scope.timeInTotality = moment.duration(now.diff($scope.eclipseC2Time.utc()));
	    		$scope.timeAfterTotality = moment.duration(now.diff($scope.eclipseC4Time.utc()));

	    		$scope.bgInTotality = {
					'background-color': ''
				};

	    		if ($scope.timeTillTotality.asSeconds() < 0 && $scope.timeAfterTotality.asSeconds() < 0) {
	    			//Totality
	    			$scope.isPreTotality = false;
	    			$scope.isTotality = true;
	    			$scope.totalityEnded = false;

	    			if ($scope.timeInTotality.asSeconds() <= 80) {
	    				$scope.bgInTotality = {
							'background-color': 'rgba(20,20,20,'+($scope.timeInTotality.asSeconds()/80)+')'
						};
	    			} else {
	    				$scope.bgInTotality = {
							'background-color': 'rgba(20,20,20,'+(2-($scope.timeInTotality.asSeconds()/80))+')'
						};
	    			}
	    		}  else if ($scope.timeAfterTotality.asSeconds() > 0) {
	    			//Post-totality
	    			$scope.isPreTotality = false;
	    			$scope.isTotality = false;
	    			$scope.totalityEnded = true;
	    			$scope.bgInTotality = {
						'background-color': 'rgba(255,255,0,0.3)'
					};
	    		} else {
	    			//Pre-totality
					$scope.isPreTotality = true;
					$scope.isTotality = false;
					$scope.totalityEnded = false;
	    		}

	    		if ($scope.seekTimeChanged) {
		    		$scope.seekTime = moment.duration(now.diff($scope.timeToStartSonification));
		    		$scope.seekTo($scope.seekTime.asSeconds());
		    		$scope.seekTimeChanged = false;
	    		}

		    	$scope.timeTillEclipseSonification = moment.duration($scope.timeToStartSonification.diff(now));
			};

			$scope.sonificationStarted = true;
			$scope.playPiece();

			$rootScope.$on('stopplaying', function () {
	    		$scope.stopPiece();
			});

			$scope.$watch('vol', function (newVal, oldVal, scope) {
				Howler.volume(newVal/100);
			});

			$scope.$watch('timeNow', function (newVal, oldVal, scope) {
				if (newVal-oldVal > 1 || newVal < oldVal) {
					$scope.seekTimeChanged = true;

					let now = $scope.timeNowinMoment.clone();
					now.add(newVal, 'seconds');

					$scope.calcTime(now);

					if ($scope.justStoppedPiece) {
						$scope.justStoppedPiece = false;
					} else {
						$scope.playPiece();
					}

					if (newVal == $scope.lengthOfFinalPiece) {
						$interval.cancel(player);
						player = 0;
						$scope.finalpiece.stop();
					}

					// select section based on time
					if ($scope.timeNow >=0 && $scope.timeNow < $scope.part1InPerc*$scope.lengthOfFinalPiece/100) {
						$scope.selectSection(1);
					} else if ($scope.timeNow >= $scope.part1InPerc*$scope.lengthOfFinalPiece/100 && $scope.timeNow < $scope.part2InPerc*$scope.lengthOfFinalPiece/100) {
						scope.selectSection(2);
					} else if ($scope.timeNow >= $scope.part2InPerc*$scope.lengthOfFinalPiece/100 && $scope.timeNow < $scope.part3InPerc*$scope.lengthOfFinalPiece/100) {
						scope.selectSection(3);
					} else if ($scope.timeNow >= $scope.part3InPerc*$scope.lengthOfFinalPiece/100 && $scope.timeNow <= $scope.lengthOfFinalPiece) {
						scope.selectSection(4);
					}
				}
			});

			function updateWave() {

				analyserNode.getByteTimeDomainData(dataArray);

				let amp = 0;

				// Iterate through buffer to get the max amplitude for this frame
				for (var i = 0; i < dataArray.length; i++) {
					var loud = Math.abs(dataArray[i]/128.0);
					if(loud > amp) {
					  amp = loud;
					}
				}

				amp = amp * (1-alpha) + alpha * prevAmp;
				$scope.waves.waves[0].amplitude = (amp-1)*1000;
				prevAmp = amp;

				window.requestAnimationFrame(updateWave);
			}

			$scope.selectSection = function (section) {
				$scope.selectedSection = section

				switch(section) {
					case 1:
						if ($scope.timeNow >=0 && $scope.timeNow < $scope.part1InPerc*$scope.lengthOfFinalPiece/100) {

						} else {
							$scope.timeNow = 0;
						}
						break;
					case 2:
						if ($scope.timeNow >= $scope.part1InPerc*$scope.lengthOfFinalPiece/100 && $scope.timeNow < $scope.part2InPerc*$scope.lengthOfFinalPiece/100) {

						} else {
							$scope.timeNow = $scope.part1InPerc*$scope.lengthOfFinalPiece/100;
						}
						break;
					case 3:
						if ($scope.timeNow >= $scope.part2InPerc*$scope.lengthOfFinalPiece/100 && $scope.timeNow < $scope.part3InPerc*$scope.lengthOfFinalPiece/100) {

						} else {
							$scope.timeNow = $scope.part2InPerc*$scope.lengthOfFinalPiece/100;
						}
						break;
					case 4:
						if ($scope.timeNow >= $scope.part3InPerc*$scope.lengthOfFinalPiece/100 && $scope.timeNow <= $scope.lengthOfFinalPiece) {

						} else {
							$scope.timeNow = $scope.part3InPerc*$scope.lengthOfFinalPiece/100;
						}
						break;
					default:
						break;
				}
			}

			$scope.selectInfoType = function (infoType) {
				$scope.selectedInfoType = infoType
			}
		};


		if (_isNotMobile) {
			//is desktop
			$scope.isDesktop = true;
			console.log(_isNotMobile);
			$scope.createSoundContext();
			$scope.contextCreated = true;
			$scope.touched = true;
		} else {
			//is mobile
			$scope.isPhone = true;

		}

		$scope.touchToStart = function () {
			if (!_isNotMobile && !$scope.contextCreated) {
				$scope.createSoundContext();
				$scope.touched = true;
				$scope.loading = true;
			}
		};

		// function getWeatherData() {
		// 	weatherData.getAll(weatherid)
		//         .then(function (response) {
		//             console.log(response.data);
		//             $scope.weather = response.data
		//         }, function (error) {
		//             console.log('Unable to load weather data: ' + error.message);
		//         });
		// }
		// function getEclipseTemperature() {
		// 	weatherHistory.get(weatherid,weatherStartTime,weatherEndTime)
		//         .then(function (response) {
		//             console.log(response.data);
		//             $scope.weather.history = response.data;
		//         }, function (error) {
		//             console.log('Unable to load weather data: ' + error.message);
		//         });
		// }
		// getWeatherData();
		// getEclipseTemperature();
		// setInterval(getWeatherData,600000*5);

		$scope.waves = new SineWaves({
		  	el: waveform,
		  	speed: 8,
		  	// Ease function from left to right
		  	ease: 'SineInOut',

		  	// Specific how much the width of the canvas the waves should be
		  	// This can either be a number or a percent
		  	waveWidth: '100%',

		  	// An array of wave options
		  	waves: [
		    	{
			      	timeModifier: 1,
			      	lineWidth: 2,
			      	amplitude: 0,
			      	wavelength: $window.innerWidth,
			      	strokeStyle: 'rgba(20, 20, 20, 1)',
			      	type: 'sine'       // Wave type
			    }
		  	],

		  	// Perform any additional initializations here
		  	initialize: function (){},

		  	// This function is called whenver the window is resized
		  	resizeEvent: function() {
		  		var canvas = document.getElementById('waveform');
		  		if (canvas) {
		  			canvas.style.width = $window.innerWidth+'px';
		  		}
		  	}
		});
	});

	app.directive('eclipseAtlanta', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/eclipse-atlanta.html',
			controller: 'EclipseAtlantaController'
		};
	}).controller('EclipseAtlantaController', function ($rootScope, $scope, Page, weatherData, $window, $interval, weatherHistory) {
		Page.setTitle('2017 Solar Eclipse | Sonification | Atlanta');
		$scope.contextCreated = false;

		$scope.eclipseStartTime = moment().utc().year(2017).month(7).date(21).hours(17).minutes(05).seconds(50).milliseconds(5);

		console.log('Atlanta: '+$scope.eclipseStartTime.format());

		////////////////
		$scope.maxEclipseTime = moment().utc().year(2017).month(7).date(21).hours(18).minutes(36).seconds(44).milliseconds(9);
		// $scope.maxEclipseTime = moment().year(2017).month(7).date(21).hours(7).minutes(09).seconds(20);

		$scope.maxEclipseTime_30sbefore = $scope.maxEclipseTime.clone();
		$scope.maxEclipseTime_30safter = $scope.maxEclipseTime.clone();

		$scope.maxEclipseTime_30sbefore = $scope.maxEclipseTime_30sbefore.subtract(30,'seconds');
		$scope.maxEclipseTime_30safter = $scope.maxEclipseTime_30safter.add(30,'seconds');


		$scope.timeToStartSonification = $scope.maxEclipseTime.clone();
		$scope.timeToStartSonification = $scope.timeToStartSonification.subtract(34, 'minutes');
		$scope.timeToStartSonification = $scope.timeToStartSonification.subtract(20, 'seconds');

		$scope.timeNowinMoment = $scope.timeToStartSonification.clone();

		$scope.vol = 70;
		$scope.weather = {};
		var weatherid = "4180439"; //Atlanta
		// $scope.readyToPlay = false;
		$scope.readyToPlayFinalPiece = false;
		$scope.sonificationStarted = false;
		$scope.touched = false;
		$scope.loading = false;
		$scope.isDesktop = false;
		$scope.isPhone = false;
		$scope.justStoppedPiece = false;
		var bufferLength = 0;
		var dataArray = [];

		var player = 0;
		var alpha = 0.75;
		var prevAmp = 0;

		var weatherStartTime = moment().utc().year(2017).month(7).date(21).hours(17).minutes(00).seconds(00);
		var weatherEndTime = moment().utc().year(2017).month(7).date(21).hours(21).minutes(00).seconds(00);

		$scope.initEclipse = function() {
			$scope.timeNow = 0;
			$scope.isPreTotality = true;
			$scope.totalityEnded = false;
			$scope.seekTime = moment.duration(0);
			$scope.timeTillTotality = moment.duration($scope.maxEclipseTime.utc().diff($scope.timeNowinMoment));
		};

		$scope.initEclipse();

		$scope.bgInTotality = {
			'background-color': ''
		};


		$scope.createSoundContext = function () {
			Howler.autoSuspend = false;

			$scope.finalpiece = new Howl({
			  	src: ['media/audio/ogg/Eclipse_sonification_atlanta_master.ogg','media/audio/m4a/Eclipse_sonification_atlanta_master.m4a'],
			  	html5: true,
			  	volume: $scope.vol/100,
			  	onend: function() {
			    	$interval.cancel(player);
					player = 0;
			  	}
			});

			var analyserNode = Howler.ctx.createAnalyser();
			var sourceNode = Howler.ctx.createMediaElementSource($scope.finalpiece._sounds[0]._node);

			//Clear listener after first call.
			$scope.finalpiece.once('load', function() {
			  	console.log('Final piece Loaded!');
			  	$scope.readyToPlayFinalPiece = true;
			  	$scope.contextCreated = true;
			  	$scope.loading = false;
			  	$scope.lengthOfFinalPiece = $scope.finalpiece.duration();
			  	sourceNode.connect(analyserNode);
		    	analyserNode.connect(Howler.ctx.destination);
		    	analyserNode.fftSize = 2048;
				bufferLength = analyserNode.fftSize;
				dataArray = new Uint8Array(bufferLength);
				analyserNode.getByteTimeDomainData(dataArray);

				if (_isNotMobile) {
					window.requestAnimationFrame(updateWave);
				} else {
					$scope.waves.waves[0].amplitude = 75;
				}
		    	$scope.$apply();
			});

			$scope.playPiece = function () {
				$scope.seekTo($scope.seekTime.asSeconds());
				if (!$scope.finalpiece.playing()) {
					$scope.finalpiece.play();
					if (!player) {
						player = $interval(tick, 1000);
					}
				}
			}

			$scope.playOrPausePiece = function () {
				if ($scope.readyToPlayFinalPiece) {
					if ($scope.finalpiece.playing()) {
						$scope.finalpiece.pause();
						$interval.cancel(player);
						player = 0;
					} else {
						$scope.playPiece();
					}
				}
			};

			$scope.seekTo = function(time) {
				$scope.finalpiece.seek(time);
			};

			$scope.stopPiece = function () {
				$scope.justStoppedPiece = true;
				$interval.cancel(player);
				player = 0;
				$scope.finalpiece.stop();
				$scope.initEclipse();
			};

			$scope.forwardToTotality = function () {
				$scope.timeNow = 1913;
				$scope.playPiece();
			};

			$scope.calcTime = function(now) {
				$scope.timeToTurnDark = moment.duration($scope.maxEclipseTime_30sbefore.utc().diff(now));
	    		$scope.timeTillTotality = moment.duration($scope.maxEclipseTime.utc().diff(now));
	    		$scope.timeToTurnBright = moment.duration($scope.maxEclipseTime_30safter.utc().diff(now));
	    		$scope.timeAfterTotality = moment.duration(now.diff($scope.maxEclipseTime.utc()));

	    		$scope.bgInTotality = {
					'background-color': ''
				};

				if ($scope.timeTillTotality.asSeconds() <= 30 && $scope.timeTillTotality.asSeconds() > 0) {
					$scope.bgInTotality = {
						'background-color': 'rgba(20,20,20,'+(1-($scope.timeTillTotality.asSeconds()/30))+')'
					};
				} else if ($scope.timeTillTotality.asSeconds() <= 0 && $scope.timeTillTotality.asSeconds() > -30) {
					$scope.bgInTotality = {
						'background-color': 'rgba(20,20,20,'+(($scope.timeTillTotality.asSeconds()+30)/30)+')'
					};
				}

				if ($scope.timeTillTotality.asSeconds() > 0) {
	    			$scope.isPreTotality = true;
	    			$scope.totalityEnded = false;
	    		} else {
	    			$scope.isPreTotality = false;
	    			$scope.totalityEnded = true;
	    		}


	    		if ($scope.timeAfterTotality.asSeconds() > 30) {
	    			$scope.bgInTotality = {
						'background-color': 'rgba(255,255,0,0.3)'
					};
	    		}

	    		if ($scope.seekTimeChanged) {
		    		$scope.seekTime = moment.duration(now.diff($scope.timeToStartSonification));
		    		$scope.seekTo($scope.seekTime.asSeconds());
		    		$scope.seekTimeChanged = false;
	    		}

		    	$scope.timeTillEclipseSonification = moment.duration($scope.timeToStartSonification.diff(now));
			};

			var tick = function() {
				let now = $scope.timeNowinMoment.clone();
				now.add($scope.timeNow, 'seconds');
				$scope.timeNow++;
		    	$scope.calcTime(now);
			};

			$scope.sonificationStarted = true;
			$scope.playPiece();

			$rootScope.$on('stopplaying', function () {
	    		$scope.stopPiece();
			});

			$scope.$watch('vol', function (newVal, oldVal, scope) {
				Howler.volume(newVal/100);
			});

			$scope.$watch('timeNow', function (newVal, oldVal, scope) {
				if (newVal-oldVal > 1 || newVal < oldVal) {
					$scope.seekTimeChanged = true;

					let now = $scope.timeNowinMoment.clone();
					now.add(newVal, 'seconds');

					$scope.calcTime(now);

					if ($scope.justStoppedPiece) {
						$scope.justStoppedPiece = false;
					} else {
						$scope.playPiece();
					}

					if (newVal == $scope.lengthOfFinalPiece) {
						$interval.cancel(player);
						player = 0;
						$scope.finalpiece.stop();
					}
				}
			});

			function updateWave() {

				analyserNode.getByteTimeDomainData(dataArray);

				let amp = 0;

				// Iterate through buffer to get the max amplitude for this frame
				for (var i = 0; i < dataArray.length; i++) {
					var loud = Math.abs(dataArray[i]/128.0);
					if(loud > amp) {
					  amp = loud;
					}
				}

				amp = amp * (1-alpha) + alpha * prevAmp;
				$scope.waves.waves[0].amplitude = (amp-1)*1000;
				prevAmp = amp;

				window.requestAnimationFrame(updateWave);
			}


		};

		$scope.waves = new SineWaves({
		  	el: waveform,
		  	speed: 8,
		  	// Ease function from left to right
		  	ease: 'SineInOut',

		  	// Specific how much the width of the canvas the waves should be
		  	// This can either be a number or a percent
		  	waveWidth: '100%',

		  	// An array of wave options
		  	waves: [
		    	{
			      	timeModifier: 1,
			      	lineWidth: 2,
			      	amplitude: 0,
			      	wavelength: $window.innerWidth,
			      	strokeStyle: 'rgba(20, 20, 20, 1)',
			      	type: 'sine'       // Wave type
			    }
		  	],

		  	// Perform any additional initializations here
		  	initialize: function (){},

		  	// This function is called whenever the window is resized
		  	resizeEvent: function() {
		  		var canvas = document.getElementById('waveform');
		  		if (canvas) {
		  			canvas.style.width = $window.innerWidth + 'px';
		  		}
		  	}
		});

		if (_isNotMobile) {
			//is desktop
			$scope.isDesktop = true;
			console.log(_isNotMobile);
			$scope.createSoundContext();
			$scope.contextCreated = true;
			$scope.touched = true;
		} else {
			//is mobile
			$scope.isPhone = true;
		}

		$scope.touchToStart = function () {
			if (!_isNotMobile && !$scope.contextCreated) {
				$scope.createSoundContext();
				$scope.touched = true;
				$scope.loading = true;
			}
		};


		// function getWeatherData() {
		// 	weatherData.getAll(weatherid)
		//         .then(function (response) {
		//         	// console.log($scope.count++);
		//             console.log(response.data);
		//             $scope.weather = response.data
		//         }, function (error) {
		//             console.log('Unable to load weather data: ' + error.message);
		//         });
		// }
		// function getEclipseTemperature() {
		// 	weatherHistory.get(weatherid,weatherStartTime,weatherEndTime)
		//         .then(function (response) {
		//         	// console.log($scope.count++);
		//             console.log(response.data);
		//             $scope.weather.history = response.data;
		//         }, function (error) {
		//             console.log('Unable to load weather data: ' + error.message);
		//         });
		// }
		// getWeatherData();
		// getEclipseTemperature();
		// setInterval(getWeatherData,600000*5);

	});

	app.directive('info', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/info.html',
			controller: 'InfoController'
		};
	}).controller('InfoController', function ($scope, Page) {
		$scope.activePage = "info";
		Page.setTitle('Avrosh Kumar | Information');
	});

	app.directive('credits', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/credits.html',
			controller: 'CreditsController'
		};
	}).controller('CreditsController', function ($scope, Page) {
		$scope.activePage = "credits";
		Page.setTitle('Avrosh Kumar | Credits');
	});

	app.directive('startpage', function () {
		return {
			restrict: 'E',
			templateUrl: 'templates/startpage.html',
			controller: 'StartpageController'
		};
	}).controller('StartpageController', function ($scope) {

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

	app.factory('weatherData',['$http', function($http) {

		var url = 'http://api.openweathermap.org/data/2.5/weather?APPID=38661ee84bb22e906cd5f072ed37e044&units=imperial&id=';
		var weatherData = {};

		weatherData.getAll = function (id) {
        	return $http.get(url+id);
    	};

		return weatherData;
	}]);

	app.factory('weatherHistory',['$http', function($http) {

		var url = 'http://api.openweathermap.org/data/2.5/history/city?APPID=38661ee84bb22e906cd5f072ed37e044&units=imperial&type=hour&id=';
		var weatherHistory = {};

		weatherHistory.get = function (id,start,end) {
        	return $http.get(url+id+'&start='+start+'&end='+end);
    	};

		return weatherHistory;
	}]);

	app.factory('Page', function() {
	   	var title = 'Avrosh Kumar';
	   	return {
	     	title: function() { return title; },
	     	setTitle: function(newTitle) { title = newTitle; }
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

})();
