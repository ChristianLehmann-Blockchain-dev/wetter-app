const apiKey = "fac83fd1b242898cb188cc3d4c45123e"; 


const weatherResult = document.getElementById("weatherResult");
const mapDiv = document.getElementById("map");

// Leaflet Karte initialisieren
let map = L.map('map').setView([51.1657, 10.4515], 5); // Deutschland zentriert als Start
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap'
}).addTo(map);

let marker;

document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Bitte gib eine Stadt ein.");
    return;
  }

  weatherResult.textContent = "Wetter wird geladen...";
  fetchWeather(city);
});

function fetchWeather(city) {
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  const url = `${baseUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=de`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP Fehler: ${res.status} ${res.statusText}`);
      return res.json();
    })
    .then(data => {
      if (data.cod !== 200) throw new Error(`API Fehler: ${data.message}`);

      showWeather(data);
      updateMap(data.coord.lat, data.coord.lon, data.name);
    })
    .catch(err => {
      weatherResult.textContent = `Fehler: ${err.message}`;
      console.error("Fetch Fehler:", err);
      // Karte zurücksetzen auf Deutschland
      map.setView([51.1657, 10.4515], 5);
      if (marker) {
        map.removeLayer(marker);
        marker = null;
      }
    });
}

function showWeather(data) {
  weatherResult.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p style="text-transform: capitalize;">${data.weather[0].description}</p>
    <p>🌡️ Temperatur: ${data.main.temp} °C (Gefühlt: ${data.main.feels_like} °C)</p>
    <p>💧 Luftfeuchtigkeit: ${data.main.humidity}%</p>
    <p>💨 Wind: ${data.wind.speed} m/s</p>
  `;
}

function updateMap(lat, lon, cityName) {
  map.setView([lat, lon], 10);
  if (marker) {
    marker.setLatLng([lat, lon]);
  } else {
    marker = L.marker([lat, lon]).addTo(map);
  }
  marker.bindPopup(`<b>${cityName}</b>`).openPopup();
}
