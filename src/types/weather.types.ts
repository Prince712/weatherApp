// OpenWeatherMap API response types

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface Rain {
  '1h'?: number;
  '3h'?: number;
}

export interface Snow {
  '1h'?: number;
  '3h'?: number;
}

export interface CurrentWeatherResponse {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: MainWeather;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  rain?: Rain;
  snow?: Snow;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface HourlyForecast {
  dt: number;
  main: MainWeather;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number; // Probability of precipitation
  rain?: Rain;
  snow?: Snow;
  sys: {
    pod: string; // Part of day (d = day, n = night)
  };
  dt_txt: string;
}

export interface DailyForecast {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  weather: Weather[];
  speed: number;
  deg: number;
  gust?: number;
  clouds: number;
  pop: number;
  rain?: number;
  snow?: number;
  uvi: number; // UV Index
}

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: HourlyForecast[];
  city: {
    id: number;
    name: string;
    coord: Coordinates;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface OneCallResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust?: number;
    weather: Weather[];
    rain?: { '1h': number };
    snow?: { '1h': number };
  };
  hourly: Array<{
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust?: number;
    weather: Weather[];
    pop: number;
  }>;
  daily: DailyForecast[];
}

export interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

export interface WeatherState {
  currentWeather: CurrentWeatherResponse | null;
  forecast: ForecastResponse | null;
  oneCall: OneCallResponse | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
  location: LocationData | null;
}

export type WeatherCondition = 
  | 'Clear' 
  | 'Clouds' 
  | 'Rain' 
  | 'Drizzle' 
  | 'Thunderstorm' 
  | 'Snow' 
  | 'Mist' 
  | 'Smoke' 
  | 'Haze' 
  | 'Dust' 
  | 'Fog' 
  | 'Sand' 
  | 'Ash' 
  | 'Squall' 
  | 'Tornado';

export type TimeOfDay = 'day' | 'night';
