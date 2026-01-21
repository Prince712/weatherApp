import axios from 'axios';
import {
  CurrentWeatherResponse,
  ForecastResponse,
  OneCallResponse,
  Coordinates,
} from '../types/weather.types';

const API_KEY = 'd3d24cdd86f4ceddead0a4cbd1e49000';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export class WeatherService {
  /**
   * Get current weather by coordinates
   */
  static async getCurrentWeatherByCoords(
    lat: number,
    lon: number
  ): Promise<CurrentWeatherResponse> {
    try {
      const response = await axios.get<CurrentWeatherResponse>(
        `${BASE_URL}/weather`,
        {
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get current weather by city name
   */
  static async getCurrentWeatherByCity(
    city: string
  ): Promise<CurrentWeatherResponse> {
    try {
      const response = await axios.get<CurrentWeatherResponse>(
        `${BASE_URL}/weather`,
        {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get 5-day / 3-hour forecast
   */
  static async getForecast(
    lat: number,
    lon: number
  ): Promise<ForecastResponse> {
    try {
      const response = await axios.get<ForecastResponse>(
        `${BASE_URL}/forecast`,
        {
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get One Call API data (current, hourly, daily)
   * Note: This requires OpenWeatherMap One Call API 3.0 subscription
   * For free tier, we'll use the combination of current + forecast APIs
   */
  static async getOneCallData(
    lat: number,
    lon: number
  ): Promise<OneCallResponse | null> {
    try {
      // One Call API 3.0 endpoint (requires subscription)
      const response = await axios.get<OneCallResponse>(
        `https://api.openweathermap.org/data/3.0/onecall`,
        {
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric',
            exclude: 'minutely,alerts',
          },
        }
      );
      return response.data;
    } catch (error) {
      // If One Call API is not available (free tier), return null
      // We'll handle this in the component by using separate APIs
      console.log('One Call API not available, using alternative endpoints');
      return null;
    }
  }

  /**
   * Search cities by name
   */
  static async searchCities(query: string): Promise<CurrentWeatherResponse[]> {
    try {
      // OpenWeatherMap doesn't have a dedicated search endpoint
      // We'll use the current weather endpoint and handle the search in the UI
      const response = await axios.get<CurrentWeatherResponse>(
        `${BASE_URL}/weather`,
        {
          params: {
            q: query,
            appid: API_KEY,
            units: 'metric',
          },
        }
      );
      return [response.data];
    } catch (error) {
      // Return empty array if no results found
      return [];
    }
  }

  /**
   * Get weather by multiple cities
   */
  static async getWeatherForMultipleCities(
    cityIds: number[]
  ): Promise<CurrentWeatherResponse[]> {
    try {
      const promises = cityIds.map((id) =>
        axios.get<CurrentWeatherResponse>(`${BASE_URL}/weather`, {
          params: {
            id,
            appid: API_KEY,
            units: 'metric',
          },
        })
      );
      const responses = await Promise.all(promises);
      return responses.map((res) => res.data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get air pollution data
   */
  static async getAirPollution(lat: number, lon: number): Promise<any> {
    try {
      const response = await axios.get(
        `${BASE_URL}/air_pollution`,
        {
          params: {
            lat,
            lon,
            appid: API_KEY,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log('Air pollution data not available');
      return null;
    }
  }

  /**
   * Error handler
   */
  private static handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with error
        const message = error.response.data?.message || 'Weather service error';
        return new Error(message);
      } else if (error.request) {
        // Request made but no response
        return new Error('No response from weather service. Check your internet connection.');
      }
    }
    return new Error('An unexpected error occurred');
  }

  /**
   * Parse hourly forecast from 5-day forecast data
   * Gets next 24 hours
   */
  static parseHourlyForecast(forecast: ForecastResponse) {
    return forecast.list.slice(0, 8); // 8 * 3 hours = 24 hours
  }

  /**
   * Parse daily forecast from 5-day forecast data
   * Groups by day and calculates min/max temperatures
   */
  static parseDailyForecast(forecast: ForecastResponse) {
    const dailyData: { [key: string]: any } = {};

    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString();

      if (!dailyData[date]) {
        dailyData[date] = {
          dt: item.dt,
          date,
          temps: [],
          weather: item.weather[0],
          humidity: item.main.humidity,
          wind: item.wind,
          pop: item.pop,
        };
      }

      dailyData[date].temps.push(item.main.temp);
    });

    return Object.values(dailyData).map((day: any) => ({
      ...day,
      temp_min: Math.min(...day.temps),
      temp_max: Math.max(...day.temps),
    }));
  }
}
