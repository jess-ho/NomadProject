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

		nomadApp.getCost(cityName, accommodationCost, hotelPerDay, coffeeCost, beerCost);
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
		var city = $('city').val()
		var length = $('length').val() / 3 // nomad(1-3 months divided 3 = 3 months in days), expat(4 months divided by 4 = 4 months in days)
		var airbnb = $('airbnb').val()
		var hotel = $('hotel').val()
		var coffee = $('coffee').val()
		var beer = $('beer').val()
		var budget = $('budget').val()

	});
}



// user enters city name, forEach loop through entire list of cities
// we take out country and state, user only sees city name

nomadApp.init = function () {
	nomadApp.getCity('amsterdam-netherlands')
}

$(function() {
	nomadApp.init()
})