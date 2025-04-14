import { addDays, format } from "date-fns";
import { APIResponse, Day, WeatherData } from "./types";

class Week {
  date: Date;
  weatherData: APIResponse;

  constructor(weatherData: APIResponse) {
    this.date = new Date();
    this.weatherData = weatherData;
  }

  weekArray(): Day[] {
    const week: Day[] = [];

    for (let i = 0; i < 8; i++) {
      const dayDate = format(addDays(this.date, i), "yyyy-MM-dd");
      const match = this.weatherData.days.find(
        (day) => day.datetime === dayDate,
      );
      if (match) {
        week.push({ date: dayDate, ...match });
      }
    }

    return week;
  }
}

export default async function getWeatherData(
  location: string,
  tempFormat?: "us" | "metric",
): Promise<WeatherData> {
  const tempUnit = tempFormat ?? "metric";

  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?key=QH5MDZP895AXPWKBG37GVJ9C6&unitGroup=${tempUnit}`,
  );

  const data: APIResponse = await response.json();

  const weatherData: WeatherData = {
    address: data.resolvedAddress,
    alerts: data.alerts,
    days: new Week(data).weekArray(),
  };

  return weatherData;
}
