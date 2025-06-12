const apiKey = "fac83fd1b242898cb188cc3d4c45123e";

let map;
let marker;

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Bitte gib eine Stadt ein.");
    return;
  }

  document.getElementById("weatherResult").textContent = "Wetter wird geladen...";

  fetch(apiKey.replace("{CITY}", city))
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        document.getElementById("weatherResult").textContent = "Stadt nicht gefunden.";
        return;
      }

      const { name, main, weather, coord, wind, sys } = data;

      document.getElementById("weatherResult").innerHTML = `
        <h2>${name}, ${sys.country}</h2>
        <p style="text-transform: capitalize;">${weather[0].description}</p>
        <p>🌡️ Temperatur: ${main.temp} °C (Gefühlt: ${main.feels_like} °C)</p>
        <p>💧 Luftfeuchtigkeit: ${main.humidity}%</p>
        <p>💨 Wind: ${wind.speed} m/s</p>
      `;

      showMap(coord.lat, coord.lon);
    })
    .catch(() => {
      document.getElementById("weatherResult").textContent = "Fehler beim Laden der Wetterdaten.";
    });
}

function showMap(lat, lon) {
  if (!map) {
    map = L.map("map").setView([lat, lon], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
      maxZoom: 18,
    }).addTo(map);
    marker = L.marker([lat, lon]).addTo(map);
  } else {
    map.setView([lat, lon], 10);
    if (marker) {
      marker.setLatLng([lat, lon]);
    } else {
      marker = L.marker([lat, lon]).addTo(map);
    }
  }
}
