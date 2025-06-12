const API_KEY = "DEIN_API_KEY_HIER"; // Hole dir einen Key unter https://openweathermap.org/api

const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const cityName = document.getElementById("cityName");
const description = document.getElementById("description");
const icon = document.getElementById("icon");
const temp = document.getElementById("temp");
const error = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  weatherResult.classList.add("hidden");
  error.classList.add("hidden");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=de&appid=${API_KEY}`
    );

    if (!response.ok) throw new Error("Stadt nicht gefunden.");

    const data = await response.json();

    cityName.textContent = data.name;
    description.textContent = data.weather[0].description;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    temp.textContent = Math.round(data.main.temp);

    weatherResult.classList.remove("hidden");
  } catch (err) {
    error.textContent = err.message;
    error.classList.remove("hidden");
  }

  cityInput.value = "";
});
