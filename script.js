const form = document.getElementById("search-form");
const input = document.getElementById("city-input");
const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");
const cityNameEl = document.getElementById("city-name");
const temperatureEl = document.getElementById("temperature");
const conditionEl = document.getElementById("condition");
const windEl = document.getElementById("wind");
const mascotEl = document.getElementById("mascot");

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

const MASCOTS = {
  sunny: `<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="34" fill="#FFE59A"/><g stroke="#FFD166" stroke-width="6" stroke-linecap="round"><line x1="60" y1="10" x2="60" y2="22"/><line x1="60" y1="98" x2="60" y2="110"/><line x1="10" y1="60" x2="22" y2="60"/><line x1="98" y1="60" x2="110" y2="60"/><line x1="24" y1="24" x2="32" y2="32"/><line x1="88" y1="88" x2="96" y2="96"/><line x1="96" y1="24" x2="88" y2="32"/><line x1="32" y1="88" x2="24" y2="96"/></g><circle cx="49" cy="56" r="4" fill="#5B4B8A"/><circle cx="71" cy="56" r="4" fill="#5B4B8A"/><path d="M48 70 Q60 82 72 70" stroke="#5B4B8A" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="42" cy="66" r="5" fill="#FFB5A7" opacity="0.7"/><circle cx="78" cy="66" r="5" fill="#FFB5A7" opacity="0.7"/></svg>`,
  cloudy: `<svg viewBox="0 0 120 120"><ellipse cx="60" cy="68" rx="40" ry="24" fill="#E4E1F5"/><circle cx="38" cy="58" r="18" fill="#E4E1F5"/><circle cx="60" cy="50" r="22" fill="#E4E1F5"/><circle cx="84" cy="60" r="16" fill="#E4E1F5"/><circle cx="49" cy="68" r="4" fill="#5B4B8A"/><circle cx="71" cy="68" r="4" fill="#5B4B8A"/><path d="M50 80 Q60 76 70 80" stroke="#5B4B8A" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="43" cy="76" r="4" fill="#FFB5A7" opacity="0.6"/><circle cx="77" cy="76" r="4" fill="#FFB5A7" opacity="0.6"/></svg>`,
  rainy: `<svg viewBox="0 0 120 120"><ellipse cx="60" cy="55" rx="38" ry="22" fill="#C7CEEA"/><circle cx="40" cy="46" r="16" fill="#C7CEEA"/><circle cx="60" cy="40" r="20" fill="#C7CEEA"/><circle cx="82" cy="48" r="14" fill="#C7CEEA"/><circle cx="49" cy="56" r="4" fill="#5B4B8A"/><circle cx="71" cy="56" r="4" fill="#5B4B8A"/><path d="M50 68 Q60 64 70 68" stroke="#5B4B8A" stroke-width="4" fill="none" stroke-linecap="round"/><g stroke="#8FB4F0" stroke-width="4" stroke-linecap="round"><line x1="40" y1="86" x2="34" y2="100"/><line x1="60" y1="90" x2="54" y2="104"/><line x1="80" y1="86" x2="74" y2="100"/></g></svg>`,
  stormy: `<svg viewBox="0 0 120 120"><ellipse cx="60" cy="52" rx="38" ry="22" fill="#9D96C4"/><circle cx="40" cy="44" r="16" fill="#9D96C4"/><circle cx="60" cy="38" r="20" fill="#9D96C4"/><circle cx="82" cy="46" r="14" fill="#9D96C4"/><circle cx="49" cy="54" r="4" fill="#2F2650"/><circle cx="71" cy="54" r="4" fill="#2F2650"/><ellipse cx="60" cy="66" rx="9" ry="6" fill="#2F2650"/><polygon points="58,74 68,74 60,94 72,90 55,112 60,92 50,96" fill="#FFD166"/></svg>`,
  foggy: `<svg viewBox="0 0 120 120"><ellipse cx="60" cy="60" rx="40" ry="22" fill="#D9D6E8"/><circle cx="49" cy="58" r="4" fill="#5B4B8A"/><circle cx="71" cy="58" r="4" fill="#5B4B8A"/><path d="M50 70 L70 70" stroke="#5B4B8A" stroke-width="4" fill="none" stroke-linecap="round"/><g stroke="#B7B0D6" stroke-width="5" stroke-linecap="round"><line x1="18" y1="86" x2="46" y2="86"/><line x1="54" y1="94" x2="90" y2="94"/><line x1="30" y1="102" x2="70" y2="102"/></g></svg>`,
  snowy: `<svg viewBox="0 0 120 120"><ellipse cx="60" cy="52" rx="38" ry="22" fill="#E9EEF7"/><circle cx="40" cy="44" r="16" fill="#E9EEF7"/><circle cx="60" cy="38" r="20" fill="#E9EEF7"/><circle cx="82" cy="46" r="14" fill="#E9EEF7"/><circle cx="49" cy="54" r="4" fill="#7B8CB2"/><circle cx="71" cy="54" r="4" fill="#7B8CB2"/><path d="M52 66 Q60 70 68 66" stroke="#7B8CB2" stroke-width="4" fill="none" stroke-linecap="round"/><g fill="#BFD4F0"><circle cx="38" cy="92" r="4"/><circle cx="60" cy="98" r="4"/><circle cx="82" cy="92" r="4"/></g></svg>`,
  idle: `<svg viewBox="0 0 120 120"><ellipse cx="60" cy="65" rx="38" ry="22" fill="#FFD1DC"/><circle cx="40" cy="57" r="16" fill="#FFD1DC"/><circle cx="60" cy="50" r="20" fill="#FFD1DC"/><circle cx="82" cy="58" r="14" fill="#FFD1DC"/><circle cx="49" cy="66" r="4" fill="#8A5B6D"/><circle cx="71" cy="66" r="4" fill="#8A5B6D"/><path d="M50 78 Q60 84 70 78" stroke="#8A5B6D" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`,
};

function moodForCode(code) {
  if (code === 0 || code === 1) return "sunny";
  if (code === 2 || code === 3) return "cloudy";
  if (code === 45 || code === 48) return "foggy";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "rainy";
  if ([71, 73, 75].includes(code)) return "snowy";
  if ([95, 96, 99].includes(code)) return "stormy";
  return "cloudy";
}

function setMascot(mood) {
  mascotEl.innerHTML = MASCOTS[mood] || MASCOTS.idle;
}

setMascot("idle");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = input.value.trim();
  if (!city) return;

  resultEl.classList.add("hidden");
  statusEl.textContent = "Sky Buddy is looking outside...";

  try {
    const { latitude, longitude, displayName } = await geocodeCity(city);
    const weather = await getWeather(latitude, longitude);
    setMascot(moodForCode(weather.weathercode));
    renderWeather(displayName, weather);
    statusEl.textContent = "";
  } catch (err) {
    setMascot("idle");
    statusEl.textContent = err.message || "Oops, something went wrong. Try again!";
  }
});

async function geocodeCity(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1&language=en&format=json`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Couldn't reach the location service.");
  }

  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error(`Couldn't find "${city}". Try another spelling?`);
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

async function getWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Couldn't fetch weather data. Try again shortly.");
  }

  const data = await res.json();
  if (!data.current_weather) {
    throw new Error("No weather data for this spot.");
  }

  return data.current_weather;
}

function renderWeather(displayName, weather) {
  cityNameEl.textContent = displayName;
  temperatureEl.textContent = `${Math.round(weather.temperature)}°C`;
  conditionEl.textContent =
    WEATHER_CODES[weather.weathercode] || "Mystery weather";
  windEl.textContent = `Breeze: ${Math.round(weather.windspeed)} km/h`;
  resultEl.classList.remove("hidden");
}
