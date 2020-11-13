
// $("#searchBtn").on("click", function(event){
// event.PreventDefault();

var APIkey = "81bcb345a0607fbd12d0daf0e6a57fd3";
var userCity = "charlotte"; //$("#searchCity").val().trim();
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=charlotte&appid=81bcb345a0607fbd12d0daf0e6a57fd3";
console.log(queryURL)
$.ajax({
    url: "api.openweathermap.org/data/2.5/weather?q=charlotte&appid=81bcb345a0607fbd12d0daf0e6a57fd3",
    method: "GET"
}).then(function(response){
    // $("#cityWeather").text(JSON.stringify(response))
    console.log(response)
})
console.log(queryURL)
// })