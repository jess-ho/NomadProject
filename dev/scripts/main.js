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
		console.log('everything', cities)
		// var eachCity = cities.result[0].info.city
		// // var accomdationCost = cities.result[0].cost.airbnb_median.USD;
		// // var hotelCost = cities.result[0].cost.hotel.USD;
		// // var coffeeCost = cities.result[0].cost.coffee_in_cafe.USD;
		// // var beerCost = cities.result[0].cost.beer_in_cafe.USD;
		// // var nomadCost = cities.result[0].cost.nomad.USD;
		// // var expatCost =cities.result[0].cost.expat.USD;
		// // console.log(accomdationCost, coffeeCost, beerCost, hotelCost);
		// console.log('test', eachCity)
		// ea.forEach(function)
	})
}

// ajax call , get cost
nomadApp.getCost = function() {
	
}



// user enters city name, forEach loop through entire list of cities
// we take out country and state, user only sees city name

nomadApp.init = function () {
	nomadApp.getCity('toronto-canada');
}

$(function() {
	nomadApp.init()
})