var nomadApp = {}

nomadApp.url = 'https://nomadlist.com/api/v2/list/cities/'
nomadApp.key = 'EDcwZCGMD5gMmdWT3BrI'
nomadApp.client = 'hackeryou'

// where the city name is recorded
nomadApp.cityName;

// ajax call that populates the drop-down menu
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
	})
};

// gets the costs and stuff from the city selected
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
		// variables for each cost needed
		var airbnbCost = cityOptions.result[0].cost.airbnb_median.USD;
		var hotelCost = cityOptions.result[0].cost.hotel.USD;
		var coffeeCost = cityOptions.result[0].cost.coffee_in_cafe.USD;
		var beerCost = cityOptions.result[0].cost.beer_in_cafe.USD;
		var nomadCost = cityOptions.result[0].cost.nomad.USD;

		// total budget 
		var budget = $('#budget').val();
		// airbnb or hotel
		var stay = $('[name=accommodation]:checked').val();
		// how many pints/day
		var alcohol = $('[name=alcohol]:checked').val();
		// how many cups/day
		var coffee = $('[name=coffee]:checked').val();

		// calculating individual costs per day 
		var alcoholPerDay = (alcohol * beerCost);
		var coffeePerDay = (coffee * coffeeCost);
		// radio button for hotel or airbnb
		if (stay === 'airbnb_median') {
			var stayCost =  airbnbCost;
		} else {
			var stayCost =  hotelCost;
		}

		var foodCost = ((nomadCost / 30) - hotelCost);

		// calculating total costs per day
		var totalCost = Math.floor(budget / (foodCost + stayCost + alcoholPerDay + coffeePerDay));

		// the cost of travel per day in selected city
		if (budget < 0) {
			$('.results').text('Maybe you should get a credit loan first');
		} else {
			$('.results').text(`You can stay in ${nomadApp.cityName} for ${totalCost} days based on your selected style of travel`);
		}
		
	})
}

nomadApp.events = function() {
	// when form is submitted
	$('button').on('click', function(e){
		e.preventDefault();
		$('.firstScreen').hide();
		$('.secondScreen').show();
		$('.results').empty();
	})

	$('form').on('submit', function(e) {
		e.preventDefault();

		// get city name
		nomadApp.cityName = $('#city').val();
		nomadApp.getCityInfo(nomadApp.cityName);
	});
}

nomadApp.init = function () {
	nomadApp.getCity()
	nomadApp.events();
	$(".js-example-basic-single").select2();
}

$(function() {
	nomadApp.init();
})