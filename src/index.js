import getWeatherData from "./weather";
import populateContent from "./handleDOM";
import "./styles.css";

document.addEventListener("DOMContentLoaded", runScript);

async function runScript() {
  const weatherData = await getWeatherData("new york");
  console.log(weatherData);
  populateContent(weatherData);
}
