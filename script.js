// Replace with your own OpenWeatherMap API key!
const API_KEY = "3f8c4a8a48973af410aa9dbc3de608d7";

document.getElementById("weather-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const city = document.getElementById("city-input").value.trim();
  if (city) {
    getWeather(city);
  }
});

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      // Use first forecast for simplicity (next 3 hours)
      const forecast = data.list[0];
      const weatherHtml = `
        <div class="weather-info">
          <h2>${data.city.name}, ${data.city.country}</h2>
          <p><strong>Date:</strong> ${forecast.dt_txt}</p>
          <p><strong>Temperature:</strong> ${forecast.main.temp} °C</p>
          <p><strong>Humidity:</strong> ${forecast.main.humidity}%</p>
          <p><strong>Chance of Rain:</strong> ${(forecast.pop * 100).toFixed(0)}%</p>
          <p><strong>Weather:</strong> ${forecast.weather[0].description}</p>
        </div>
      `;
      document.getElementById("weather-result").innerHTML = weatherHtml;
    })
    .catch(err => {
      document.getElementById("weather-result").innerHTML = `<p style="color:red">Error: ${err.message}</p>`;
    });
}
