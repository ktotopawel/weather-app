import getWeatherData from "./weather";
import populateContent from "./handleDOM";
import "./styles.css";

document.addEventListener("DOMContentLoaded", runScript);

async function runScript() {
  const weatherData = await getWeatherData("new york");
  console.log(weatherData);
  populateContent(weatherData);
}

function search() {
  const searchbox = document.querySelector("#location");

  searchbox.addEventListener("keydown", async (e) => {
    if (e.code === "Enter") {
      const weatherData = await getWeatherData(searchbox.value);

      populateContent(weatherData);
    }
  });
}

search();
