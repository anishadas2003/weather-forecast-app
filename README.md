# Weather Forecast Web App

A simple, responsive weather app built with vanilla HTML, CSS, and JavaScript.
Search any city and get its current temperature, condition, and wind speed —
powered by the free [Open-Meteo](https://open-meteo.com/) REST API (no API key required).

## Features
- City search with a clean, responsive UI
- Fetches live geolocation and weather data via REST API calls
- Parses JSON responses and updates the DOM dynamically
- Basic error handling for invalid city names and failed requests

## Tech Stack
- HTML5
- CSS3
- Vanilla JavaScript (Fetch API)

## How to Run
1. Clone this repo
2. Open `index.html` directly in your browser (no build step or server needed)

## API
This project uses two free Open-Meteo endpoints:
- **Geocoding API** — converts a city name into latitude/longitude
- **Forecast API** — returns current weather for those coordinates
