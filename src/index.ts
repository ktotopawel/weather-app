import getWeatherData from "./weather";
import populateContent from "./handleDOM";
import "./styles.css";

const searchbox = document.querySelector<HTMLInputElement>("#location");

document.addEventListener("DOMContentLoaded", runScript);

async function runScript() {
  const weatherData = await getWeatherData("new york");
  console.log(weatherData);
  populateContent(weatherData);
}

function search() {
  searchbox?.addEventListener("keydown", async (e) => {
    if (e.code === "Enter" && searchbox) {
      const weatherData = await getWeatherData(searchbox.value);
      populateContent(weatherData);
    }
  });
}

search();
