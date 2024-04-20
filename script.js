const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
    // weatherFn('Pune'); // Uncomment this line if you want to display weather for a default city on page load
});

async function getWeather() {
    const city = $('#city-input').val();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }
    await weatherFn(city);
}

async function weatherFn(cityName) {
    const temp = `${url}?q=${cityName}&appid=${apiKey}&units=metric`;
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);

    // Map weather conditions to Font Awesome icons
    const weatherIcons = {
        '01d': 'fas fa-sun', // clear sky (day)
        '01n': 'fas fa-moon', // clear sky (night)
        '02d': 'fas fa-cloud-sun', // few clouds (day)
        '02n': 'fas fa-cloud-moon', // few clouds (night)
        '03d': 'fas fa-cloud', // scattered clouds (day)
        '03n': 'fas fa-cloud', // scattered clouds (night)
        '04d': 'fas fa-cloud', // broken clouds (day)
        '04n': 'fas fa-cloud', // broken clouds (night)
        '09d': 'fas fa-cloud-showers-heavy', // shower rain (day)
        '09n': 'fas fa-cloud-showers-heavy', // shower rain (night)
        '10d': 'fas fa-cloud-sun-rain', // rain (day)
        '10n': 'fas fa-cloud-moon-rain', // rain (night)
        '11d': 'fas fa-bolt', // thunderstorm (day)
        '11n': 'fas fa-bolt', // thunderstorm (night)
        '13d': 'fas fa-snowflake', // snow (day)
        '13n': 'fas fa-snowflake', // snow (night)
        '50d': 'fas fa-smog', // mist (day)
        '50n': 'fas fa-smog' // mist (night)
    };

    // Get the icon corresponding to the weather condition
    const weatherIconClass = weatherIcons[data.weather[0].icon];
    if (weatherIconClass) {
        $('#weather-icon').removeClass().addClass(weatherIconClass);
    } else {
        $('#weather-icon').removeClass().addClass('fas fa-question-circle'); // Default icon
    }

    $('#weather-info').fadeIn();
}
