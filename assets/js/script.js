var cityFormEl = document.querySelector('#cityForm')
var searchBtnEl = document.querySelector('#searchBtn')
var cityNameEl = document.querySelector('#cityName')
var cityListEl = document.querySelector('#cityList')
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

            var headingEl = document.getElementById('heading1');
            headingEl.textContent = data.name + " " + "(" + currentDate + ")";
            console.log(data.name)

            var temp1El = document.querySelector('#temp1')
            temp1El.textContent = "Temperature: " + data.main.temp + " ℉"

            var humid1El = document.querySelector('#humid1')
            humid1El.textContent = "Humid: " + data.main.humidity + "%"

            var wind1El = document.querySelector('#wind1')
            wind1El.textContent = "Wind Speed: " + data.wind.speed + " MPH"

            var uvUrl = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&appid=f05e59dca587993db2e06e2c3a372a11'

            fetch(uvUrl)
                .then(function(response){
                    return response.json();
                })
                .then(function (data){
                    console.log(data)
                    var uv1El = document.querySelector('#uv1')
                    uv1El.textContent = "UV Index: " + data.value
        
                    if(data.value === 0 || data.value < 3){
                        uv1El.setAttribute("style", "color: green;")
                    } else if (data.value >= 3 && data.value <= 6) {
                        uv1El.setAttribute("style", "color: yellow;")
                    } else {
                        uv1El.setAttribute("style", "color: red;")
                    }
                })
        });
};


// var getDailyWeather = function(cityName) {
//     var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&appid=f05e59dca587993db2e06e2c3a372a11'
//     console.log(weatherUrl)
//     fetch(weatherUrl)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data)
//             for(var i = 0; i < ; i++){
//                 var dailyCards = document.querySelector('.daily')
//                 dailyCards.textContent = data.list[i].main.temp
//             });
// };

// getDailyWeather();

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

