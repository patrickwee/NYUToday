//Arrays to store the data
var weatherData = [];
var instagramData = [];

//Global search object
var searchObj = {
	thisIsNYU : {
		instagram : 'hashtagnyu',
		weather : null
	},
	shanghai : {
		instagram : 'nyushanghai',
		weather : 'Shanghai'
	},
	abuDhabi : {
		instagram : 'nyuad',
		weather : 'Abu Dhabi'
	},
	newYork : {
		instagram : 'nyu',
		weather : 'New York'
	}
};

//Function to put Instagram Data into HTML
function createInstagramHTML(){
	//Figure out the length of the shorter array
	var htmlString = '';
	for (var i = 0; i < 20; i++){
		if (i===0 ||i===5||i===10||i===15){
			htmlString += '<div class="container1">';
		}else if (i===1 ||i===6||i===11||i===16){
			htmlString += '<div class="container2">';
		}else if (i===2 ||i===7||i===12||i===17){
			htmlString += '<div class="container3">';
		}else if (i===3 ||i===8||i===13||i===18){
			htmlString += '<div class="container4">';
		}else if (i===4 ||i===9||i===14||i===19){
			htmlString += '<div class="container5">';
		}
		htmlString += '<br><br><br>';
		
		htmlString += '<h2 class="author">'+instagramData[i].user.full_name+ "'s NYU Today"+'</h2>';
		htmlString += '<img src=' + instagramData[i].images.standard_resolution.url + ' />';
		var finalcaption='';
		if (instagramData[i].caption===null){
			finalcaption="One of the many things that happened in NYU Today.";

		}else{
			finalcaption=instagramData[i].caption.text;
		}


		htmlString += '<h3 class="caption">' + finalcaption+ '</h3>';
		htmlString += '<br><br><br>';
		htmlString += '</div>';
		
	}
	
	$('#theInstagram').append(htmlString);
}


//Function to Get Instagram Data
function getInstagramData(search){
	var searchTerm=search;
	var myInstaKey = 'b42e3fad63d64cd69cd9f8a5765ffb1f';
	var instagramURL = 'https://api.instagram.com/v1/tags/'+searchTerm+'/media/recent?client_id=' + myInstaKey;

	$.ajax({
		url: instagramURL,
		type: 'GET',
		dataType: 'jsonp',
		error: function(data){
			console.log("Oh no");
		},
		success: function(data){
			console.log("WooHoo Instagram");
			//console.log(data);

			instagramData = data.data;
			console.log(instagramData);
			
			//Genereate HTML
			createInstagramHTML();
			$('#loading').hide();
		}
	});
}

function createWeatherHTML(){
	var htmlString = '';
	var finalcaption='';
	htmlString += '<div>';
	var description=weatherData.weather[0].description;
	console.log("------------------------------------");
	console.log(description);
	var firstLetter=description.charAt(0);
	console.log(firstLetter);
	var firstLetterUpper=firstLetter.toUpperCase();
	console.log(firstLetterUpper);
	var upperDescription = description.replace(firstLetter, firstLetterUpper);
	console.log(upperDescription);
	htmlString += '<h3 class="caption">' + upperDescription + ' in ' + weatherData.name +'!</p>';
	htmlString += '</div>';
	
	$('#theWeather').append(htmlString);
}


//Function to Get Vine Data
function getWeatherData(search){
	var city=search;
	var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q='+city;

	$.ajax({
		url: weatherURL,
		type: 'GET',
		dataType: 'jsonp',
		error: function(data){
			console.log("Oh no");
		},
		success: function(data){
			console.log("WooHoo Weather");
			//console.log(data);

			weatherData = data;
			console.log(weatherData);

			//Genereate HTML
			createWeatherHTML();

		}
	});
}


$(document).ready(function(){
	console.log("We are ready!");

	var theCurrentPage = $('#page').attr('data-name');
	console.log(theCurrentPage);
	console.log(searchObj[theCurrentPage]);

	var currentObj = searchObj[theCurrentPage];
	getInstagramData(currentObj.instagram);
	if (currentObj.weather){
		getWeatherData(currentObj.weather);
	}
});