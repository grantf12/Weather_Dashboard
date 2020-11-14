var lon;
var lat;

$("#searchBtn").on("click", function(){
    var APIkey = "81bcb345a0607fbd12d0daf0e6a57fd3";
    // City the user is searching for
    var userCity = $("#searchCity").val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&units=imperial&appid=" + APIkey;
    console.log(queryURL);
    var now = moment();
        
    // ajax call to open weather
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        
    // $("#cityWeather").append(" " +response.weather[0].main)
    console.log(response)

    // Var set up to record lat and lon of the city being searched
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    
    // Created various variables to use as placeholders for the current city that is being viewed
    var title = $('<h1>').addClass('cityTitle').text(response.name + (now.format(" MM/DD/YY")));
    var weatherCard = $('<div>').addClass('card')
    var cardBody = $('<div>').addClass('card-body')

    //variables for the Temperature, Humidity, Wind Speed and UV-index
    var temp = $('<p>').addClass('cardInfo').text('Temperature: ' + response.main.temp + ' F');
    var humid = $('<p>').addClass('cardInfo').text('Humidity: ' + response.main.humidity);
    var wind = $('<p>').addClass('cardInfo').text('Wind Speed: ' + response.wind.speed + 'MPH');
    
  
    // Appends the variables to a card body
    cardBody.append(title, temp, humid, wind);
    //Appends the card body to a card
    weatherCard.append(cardBody)
    // Appends the card to the empty div
    $("#cityWeather").append(weatherCard)
    
    function fiveDaysLater(){
        var APIkey = "81bcb345a0607fbd12d0daf0e6a57fd3";
        var fiveDay = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly,minutely&appid=" + APIkey;
        
        $.ajax({
            url: fiveDay,
            mehtod: "GET"
        }).then(function(responses){
            $('.fiveDayTitle').text("5 Day Forecast: ");
            $("#cityWeather").append(weatherCard)
            var fiveDayCards
            var forecastCard = $('<div class= card col-2 bg-primary>').addClass('cards');
            var forevastBody = $('<div>').addClass('row');
            
            console.log(responses.current.temp)
            console.log(responses.current.humidity)
            console.log(responses.current.uvi)
                // Finds the UV-Index inside the second ajax call and appends it to the weather card from first ajax call
            var uvIndex = responses.current.uvi
            var uvBtn = $('<button>')
            if (uvIndex < 3) {
                uvBtn.text(uvIndex)
                uvBtn.addClass('btn btn-sucess')
                $(uv).append(uvBtn)
            }
            else if (uvIndex >= 3 && uvIndex <= 7) {
                uvBtn.text(uvIndex)
                uvBtn.addClass('btn btn-warning')
                $(uv).append(uvBtn)
            }
            else {
                uvBtn.text(uvIndex)
                uvBtn.addClass('btn btn-danger')
                $(uv).append(uvBtn)
            }
            var uv = $('<p>').addClass('uvInfo').text('UV-Index: ');
            cardBody.append(uv);
        })
        
    }
    fiveDaysLater();
});

});

