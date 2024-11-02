// Weather Section: Open-Meteo API Setup
const latitude = 52.52; // Replace with the latitude of your target location
const longitude = 13.41; // Replace with the longitude of your target location
const weatherSection = document.getElementById('weather-section');

// Function to fetch weather data
async function fetchWeather() {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`);
        if (!response.ok) throw new Error('Weather data not available');

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherSection.innerHTML = `<p>${error.message}</p>`;
    }
}

// Function to display weather data
function displayWeather(data) {
    // Extracting current weather data
    const current = data.current_weather;
    weatherSection.innerHTML = `
        <h2>Current Weather</h2>
        <p>Temperature: ${current.temperature_2m}°C</p>
        <p>Wind Speed: ${current.wind_speed_10m} m/s</p>
        <h3>Hourly Forecast</h3>
        <p>Humidity: ${data.hourly.relative_humidity_2m[0]}%</p>
        <p>Next Hour Temperature: ${data.hourly.temperature_2m[1]}°C</p>
        <p>Next Hour Wind Speed: ${data.hourly.wind_speed_10m[1]} m/s</p>
    `;
}

// Fetch weather data on page load
fetchWeather();
