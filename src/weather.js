import { addDays, format } from "date-fns";

export default async function getWeatherData(location, tempFormat) {
  const tempUnit = tempFormat ? tempFormat : "metric";

  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?key=QH5MDZP895AXPWKBG37GVJ9C6&unitGroup=${tempUnit}`,
  );

  const data = await response.json();

  console.log(data);

  const weatherData = {
    address: data.resolvedAddress,
    alerts: data.alerts,

    days: new Week(data).weekArray(),
  };

  return weatherData;
}

class Day {
  constructor(date, weatherData) {
    this.date = date;
    this.temp = weatherData.temp;
    this.conditions = weatherData.conditions;
    this.feelslike = weatherData.feelslike;
    this.icon = weatherData.icon;
    this.description = weatherData.description;
    this.tempmax = weatherData.tempmax;
    this.tempmin = weatherData.tempmin;
    this.precip = weatherData.precip;
    this.pressure = weatherData.pressure;
    this.winddir = weatherData.winddir;
    this.windspeed = weatherData.windspeed;
    this.uvindex = weatherData.uvindex;
    this.sunrise = weatherData.sunrise;
    this.sunset = weatherData.sunset;
  }
}

class Week {
  constructor(weatherData) {
    this.date = new Date();
    this.weekArray = function () {
      const weekArray = [];

      for (let index = 0; index < 8; index++) {
        const dayDate = format(addDays(this.date, index), "yyyy-MM-dd");
        weekArray.push(
          new Day(
            dayDate,
            weatherData.days.find((day) => day.datetime === dayDate),
          ),
        );
      }

      return weekArray;
    };
    this.weatherData = weatherData;
  }
}
