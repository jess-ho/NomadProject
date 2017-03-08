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
			var cityClean = city.replace(/-/g, " ");
			$('select').append($("<option>").text(cityClean).val(city));
		})

		cityName = $('.js-example-basic-single option:selected').text();
		// console.log('sdf', cityName);
		
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
			// console.log('hiii', cityOptions);
			var accommodationCost = cityOptions.result[0].cost.airbnb_median.USD;
			var hotelCost = cityOptions.result[0].cost.hotel.USD;
			var coffeeCost = cityOptions.result[0].cost.coffee_in_cafe.USD;
			var beerCost = cityOptions.result[0].cost.beer_in_cafe.USD;
			// console.log('please work', accommodationCost, hotelCost, coffeeCost, beerCost);
		})

}

nomadApp.events = function() {
	$('form#cityInput').on('submit', function(e) {
		e.preventDefault();
	});


	// when form is submitted
	$('form#costInput').on('submit', function(e) {
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

		var calculations = 3;
		// calcuations wills have to change based on math function that calculates the cost of travel per day
		$('.results').text('You can stay in' ${cityName} 'for' ${calculations} 'days based on your selected style of travel');

	});
}



// user enters city name, forEach loop through entire list of cities
// we take out country and state, user only sees city name

nomadApp.init = function () {
	nomadApp.getCity()
	nomadApp.events()
	$(".js-example-basic-single").select2();
}

$(function() {
	nomadApp.init();

})