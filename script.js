
// $("#searchBtn").on("click", function(event){
// event.PreventDefault();

var APIkey = "81bcb345a0607fbd12d0daf0e6a57fd3"
var userCity = charlotte //$("#searchCity").val().trim();
var queryURL = "pro.openweathermap.org/data/2.5/forecast/hourly?q=" + userCity + "&appid=" + APIkey

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    // $("#cityWeather").text(JSON.stringify(response))
    console.log(response)
})
console.log(queryURL)
// })