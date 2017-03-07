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
		console.log(cities)
	})
}

// ajax call , get cost
nomadApp.getCost = function() {
	
}

// user enters city name, forEach loop through entire list of cities
// we take out country and state, user only sees city name

nomadApp.init = function () {
	nomadApp.getCity()
}

$(function() {
	nomadApp.init()
})