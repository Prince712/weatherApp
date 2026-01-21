import { useState, useEffect, useCallback } from 'react';
import { WeatherService } from '../services/weatherService';
import { LocationService } from '../services/locationService';
import {
  CurrentWeatherResponse,
  ForecastResponse,
  LocationData,
} from '../types/weather.types';

interface UseWeatherReturn {
  currentWeather: CurrentWeatherResponse | null;
  forecast: ForecastResponse | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
  location: LocationData | null;
  refresh: () => Promise<void>;
  fetchWeatherByCity: (city: string) => Promise<void>;
}

export const useWeather = (): UseWeatherReturn => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherResponse | null>(null);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);

  /**
   * Fetch weather data by coordinates
   */
  const fetchWeatherByCoords = useCallback(async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError(null);

      const [weatherData, forecastData] = await Promise.all([
        WeatherService.getCurrentWeatherByCoords(lat, lon),
        WeatherService.getForecast(lat, lon),
      ]);

      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setLocation({
        latitude: lat,
        longitude: lon,
        city: weatherData.name,
        country: weatherData.sys.country,
      });
      setLastUpdated(Date.now());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch weather data by city name
   */
  const fetchWeatherByCity = useCallback(async (city: string) => {
    try {
      setLoading(true);
      setError(null);

      const weatherData = await WeatherService.getCurrentWeatherByCity(city);
      const forecastData = await WeatherService.getForecast(
        weatherData.coord.lat,
        weatherData.coord.lon
      );

      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setLocation({
        latitude: weatherData.coord.lat,
        longitude: weatherData.coord.lon,
        city: weatherData.name,
        country: weatherData.sys.country,
      });
      setLastUpdated(Date.now());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'City not found';
      setError(errorMessage);
      console.error('City search error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get current location and fetch weather
   */
  const fetchWeatherByCurrentLocation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const locationData = await LocationService.getCurrentLocation();
      await fetchWeatherByCoords(locationData.latitude, locationData.longitude);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Unable to get your location';
      setError(errorMessage);
      console.error('Location error:', err);
      
      // Fallback to a default city if location fails
      try {
        await fetchWeatherByCity('London');
      } catch (fallbackErr) {
        console.error('Fallback city error:', fallbackErr);
      }
    } finally {
      setLoading(false);
    }
  }, [fetchWeatherByCoords, fetchWeatherByCity]);

  /**
   * Refresh weather data
   */
  const refresh = useCallback(async () => {
    if (location) {
      await fetchWeatherByCoords(location.latitude, location.longitude);
    } else {
      await fetchWeatherByCurrentLocation();
    }
  }, [location, fetchWeatherByCoords, fetchWeatherByCurrentLocation]);

  /**
   * Initial weather fetch on mount
   */
  useEffect(() => {
    fetchWeatherByCurrentLocation();
  }, []);

  return {
    currentWeather,
    forecast,
    loading,
    error,
    lastUpdated,
    location,
    refresh,
    fetchWeatherByCity,
  };
};
