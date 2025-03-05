import { format } from "date-fns";
import d2d from "degrees-to-direction";
// eslint-disable-next-line no-undef
const icons = require.context("./icons", false, /\.svg$/);

const images = icons.keys().reduce((acc, path) => {
  const key = path.replace("./", "").replace(".svg", "");
  acc[key] = icons(path);
  return acc;
}, {});

export default function populateContent(weatherData) {
  const address = document.querySelector(".location");
  const conditions = document.querySelector("#conditions");
  const tempCurrent = document.querySelector("#current-temp");
  const currentIcon = document.querySelector("#current-icon");
  const tempFeelslike = document.querySelector("#feelslike-temp");
  const maxTemp = document.querySelector("#maxtemp");
  const minTemp = document.querySelector("#mintemp");
  const precip = document.querySelector("#precip");
  const windDir = document.querySelector("#wind-dir");
  const windSpeed = document.querySelector("#wind-speed");
  const pressure = document.querySelector("#pressure");
  const sunrise = document.querySelector("#sunrise");
  const sunset = document.querySelector("#sunset");
  const uvIndex = document.querySelector("#UV");
  const description = document.querySelector("#description");

  function mainDisplay(dayIndex) {
    address.textContent = weatherData.address;
    conditions.textContent = weatherData.days[dayIndex].conditions;
    tempCurrent.textContent = Math.round(weatherData.days[dayIndex].temp);

    const iconName = weatherData.days[dayIndex].icon;
    currentIcon.src = images[iconName];

    tempFeelslike.textContent = Math.round(
      weatherData.days[dayIndex].feelslike,
    );
    maxTemp.textContent = Math.round(weatherData.days[dayIndex].tempmax) + "℃";
    minTemp.textContent = Math.round(weatherData.days[dayIndex].tempmin) + "℃";
    precip.textContent = Math.round(weatherData.days[dayIndex].precip) + "%";
    windDir.textContent = d2d(weatherData.days[dayIndex].winddir);
    windSpeed.textContent =
      Math.round(weatherData.days[dayIndex].windspeed) + " km/h";
    pressure.textContent =
      Math.round(weatherData.days[dayIndex].pressure) + " hPa";
    sunrise.textContent = weatherData.days[dayIndex].sunrise;
    sunset.textContent = weatherData.days[dayIndex].sunset;
    uvIndex.textContent = weatherData.days[dayIndex].uvindex;
    description.textContent = weatherData.days[dayIndex].description;
  }

  function upcomingDays() {
    const daysDisplay = document.querySelector(".days");

    //removes the days when changing locations
    while (daysDisplay.firstChild) {
      daysDisplay.removeChild(daysDisplay.firstChild);
    }

    for (let i = 0; i < weatherData.days.length; i++) {
      const day = weatherData.days[i];

      const dayDisplay = document.createElement("div");
      dayDisplay.classList.add("day");
      dayDisplay.id = `${i}`;
      daysDisplay.appendChild(dayDisplay);
      dayDisplay.addEventListener("click", () => mainDisplay(i));

      const dateDisplay = document.createElement("div");
      dateDisplay.classList.add("date");
      dateDisplay.textContent = format(new Date(day.date), "iii, dd-MM-yyyy");
      dayDisplay.appendChild(dateDisplay);

      const tempDisplay = document.createElement("div");
      tempDisplay.classList.add("day-temp", "celsius");
      tempDisplay.textContent = Math.round(day.temp);
      dayDisplay.appendChild(tempDisplay);

      const maxMinDisplay = document.createElement("div");
      maxMinDisplay.classList.add("day-maxmin");
      dayDisplay.appendChild(maxMinDisplay);

      const maxDiv = document.createElement("div");
      maxDiv.textContent = "Max:";
      maxMinDisplay.appendChild(maxDiv);

      const max = document.createElement("span");
      max.classList.add("max", "celsius");
      max.textContent = Math.round(day.tempmax);
      maxDiv.appendChild(max);

      const minDiv = document.createElement("div");
      minDiv.textContent = "Min:";
      maxMinDisplay.appendChild(minDiv);

      const min = document.createElement("span");
      min.classList.add("min", "celsius");
      min.textContent = Math.round(day.tempmin);
      minDiv.appendChild(min);

      const dayIconDiv = document.createElement("div");
      dayIconDiv.classList.add("day-icon");
      dayDisplay.appendChild(dayIconDiv);

      const dayIcon = document.createElement("img");
      dayIcon.classList.add("icon");
      const iconName = day.icon;
      dayIcon.src = images[iconName];
      dayIconDiv.appendChild(dayIcon);
    }
  }

  mainDisplay(0);

  upcomingDays();
}
