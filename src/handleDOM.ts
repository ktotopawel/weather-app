import { format } from "date-fns";
import d2d from "degrees-to-direction";
import { WeatherData } from "./types";

const icons = require.context("./icons", false, /\.svg$/);

const images: { [key: string]: string } = icons
  .keys()
  .reduce((acc: { [key: string]: string }, path: string) => {
    const key = path.replace("./", "").replace(".svg", "");
    acc[key] = icons(path);
    return acc;
  }, {});

export default function populateContent(weatherData: WeatherData): void {
  const address = document.querySelector(".location") as HTMLElement;
  const conditions = document.querySelector("#conditions") as HTMLElement;
  const tempCurrent = document.querySelector("#current-temp") as HTMLElement;
  const currentIcon = document.querySelector(
    "#current-icon",
  ) as HTMLImageElement;
  const tempFeelslike = document.querySelector(
    "#feelslike-temp",
  ) as HTMLElement;
  const maxTemp = document.querySelector("#maxtemp") as HTMLElement;
  const minTemp = document.querySelector("#mintemp") as HTMLElement;
  const precip = document.querySelector("#precip") as HTMLElement;
  const windDir = document.querySelector("#wind-dir") as HTMLElement;
  const windSpeed = document.querySelector("#wind-speed") as HTMLElement;
  const pressure = document.querySelector("#pressure") as HTMLElement;
  const sunrise = document.querySelector("#sunrise") as HTMLElement;
  const sunset = document.querySelector("#sunset") as HTMLElement;
  const uvIndex = document.querySelector("#UV") as HTMLElement;
  const description = document.querySelector("#description") as HTMLElement;

  function mainDisplay(dayIndex: number): void {
    const day = weatherData.days[dayIndex];
    address.textContent = weatherData.address;
    conditions.textContent = day.conditions;
    tempCurrent.textContent = Math.round(day.temp).toString();

    currentIcon.src = images[day.icon] ?? "";

    tempFeelslike.textContent = Math.round(day.feelslike).toString();
    maxTemp.textContent = `${Math.round(day.tempmax)}℃`;
    minTemp.textContent = `${Math.round(day.tempmin)}℃`;
    precip.textContent = `${Math.round(day.precip)}%`;
    windDir.textContent = d2d(day.winddir);
    windSpeed.textContent = `${Math.round(day.windspeed)} km/h`;
    pressure.textContent = `${Math.round(day.pressure)} hPa`;
    sunrise.textContent = day.sunrise;
    sunset.textContent = day.sunset;
    uvIndex.textContent = day.uvindex.toString();
    description.textContent = day.description;
  }

  function upcomingDays(): void {
    const daysDisplay = document.querySelector(".days") as HTMLElement;

    while (daysDisplay.firstChild) {
      daysDisplay.removeChild(daysDisplay.firstChild);
    }

    weatherData.days.forEach((day, i) => {
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
      tempDisplay.textContent = Math.round(day.temp).toString();
      dayDisplay.appendChild(tempDisplay);

      const maxMinDisplay = document.createElement("div");
      maxMinDisplay.classList.add("day-maxmin");
      dayDisplay.appendChild(maxMinDisplay);

      const maxDiv = document.createElement("div");
      maxDiv.textContent = "Max:";
      maxMinDisplay.appendChild(maxDiv);

      const max = document.createElement("span");
      max.classList.add("max", "celsius");
      max.textContent = Math.round(day.tempmax).toString();
      maxDiv.appendChild(max);

      const minDiv = document.createElement("div");
      minDiv.textContent = "Min:";
      maxMinDisplay.appendChild(minDiv);

      const min = document.createElement("span");
      min.classList.add("min", "celsius");
      min.textContent = Math.round(day.tempmin).toString();
      minDiv.appendChild(min);

      const dayIconDiv = document.createElement("div");
      dayIconDiv.classList.add("day-icon");
      dayDisplay.appendChild(dayIconDiv);

      const dayIcon = document.createElement("img");
      dayIcon.classList.add("icon");
      dayIcon.src = images[day.icon] ?? "";
      dayIconDiv.appendChild(dayIcon);
    });
  }

  mainDisplay(0);
  upcomingDays();
}
