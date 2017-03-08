var nomadApp = {}

nomadApp.url = 'https://nomadlist.com/api/v2/list/cities/'
nomadApp.key = 'EDcwZCGMD5gMmdWT3BrI'
nomadApp.client = 'hackeryou'

var cityName;

// ajax call for city input
nomadApp.getCity = function() {
	$.ajax({
		url: nomadApp.url,
		method: 'GET',
		dataType: 'json',
		data: {
			client: nomadApp.client,
			key: nomadApp.key
		}
	}).then(function(cities) {
		var eachCity = cities.result
		
		eachCity.forEach(function(city) {
			console.log(city)
			$('select').append($("<option>").text(city));
		})

		cityName = $('.js-example-basic-single option:selected').text();
		console.log('sdf', cityName);
		
		nomadApp.getCityInfo(cityName);
	})

};

nomadApp.getCityInfo = function(cityName) {
	$.ajax({
			url: nomadApp.url + cityName,
			method: 'GET',
			dataType: 'json',
			data: {
				client: nomadApp.client,
				key: nomadApp.key,
			}
		}).then(function(cityOptions) {
			console.log('hiii', cityOptions);
			var accommodationCost = cityOptions.result[0].cost.airbnb_median.USD;
			var hotelCost = cityOptions.result[0].cost.hotel.USD;
			var coffeeCost = cityOptions.result[0].cost.coffee_in_cafe.USD;
			var beerCost = cityOptions.result[0].cost.beer_in_cafe.USD;
			console.log('please work', accommodationCost, hotelCost, coffeeCost, beerCost);
		})
}

nomadApp.events = function() {
	// when form is submitted
	$('form').on('submit', function(e) {
		e.preventDefault();

		// retrieve the user's inputs
		

	});
}



// user enters city name, forEach loop through entire list of cities
// we take out country and state, user only sees city name

nomadApp.init = function () {
	nomadApp.getCity()
}

$(function() {
	nomadApp.init()
})