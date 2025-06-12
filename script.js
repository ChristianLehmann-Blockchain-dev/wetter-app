
document.getElementById("searchBtn").addEventListener("click", getWeather);

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Bitte gib eine Stadt ein.");
    return;
  }

  const apiKey = "fac83fd1b242898cb188cc3d4c45123e"; 
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  const url = `${baseUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=de`;

  const resultDiv = document.getElementById("weatherResult");
  resultDiv.textContent = "Wetter wird geladen...";

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP Fehler: ${res.status} ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => {
      if (data.cod !== 200) {
        throw new Error(`API Fehler: ${data.message}`);
      }

      resultDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p style="text-transform: capitalize;">${data.weather[0].description}</p>
        <p>🌡️ Temperatur: ${data.main.temp} °C (Gefühlt: ${data.main.feels_like} °C)</p>
        <p>💧 Luftfeuchtigkeit: ${data.main.humidity}%</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
      `;
    })
    .catch((err) => {
      resultDiv.textContent = `Fehler: ${err.message}`;
      console.error("Fetch Fehler:", err);
    });
}
