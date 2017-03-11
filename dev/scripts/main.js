var nomadApp = {}

nomadApp.url = 'https://nomadlist.com/api/v2/list/cities/'
nomadApp.key = 'EDcwZCGMD5gMmdWT3BrI'
nomadApp.client = 'hackeryou'

// where the city name is recorded
nomadApp.cityName;

// nomadApp.cityCleanName;

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

		// $('select').css('text-transform','uppercase');
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
		console.log(cityOptions.result[0])
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
			var cityImage1500 = `https://nomadlist.com${cityOptions.result[0].media.image["1500"]}`;
		} else {
			var cityImage1500 = 'https://unsplash.it/1000'
		}

		// total budget 
		var budget = $('#budget').val();

		// airbnb or hotel
		var stay = $('.housing.active').data('value');
		// how many pints/day
		var alcohol = $('.beer.active').data('value');
		// how many cups/day
		var coffee = $('.cafe.active').data('value');

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

		var cityCleanName = nomadApp.cityName;

		// if initial costs from api are undefined... 
		if (airbnbCost === undefined && beerCost === undefined && coffeeCost === undefined && hotelCost === undefined) {
			$('.results').html(`
				<p>${cityCleanName.replace(/-/g, " ")}'s information is currently unavailable.</p>
				`);
		}
		// if someone enters negative budget 
		else if (budget < 0) {
			$('.results').html(`
				<p>Maybe you should get a credit loan first</p>
				`);
		} 
		// the cost of travel per day in selected city
		else {
			$('.results').html(`

				<p>You can stay in <span class="capitalize">${cityCleanName.replace(/-/g, " ")}</span> for ${totalDays} days based on your selected style of travel</p>
				`);
			$('.cityDetails').append($("<div>").css({
				'background': `url(${cityImage1500})`,
				'background-size': 'cover', 
				'background-position': 'center', 
				'width': '1000px',
				'height': '500px'
			}))

				

	

		}
	})
}

nomadApp.events = function() {
	// when form is submitted
	$('.headerNext').on('click', function(e){
		e.preventDefault();
		$('.current').removeClass('current').hide().next().fadeIn().addClass('current')
	})

		$(".headerNext").hover(function(){
			$(this).toggleClass("is-active");
		})

	$('.headerBack').on('click', function(e) {
		e.preventDefault();
		$('.current').removeClass('current').hide().prev().fadeIn().addClass('current')
	})
		$(".headerBack").hover(function(){
			$(this).toggleClass("is-active");
		})		


	$('.housing').click(function() {
		$('.housing').removeClass('active');
		$(this).addClass('active');
	})

	$('.cafe').click(function() {
		$('.cafe').removeClass('active');
		$(this).addClass('active');
	})

	$('.beer').click(function() {
		$('.beer').removeClass('active');
		$(this).addClass('active');
	})

	$('form').on('submit', function(e) {
		e.preventDefault();
		$('.results').show();
		// get city name
		nomadApp.cityName = $('#city').val();
		nomadApp.getCityInfo(nomadApp.cityName);
		$('.headerBack').hide();
		$('.submitButton').hide();
		$('.resetButton').fadeIn();
	});
		$(".submitButton").hover(function(){
			$(this).toggleClass("is-active");
		})

	$('.resetButton').on('click', function() {
		location.reload();
	})	
		$(".resetButton").hover(function(){
			$(this).toggleClass("is-active");
		})	

	$('#budget').on('keydown', function() {
		if ($('#budget').val() !== '') {
			$('.submitButton').removeAttr('disabled');
		}
	})
	$('.fa-info-circle').on('click', function() {
		$('.credits p').toggle('fadeIn');
	})
}

nomadApp.init = function () {
	nomadApp.getCity()
	nomadApp.events();
	$(".js-example-basic-single").select2();
}

$(function() {
	nomadApp.init();
})