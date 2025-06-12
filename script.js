const apiKey = "fac83fd1b242898cb188cc3d4c45123e";

let map;

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return;

  fetch(apiKey.replace("{CITY}", city))
    .then((res) => res.json())
    .then((data) => {
      if (data.cod !== 200) {
        document.getElementById("weatherResult").textContent = "Stadt nicht gefunden.";
        return;
      }

      const { name, main, weather, coord } = data;
      document.getElementById("weatherResult").innerHTML = `
        <h2>${name}</h2>
        <p>${weather[0].description}</p>
        <p>🌡️ ${main.temp} °C</p>
      `;

      showMap(coord.lat, coord.lon);
    })
    .catch(() => {
      document.getElementById("weatherResult").textContent = "Fehler beim Laden.";
    });
}

function showMap(lat, lon) {
  if (!map) {
    map = L.map("map").setView([lat, lon], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);
  } else {
    map.setView([lat, lon], 10);
    L.marker([lat, lon]).addTo(map);
  }
}
