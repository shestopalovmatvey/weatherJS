let API_KEY = '210f64eb38a84d56a27155337230703';

let main = document.querySelector('.container');

let btnSearch = document.querySelector('.btn__search');

let input = document.querySelector('.input__location');

let error = document.querySelector('.not__found');

let weatherBox = document.querySelector('.weather-box');

let weatherDetails = document.querySelector('.weather-details');

let valueHumidity = document.querySelector('.value__humidity');

let valueWind = document.querySelector('.value__wind');

const searchWithClick = (evt) => {
    let city = input.value;

    if (city === '') return;

    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`)
    .then(response => response.json())
    .then(json => {
        if (json.hasOwnProperty('error')) {
            main.style.height = '500px'
            error.style.display = 'block';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
        } else {
            error.style.display = 'none';
            main.style.height = '550px'
            
            let items = json.current;
            let img = weatherBox.querySelector('img');
            let temp = weatherBox.querySelector('.temperature');
            let desc = weatherBox.querySelector('.description');
            let wind = valueWind.querySelector('.text__wind');
            let humidity = valueHumidity.querySelector('.text__humidity');

            switch(items.condition.text) {
                case 'Clear':
                    img.src = 'img/clear.png';
                    break;
                case 'Partly cloudy':
                    img.src = 'img/cloud.png';
                    break;
                case 'Light rain':
                    img.src = 'img/rain.png';
                    break;
                case 'Moderate or heavy rain with thunder':
                    img.src = 'img/snow.png';
                    break;
                default:
                    img.src = 'img/cloud.png';
                    break;
            }

            temp.textContent = items.temp_c + '°C';
            desc.textContent = items.condition.text;
            
            humidity.textContent = items.humidity + '%';
            wind.textContent = items.wind_kph + 'Km/h';
        }
    });
}

const searchWithEnter = (evt) => {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      searchWithClick();
    }
};



document.addEventListener('keydown', searchWithEnter);

btnSearch.addEventListener('click', searchWithClick);