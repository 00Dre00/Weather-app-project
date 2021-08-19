//Feature 1
function formatDate(now) {
  let h3 = document.querySelector("h3");

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  h3.innerHTML = `${day} ${hours}:${minutes}`;
  return h3.innerHTML;
}
console.log(formatDate(new Date()));

//Feature 2
function searchCity(city) {
  let apiKey = "195371f14fc4f92fa2dc2f8afa438ba7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");
  let location = document.querySelector("#city");
  location.innerHTML = `${searchInput.value}:`;
  searchCity(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function displayWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function showPosition(position) {
  let apiKey = "6c19daaca2f5b29c42112f1a349df87f";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentData() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentData);
