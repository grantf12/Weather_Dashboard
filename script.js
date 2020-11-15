var lon;
var lat;

$("button").on("click", function(){
   
    var APIkey = "81bcb345a0607fbd12d0daf0e6a57fd3";
    // City the user is searching for
    var userCity = $("#searchCity").val().trim();
    if (userCity === "City") {
            userCity = $()
        }
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&units=imperial&appid=" + APIkey;
    console.log(queryURL);
    var now = moment();
    // Clears the 5 day forecast
   $('#fiveDayForecast').html("")
    
   
// Creates buttons whenver a new city is searched
var cityHistory = $("#searchCity").val().trim();
var searchHistory = $('<div><button style="width: 100%" class="bg bg-primary">' + cityHistory + '</button></div>')
$('.history').append(searchHistory)
localStorage.setItem("City", userCity);



        
    // ajax call to open weather
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

    // Var set up to record lat and lon of the city being searched
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    
    // Created various variables to use as placeholders for the current city that is being viewed
    var title = $('<h1>').addClass('cityTitle').text(response.name + (now.format(" MM/DD/YY")));
    var weatherCard = $('<div>').addClass('card')
    var cardBody = $('<div>').addClass('card-body')

    //variables for the Temperature, Humidity, Wind Speed and UV-index
    var temp = $('<p>').addClass('cardInfo').text('Temperature: ' + response.main.temp + ' ℉');
    var humid = $('<p>').addClass('cardInfo').text('Humidity: ' + response.main.humidity);
    var wind = $('<p>').addClass('cardInfo').text('Wind Speed: ' + response.wind.speed + 'MPH');
    
  
    // Appends the variables to a card body
    cardBody.append(title, temp, humid, wind);
    //Appends the card body to a card
    weatherCard.append(cardBody)
    // Appends the card to the empty div
    $("#cityWeather").html(weatherCard)
    
    function fiveDaysLater(){
        var APIkey = "81bcb345a0607fbd12d0daf0e6a57fd3";
        var fiveDay = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly,minutely&appid=" + APIkey;
         
        $.ajax({
            url: fiveDay,
            mehtod: "GET"
        }).then(function(responses){
            // Dynamically create the 5-Day Forecast and append it to weather Card
            $('.fiveDayTitle').text("5 Day Forecast: ");
            $("#cityWeather").append(weatherCard)
            
            // Creates a <p> for the uv Index and appends it to the bottom of card Body
            var uv = $('<p>').addClass('uvInfo').text('UV-Index: ');
            cardBody.append(uv);

            // Finds the UV-Index inside the second ajax call
            var uvIndex = responses.current.uvi
                   
                    function UVI() {
                        // Creates a button
                        var uvBtn = $('<button>')
                        // Creates text for the button
                        $(uvBtn).text(uvIndex)
                        // Appends the button to the <p> with the UV-Index
                        $(uv).append(uvBtn)
                        // If statements that change the color of the button depending on how high the uv-index is
                            if (uvIndex < 3) {
                                uvBtn.text(uvIndex)
                                uvBtn.addClass('btn btn-success')
                            }
                            else if (uvIndex >= 3 && uvIndex <= 7) {
                                uvBtn.text(uvIndex)
                                uvBtn.addClass('btn btn-warning')
                            }
                            else {
                                uvBtn.text(uvIndex)
                                uvBtn.addClass('btn btn-danger')
                            }
                    }
            UVI();
        // var forecastCard = $('<div class= card col-2 bg-primary text-white>').addClass('cards fiveDay-cards');
        
        for(i=0;i<5;i++){
            var position = responses.daily[i];
            var dateDaily = (now.add(1, 'days')).format(" MM/DD/YY");

            //  Set variables for daily temp and humidity
            var tempDay = position.temp.day;
            var humidDay = position.humidity
            var weatherIcon = position.weather[0].icon;
            var forecastBody = $('<div>').addClass('card col-2.5 bg-primary text-white');

            var dateCard = $('<h6 class="card-title"></h6>')
                $(dateCard).text("Date: " + dateDaily);
                $(forecastBody).append(dateCard);
            var iconCard = $('<img>');
                $(iconCard).attr("src", "http://openweathermap.org/img/w/" + weatherIcon + ".png");
                $(forecastBody).append(iconCard)
            var tempCard = $('<p class="card-body"></p>');
                $(tempCard).text("Temp: " + tempDay + ' ℉');
                $(forecastBody).append(tempCard);
            var humidCard = $('<p class="card-body"></p>')
                $(humidCard).text("Humidity: " + humidDay);
                $(forecastBody).append(humidCard)
            
            $('#fiveDayForecast').append(forecastBody)
        }
    })
        
    }
    fiveDaysLater();
});

$("#searchCity").val("")
});