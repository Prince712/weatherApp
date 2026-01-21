import { WeatherCondition } from '../types/weather.types';

/**
 * Convert Kelvin to Celsius
 */
export const kelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
};

/**
 * Convert Celsius to Fahrenheit
 */
export const celsiusToFahrenheit = (celsius: number): number => {
  return Math.round((celsius * 9) / 5 + 32);
};

/**
 * Format temperature
 */
export const formatTemp = (temp: number, unit: 'C' | 'F' = 'C'): string => {
  return `${Math.round(temp)}°${unit}`;
};

/**
 * Format date from timestamp
 */
export const formatDate = (timestamp: number, format: 'short' | 'long' | 'time' = 'short'): string => {
  const date = new Date(timestamp * 1000);
  
  if (format === 'time') {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }
  
  if (format === 'long') {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  }
  
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
};

/**
 * Get day name from timestamp
 */
export const getDayName = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }

  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

/**
 * Get short day name from timestamp
 */
export const getShortDayName = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

/**
 * Get time of day based on timestamp and sunrise/sunset
 */
export const getTimeOfDay = (
  currentTime: number,
  sunrise: number,
  sunset: number
): 'day' | 'night' => {
  if (currentTime >= sunrise && currentTime <= sunset) {
    return 'day';
  }
  return 'night';
};

/**
 * Capitalize first letter of each word
 */
export const capitalizeWords = (str: string): string => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Get weather icon name for Ionicons
 */
export const getWeatherIconName = (
  condition: string,
  isDay: boolean = true
): string => {
  const conditionLower = condition.toLowerCase();

  const iconMap: { [key: string]: { day: string; night: string } } = {
    clear: { day: 'sunny', night: 'moon' },
    clouds: { day: 'cloudy', night: 'cloudy-night' },
    rain: { day: 'rainy', night: 'rainy' },
    drizzle: { day: 'rainy', night: 'rainy' },
    thunderstorm: { day: 'thunderstorm', night: 'thunderstorm' },
    snow: { day: 'snow', night: 'snow' },
    mist: { day: 'cloud', night: 'cloud' },
    fog: { day: 'cloud', night: 'cloud' },
  };

  for (const [key, value] of Object.entries(iconMap)) {
    if (conditionLower.includes(key)) {
      return isDay ? value.day : value.night;
    }
  }

  return 'partly-sunny';
};

/**
 * Get Lottie animation file name based on weather condition
 */
export const getWeatherAnimation = (
  condition: string,
  isDay: boolean = true
): string => {
  const conditionLower = condition.toLowerCase();

  if (conditionLower.includes('clear')) {
    return isDay ? 'sunny' : 'clear-night';
  }
  if (conditionLower.includes('cloud')) {
    return isDay ? 'cloudy' : 'cloudy-night';
  }
  if (conditionLower.includes('rain')) {
    return 'rainy';
  }
  if (conditionLower.includes('drizzle')) {
    return 'drizzle';
  }
  if (conditionLower.includes('thunder')) {
    return 'thunderstorm';
  }
  if (conditionLower.includes('snow')) {
    return 'snow';
  }
  if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
    return 'mist';
  }

  return 'default';
};

/**
 * Get wind direction from degrees
 */
export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

/**
 * Get UV index level
 */
export const getUVIndexLevel = (uvi: number): string => {
  if (uvi <= 2) return 'Low';
  if (uvi <= 5) return 'Moderate';
  if (uvi <= 7) return 'High';
  if (uvi <= 10) return 'Very High';
  return 'Extreme';
};

/**
 * Get humidity level description
 */
export const getHumidityLevel = (humidity: number): string => {
  if (humidity < 30) return 'Dry';
  if (humidity < 60) return 'Comfortable';
  if (humidity < 80) return 'Humid';
  return 'Very Humid';
};

/**
 * Get visibility level description
 */
export const getVisibilityLevel = (visibility: number): string => {
  if (visibility >= 10000) return 'Excellent';
  if (visibility >= 5000) return 'Good';
  if (visibility >= 2000) return 'Moderate';
  if (visibility >= 1000) return 'Poor';
  return 'Very Poor';
};

/**
 * Convert meters per second to kilometers per hour
 */
export const mpsToKmh = (mps: number): number => {
  return Math.round(mps * 3.6);
};

/**
 * Convert meters per second to miles per hour
 */
export const mpsToMph = (mps: number): number => {
  return Math.round(mps * 2.237);
};

/**
 * Get time ago string
 */
export const getTimeAgo = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return 'Yesterday';
};

/**
 * Format last updated time
 */
export const formatLastUpdated = (timestamp: number | null): string => {
  if (!timestamp) return 'Never';
  
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  
  return date.toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};
