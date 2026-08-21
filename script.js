const form = document.getElementById("search-form");
const input = document.getElementById("city-input");
const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");
const cityNameEl = document.getElementById("city-name");
const temperatureEl = document.getElementById("temperature");
const conditionEl = document.getElementById("condition");
const windEl = document.getElementById("wind");

// Maps Open-Meteo's numeric weather codes to human-readable text.
// Reference: https://open-meteo.com/en/docs
const WEATHER_CODES = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  80: "Rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with heavy hail",
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = input.value.trim();
  if (!city) return;

  resultEl.classList.add("hidden");
  statusEl.textContent = "Loading...";
  statusEl.style.color = "#555";

  try {
    const { latitude, longitude, displayName } = await geocodeCity(city);
    const weather = await getWeather(latitude, longitude);
    renderWeather(displayName, weather);
    statusEl.textContent = "";
  } catch (err) {
    statusEl.style.color = "#b00020";
    statusEl.textContent = err.message || "Something went wrong. Try again.";
  }
});

// Step 1: convert a city name into coordinates using Open-Meteo's
// free geocoding endpoint (no API key required).
async function geocodeCity(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1&language=en&format=json`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Could not reach the location service.");
  }

  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error(`No matching city found for "${city}".`);
  }

  const match = data.results[0];
  const displayName = [match.name, match.admin1, match.country]
    .filter(Boolean)
    .join(", ");

  return {
    latitude: match.latitude,
    longitude: match.longitude,
    displayName,
  };
}

// Step 2: fetch current weather for those coordinates.
async function getWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Could not fetch weather data. Try again shortly.");
  }

  const data = await res.json();
  if (!data.current_weather) {
    throw new Error("Weather data unavailable for this location.");
  }

  return data.current_weather;
}

function renderWeather(displayName, weather) {
  cityNameEl.textContent = displayName;
  temperatureEl.textContent = `${Math.round(weather.temperature)}°C`;
  conditionEl.textContent =
    WEATHER_CODES[weather.weathercode] || "Unknown conditions";
  windEl.textContent = `Wind: ${Math.round(weather.windspeed)} km/h`;
  resultEl.classList.remove("hidden");
}
