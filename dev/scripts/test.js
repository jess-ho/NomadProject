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
			// console.log(city)
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
		// variables for each cost needed, makes sure there are cost results first
		if (cityOptions.result[0] !== undefined) {
			var airbnbCost = cityOptions.result[0].cost.airbnb_median.USD;
		} 

		if (cityOptions.result[0] !== undefined) {
			var hotelCost = cityOptions.result[0].cost.hotel.USD;
		} 

		if (cityOptions.result[0] !== undefined) {
			var coffeeCost = cityOptions.result[0].cost.coffee_in_cafe.USD;
		} 

		if (cityOptions.result[0] !== undefined) {
			var beerCost = cityOptions.result[0].cost.beer_in_cafe.USD;
		} 

		if (cityOptions.result[0] !== undefined) {
			var nomadCost = cityOptions.result[0].cost.nomad.USD;
		} 

		// url for image
		if (cityOptions.result[0] !== undefined) {
			var cityImage1000 = `https://nomadlist.com${cityOptions.result[0].media.image["1000"]}`;
		} else {
			var cityImage1000 = 'https://unsplash.it/1000'
		}

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
		var totalDays = Math.floor(budget / (foodCost + stayCost + alcoholPerDay + coffeePerDay));

		// if initial costs from api are undefined... 
		if (airbnbCost === undefined && beerCost === undefined && coffeeCost === undefined && hotelCost === undefined) {
			$('.results').text('ERROR');
		}
		// if someone enters negative budget 
		else if (budget < 0) {
			$('.results').text('Maybe you should get a credit loan first');
		} 
		// the cost of travel per day in selected city
		else {
			$('.results').text(`You can stay in ${nomadApp.cityName} for ${totalDays} days based on your selected style of travel`).css('background', `url('${cityImage1000}')`);
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

	var sheet = document.createElement('style'),  
	  $rangeInput = $('.range input'),
	  prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];

	document.body.appendChild(sheet);

	var getTrackStyle = function (el) {  
	  var curVal = el.value,
	      val = (curVal - 1) * 20,
	      style = '';
	  
	  // Set active label
	  $('.range-labels li').removeClass('active selected');
	  
	  var curLabel = $('.range-labels').find('li:nth-child(' + curVal + ')');
	  
	  curLabel.addClass('active selected');
	  curLabel.prevAll().addClass('selected');
	  
	  // Change background gradient
	  for (var i = 0; i < prefs.length; i++) {
	    style += '.range {background: linear-gradient(to right, #37adbf 0%, #37adbf ' + val + '%, #fff ' + val + '%, #fff 100%)}';
	    style += '.range input::-' + prefs[i] + '{background: linear-gradient(to right, #37adbf 0%, #37adbf ' + val + '%, #b2b2b2 ' + val + '%, #b2b2b2 100%)}';
	  }

	  return style;
	}

	$rangeInput.on('input', function () {
	  sheet.textContent = getTrackStyle(this);
	});

	// Change input value on label click
	$('.range-labels li').on('click', function () {
	  var index = $(this).index();
	  
	  $rangeInput.val(index + 1).trigger('input');
	  
	});
})