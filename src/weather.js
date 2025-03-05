import { addDays, format } from "date-fns";

export default async function getWeatherData(location, tempFormat) {
  const format = tempFormat ? tempFormat : "metric";

  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?key=QH5MDZP895AXPWKBG37GVJ9C6&unitGroup=${format}`,
  );

  const data = await response.json();

  console.log(data);

  const weatherData = {
    address: data.resolvedAddress,
    alerts: data.alerts,
    description: data.description,
    days: new Week(data).weekArray(),
  };

  console.log(weatherData);

  return weatherData;
}

class Day {
  constructor(date, weatherData) {
    this.date = date;
    this.weatherData = weatherData.days.find((day) => day.datetime === date);
    // this.cloudCover = this.weatherData.cloudcover,
    // this.conditions = this.weatherData.conditions,
    // this.precip = this.weatherData.precip,
    // this.precipProb = this.precipprob,
    // this.sunrise = this.weatherData.sunrise,
    // this.sunset = this.weatherData.sunset,
    // this.hours =
  }
}

class Week {
  constructor(weatherData) {
    this.date = new Date();
    this.weekArray = function () {
      const weekArray = [];

      for (let index = 0; index < 7; index++) {
        weekArray.push(
          new Day(
            format(addDays(this.date, index), "yyyy-MM-dd"),
            this.weatherData,
          ),
        );
      }

      return weekArray;
    };
    this.weatherData = weatherData;
  }
}
