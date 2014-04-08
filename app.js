// API Keys, hide when pushing to repo, move to server-side
// Documentation for Marvel API can be found here: http://developer.marvel.com/documentation/getting_started
var PRIV_KEY = "";
var API_KEY = "";

// Initializing angular module
var marvelApp = angular.module('marvelApp', []);

// Creating main controller, considering creating multiple controllers later, including $http module to make http requests in angular
marvelApp.controller('MarvelCtrl', ['$scope', '$http', function($scope, $http){

	// Create Array of Characters, refactor later to Search with query filter
	$scope.options = [
		{name: "Spider-Man", id: 1009610},
		{name: "Avengers", id: 1009165},
		{name: "Captain America", id: 1009220},
		{name: "Iron Man", id: 1009368 },
		{name: "Hulk", id: 1009351},
		{name: "Thor", id: 1009664},
		{name: "Black Widow", id: 1009189},
		{name: "Hawkeye", id: 1009338},
		{name: "Scarlet Witch", id: 1009562},
		{name: "Quicksilver", id: 1009524},
		{name: "X-Men", id: 1009726},
		{name: "Professor X", id: 1009504},
		{name: "Magneto", id: 1009417},
		{name: "Wolverine", id: 1009718},
		{name: "Cyclops", id: 1009257},
		{name: "Phoenix", id: 1009496},
		{name: "Storm", id: 1009629},
		{name: "Colossus", id: 1009243},
		{name: "Psylocke", id: 1009512},
		{name: "Iceman", id: 1009362},
		{name: "Fantastic Four", id: 1009299},
		{name: "Mister Fantastic", id: 1009459},
		{name: "Invisible Woman", id: 1009366},
		{name: "Human Torch", id: 1009356},
		{name: "The Thing", id: 1009662},
		{name: "Doctor Doom", id: 1009281},
		{name: "Galactus", id: 1009312},
		{name: "Silver Surfer", id: 1009592}
	];

	// Create update function that will make a request about the character and return data

	$scope.update = function() {
		// Construct url to make API call
		var charUrl = "http://gateway.marvel.com:80/v1/public/characters/"
		var ts = new Date().getTime(); //Creating timestamp
		var hash = CryptoJS.MD5(ts + PRIV_KEY + API_KEY); // Creating hash of data, as required by the API
		charUrl += $scope.character + "?ts=" + ts + "&apikey=" + API_KEY + "&hash=" + hash;
		// console.log(charUrl); Uncomment for debugging purposes

		// Making request to server for all character information based on unique id
		$http({method: 'GET', url: charUrl, cache: true}).success(function(data){
			$scope.result = data; // Saving result in result variable which will be available in the view
			// console.log(data); Uncomment for debugging
		});

	};

	// Creating function to get comics data based on character chosen
	$scope.getComics = function() {
		$scope.events_show = false; // Setting scope variables for ng-show in the view
		$scope.comics_show = true;
		var comicsUrl = $scope.result.data.results[0].comics.collectionURI;
		var ts = new Date().getTime();
		var hash = CryptoJS.MD5(ts + PRIV_KEY + API_KEY);
		comicsUrl += "?ts=" + ts + "&apikey=" + API_KEY + "&hash=" + hash;

		$http({method: 'GET', url: comicsUrl, cache: true}).success(function(comicdata){
			$scope.comicresult = comicdata;
			// console.log(comicdata); For debugging
			$scope.comicslist = comicdata.data.results;
			

		});
	};

	// Creating function to get events data based on character chosen
	$scope.getEvents = function() {
		$scope.comics_show = false; // Setting scope variables for ng-show in the view
		$scope.events_show = true;
		var eventsUrl = "http://gateway.marvel.com:80/v1/public/characters/"+$scope.character+"/events?orderBy=modified";
		var ts = new Date().getTime();
		var hash = CryptoJS.MD5(ts + PRIV_KEY + API_KEY);
		eventsUrl += "&ts=" + ts + "&apikey=" + API_KEY + "&hash=" + hash;
		// console.log(eventsUrl); For debugging

		$http({method: 'GET', url: eventsUrl, cache: true}).success(function(eventdata){
			$scope.eventresult = eventdata;
			$scope.eventsarray = eventdata.data.results; 
			// console.log(eventdata); For debugging

		});

	}

	// console.log($scope.character); For debugging
}]);


// Angular filter used to increment range
angular.module('marvelApp').filter('toRange', function(){
  return function(input) {
    var lowBound, highBound;
    if (input.length == 1) {       
      lowBound = 0;
      highBound = +input[0] - 1;      
    } else if (input.length == 2) {      
      lowBound = +input[0];
      highBound = +input[1];
    }
    var i = lowBound;
    var result = [];
    while (i <= highBound) {
      result.push(i);
      i++;
    }
    return result;
  }
});