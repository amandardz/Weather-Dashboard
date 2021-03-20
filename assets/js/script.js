var cityFormEl = document.querySelector('#cityForm')
var searchBtnEl = document.querySelector('#searchBtn')
var cityNameEl = document.querySelector('#cityName')
var cityListEl = document.querySelector('#cityList')
var currentWeatherEl = document.querySelector('#currentWeather')
var weeklyEl = document.querySelector('#weeklyWeather')
var dailyCardEl = document.querySelector('.daily')
var currentDate = new Date().toLocaleDateString('en-US')

var printCityList = function(name) {
    
    var cityListItem = document.createElement('li')
    cityListEl.classList.add('list-unstyled')
    cityListItem.textContent = name;
    cityListEl.appendChild(cityListItem)
};

var getCurrentWeather = function (cityName) {
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=f05e59dca587993db2e06e2c3a372a11'
    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var iconCode = data.weather[0].icon
            var iconUrl = 'https://www.openweathermap.org/img/wn/' + iconCode + '.png'

            var currentWeatherDiv = document.createElement('div')
            currentWeatherEl.appendChild(currentWeatherDiv)
            var currentWeatherInfo = document.createElement('p')
            currentWeatherDiv.appendChild(currentWeatherInfo)
            currentWeatherInfo.innerHTML = '<h2>' + data.name + ' ' + currentDate + ' ' + '<img src="' + iconUrl + '" alt="Weather Icons">' + '</h2>' + '<p>' + "Temp: " + Math.round(data.main.temp) + " ℉" + '</p>' + '<p>' + "Humid: " + data.main.humidity + "%" + '</p>' + '<p>' + "Wind Speed: " + data.wind.speed + " MPH" + '</p>'

            var uvUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&exclude=current,minutely,hourly,alerts&units=imperial&appid=f05e59dca587993db2e06e2c3a372a11'

            fetch(uvUrl)
                .then(function(response){
                    return response.json();
                })
                .then(function (data){
                    console.log(data)
                    var uv1El = document.createElement('div')
                    currentWeatherDiv.appendChild(uv1El)
                    uv1El.textContent = "UV Index: " + data.daily[0].uvi
        
                    if(data.daily[0].uvi === 0 || data.daily[0].uvi < 3){
                        uv1El.setAttribute("style", "color: green;")
                    } else if (data.daily[0].uvi >= 3 && data.daily[0].uvi <= 6) {
                        uv1El.setAttribute("style", "color: orange;")
                    } else {
                        uv1El.setAttribute("style", "color: red;")
                    }

                    for(var i = 1; i < 6; i++){
                        var dailyDate = new Date(data.daily[i].dt * 1000).toLocaleDateString('en-US')
                        var dailyWeatherIcon = data.daily[i].weather[0].icon
                        var iconUrl = 'https://www.openweathermap.org/img/wn/' + dailyWeatherIcon + '.png'
                        var weeklyDiv = document.createElement('div')
                        weeklyEl.appendChild(weeklyDiv)
                        var dailyWeatherInfo = document.createElement('p')
                        weeklyDiv.appendChild(dailyWeatherInfo)
                        dailyWeatherInfo.innerHTML = '<p>' + dailyDate + '</p>' + '<p>' +  '<img src="' + iconUrl + '" alt="Weather Icons">' + '</p>' + '<p>' + "Temp: " + Math.round(data.daily[i].temp.max) + " ℉" + '</p>' + '<p>' + "Humid: " + data.daily[i].humidity + "%" + '</p>'
                    }
                })
        })
};

cityFormEl.addEventListener('submit', function(event){
    event.preventDefault();
    var cityNameVal = cityNameEl.value
    console.log(cityNameEl.value)
    var cityNameInput = ''
    if (cityNameVal === cityNameInput) {
        var messageEl = cityFormEl.children[1]
        messageEl.classList.remove('d-none')
        messageEl.classList.add('d-block')
        messageEl.textContent = 'Please enter a city name'
    } else {
        printCityList(cityNameVal);
        getCurrentWeather(cityNameVal);
        
    }
});