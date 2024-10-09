let cityInput = document.getElementById('city');
let currentNameDay = document.getElementById('currentNameDay');
let currentNum = document.getElementById('currentNum');
let currentMonth = document.getElementById('currentMonth');
let cityName = document.getElementById('cityName');
let currentDegree = document.getElementById('currentDegree');
let currentIcon = document.getElementById('currentIcon');
let currentStatus = document.getElementById('currentStatus');
let humidity = document.getElementById('humidity')
let wind = document.getElementById('wind')
let wind_direcion = document.getElementById('wind_direcion')



let nextDay = document.getElementsByClassName('next_day_name')
let nextMaxTemp = document.getElementsByClassName('next_max_temp')
let nextMinTemp = document.getElementsByClassName('next_min_temp')
let nextConditionImg = document.getElementsByClassName('next_condation_img')
let nextConditionText = document.getElementsByClassName('next_condation_text')



async function getWeatherCity(city) {
    var resonse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=25aca83c2bbc43a4833220129242906&q=${city}&days=3`);
    var data = await resonse.json();
    return data;
}
cityInput.addEventListener('input', function (e) {
    start(cityInput.value);
})

function displayCurrentDay(data) {

    let todayDate = new Date();
    currentNameDay.innerHTML = todayDate.toLocaleDateString("en-us", { weekday: "long" })
    currentNum.innerHTML = todayDate.getDate()
    currentMonth.innerHTML = todayDate.toLocaleDateString("en-us", { month: "long" })
    cityName.innerHTML = `${data.location.name}`
    currentDegree.innerHTML = `${data.current.temp_c}°C`
    currentIcon.setAttribute('src', data.current.condition.icon)
    currentStatus.innerHTML = `${data.current.condition.text}`
    humidity.innerHTML =data.current.humidity+"%"
    wind.innerHTML =data.current.wind_kph+"km/h"
    wind_direcion.innerHTML =data.current.wind_dir

}
function displayNextDay(name) {
    let forcastDate = name.forecast.forecastday

    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(forcastDate[i + 1].date);
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-us", { weekday: "long" })

        nextMaxTemp[i].innerHTML = forcastDate[i + 1].day.maxtemp_c+"°C"
        nextMinTemp[i].innerHTML = forcastDate[i + 1].day.mintemp_c+"°C"
        nextConditionImg[i].setAttribute('src', forcastDate[i + 1].day.condition.icon)
        nextConditionText[i].innerHTML = forcastDate[i + 1].day.condition.text
    }
}

async function start(city = "cairo") {
    let weatherData = await getWeatherCity(city)
    if (!weatherData.error) {
        displayCurrentDay(weatherData);
        displayNextDay(weatherData);
    }

}
start()