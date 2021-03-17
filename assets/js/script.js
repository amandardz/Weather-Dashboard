var cityFormEl = document.querySelector('#cityForm')
var searchBtnEl = document.querySelector('#searchBtn')
var cityNameEl = document.querySelector('#cityName')
var cityListEl = document.querySelector('#cityList')
var day1El = document.querySelector('#day1')
var day2El = document.querySelector('#day2')
var day3El = document.querySelector('#day3')
var day4El = document.querySelector('#day4')
var day5El = document.querySelector('#day5')

var getWeather = function () {
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=32.7831&lon=-96.8067&cnt=5&units=imperial&appid=f05e59dca587993db2e06e2c3a372a11'
    console.log(weatherUrl)
    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            var temp1El = document.querySelector('#temp1')
            temp1El.textContent = "Temperature: " + data.main.temp + " ℉"

            var humid1El = document.querySelector('#humid1')
            humid1.textContent = "Humid: " + data.main.humidity + "%"

            var wind1El = document.querySelector('#wind1')
            wind1El.textContent = "Wind Speed: " + data.wind.speed + " MPH"
        });
        
    var uvUrl = 'http://api.openweathermap.org/data/2.5/uvi?lat=32.7831&lon=-96.8067&cnt=5&appid=f05e59dca587993db2e06e2c3a372a11'
    fetch(uvUrl)
    .then(function (response){
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        var uv1El = document.querySelector('#uv1')
        uv1El.textContent = "UV Index: " + data.value

        if(data.value === 1 || data.value < 2){
            uv1El.setAttribute("style", "color: green;")
        } else if (data.value >= 3 && data.value <=5) {
            uv1El.setAttribute("style", "color: yellow;")
        } else {
            uv1El.setAttribute("style", "color: red;")
        }
    });
}

getWeather();