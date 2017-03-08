var nomadApp = {}

nomadApp.url = 'https://nomadlist.com/api/v2/list/cities/'
nomadApp.key = 'EDcwZCGMD5gMmdWT3BrI'
nomadApp.client = 'hackeryou'

// ajax call for city input
nomadApp.getCity = function(city) {
	$.ajax({
		url: nomadApp.url + city,
		method: 'GET',
		dataType: 'json',
		data: {
			client: nomadApp.client,
			key: nomadApp.key
		}
	}).then(function(cities) {
		// var nomadCost = cities.result[0].cost.nomad.USD;
		// var expatCost =cities.result[0].cost.expat.USD;
		// console.log(accomdationCost, coffeeCost, beerCost, hotelCost);

		nomadApp.getCost(cities);
	})
}

// ajax call , get cost
nomadApp.getCost = function(cities) {
	var cityName = cities.result[0].info.city.name;
	var accommodationCost = cities.result[0].cost.airbnb_median.USD;
	var hotelCost = cities.result[0].cost.hotel.USD;
	var hotelPerDay = hotelCost / 30;
	var coffeeCost = cities.result[0].cost.coffee_in_cafe.USD;
	var beerCost = cities.result[0].cost.beer_in_cafe.USD;


	
}

nomadApp.events = function() {
	// when form is submitted
	$('form').on('submit', function(e) {
		e.preventDefault();

	// retrieve the user's inputs
		
		// total budget 
		var budget = $('#budget').val();
		// airbnb or hotel
		var stay = $('[name=accommodation]:checked').val();
		// how many pints/day
		var alcohol = $('[name=alcohol]:checked').val();
		// how many cups/day
		var coffee = $('[name=coffee]:checked').val();	

		console.log(`${budget} ${stay} ${alcohol} ${coffee}`)

		// nomadApp.getCity(cities);
	});
}



// user enters city name, forEach loop through entire list of cities
// we take out country and state, user only sees city name

nomadApp.init = function () {
	// nomadApp.getCity('amsterdam-netherlands')
	nomadApp.events()
}

$(function() {
	nomadApp.init()
})