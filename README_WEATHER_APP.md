# Modern Weather App - React Native + TypeScript

A production-ready, feature-rich weather application built with React Native and TypeScript. This app provides real-time weather information with a beautiful, modern UI that adapts to system theme preferences.

## ✨ Features

### Core Features
- 🌍 **Auto-Location Detection** - Automatically detects user's current location
- 🔍 **City Search** - Manual city search with instant results
- 🌡️ **Current Weather** - Detailed current weather information
- ⏰ **Hourly Forecast** - Next 24 hours weather forecast with horizontal scroll
- 📅 **7-Day Forecast** - Weekly weather predictions
- 🔄 **Pull to Refresh** - Easy data refresh functionality
- ⚡ **Real-time Updates** - Shows last updated timestamp

### Weather Details
- Temperature (current, feels-like, min/max)
- Humidity levels with descriptions
- Wind speed and direction
- Visibility conditions
- Atmospheric pressure
- Cloud coverage
- Sunrise and sunset times
- Probability of precipitation

### UI/UX Features
- 🎨 **Modern Card-Based Layout** - Clean, professional design
- 🌓 **Light/Dark Mode** - Automatic system theme detection
- 🎭 **Dynamic Backgrounds** - Weather-condition-based themes
- ⚡ **Smooth Animations** - Micro-interactions and transitions
- 💀 **Skeleton Loaders** - Beautiful loading states
- ❌ **Error Handling** - Comprehensive error states with retry
- 📱 **Responsive Design** - Works great on all screen sizes

## 🛠️ Tech Stack

- **React Native** 0.66.4
- **TypeScript** 5.9.3
- **React Navigation** - For navigation (future expansion)
- **Axios** - HTTP client for API calls
- **React Native Vector Icons** - Beautiful icons
- **OpenWeatherMap API** - Weather data provider
- **Geolocation** - Device location services

## 📁 Project Structure

```
/app
├── src/
│   ├── components/
│   │   └── weather/
│   │       ├── DailyForecast.tsx
│   │       ├── ErrorState.tsx
│   │       ├── HourlyForecast.tsx
│   │       ├── SearchBar.tsx
│   │       ├── SkeletonLoader.tsx
│   │       ├── WeatherAnimation.tsx
│   │       └── WeatherDetailCard.tsx
│   ├── hooks/
│   │   ├── useColorScheme.ts
│   │   └── useWeather.ts
│   ├── screens/
│   │   └── Weather/
│   │       └── HomeScreen.tsx
│   ├── services/
│   │   ├── locationService.ts
│   │   └── weatherService.ts
│   ├── theme/
│   │   └── colors.ts
│   ├── types/
│   │   └── weather.types.ts
│   └── utils/
│       └── helpers.ts
├── App.tsx
├── tsconfig.json
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 14.x)
- Yarn
- React Native development environment set up
- Android Studio (for Android) or Xcode (for iOS)

### Installation

1. **Install dependencies:**
   ```bash
   cd /app
   yarn install
   ```

2. **Install iOS pods (macOS only):**
   ```bash
   cd ios
   pod install
   cd ..
   ```

### Running the App

**Android:**
```bash
yarn android
```

**iOS:**
```bash
yarn ios
```

**Start Metro Bundler:**
```bash
yarn start
```

## 🔑 API Configuration

The app uses OpenWeatherMap API for weather data. The API key is already configured in `/app/src/services/weatherService.ts`.

For production use, consider:
1. Moving the API key to environment variables
2. Setting up a backend proxy to secure the API key
3. Implementing rate limiting

## 📱 Permissions

### Android
Location permissions are configured in `android/app/src/main/AndroidManifest.xml`:
- `ACCESS_FINE_LOCATION`
- `ACCESS_COARSE_LOCATION`

### iOS
Location permission is configured in `ios/demoTask/Info.plist`:
- `NSLocationWhenInUseUsageDescription`

## 🎨 Theming

The app automatically detects system theme preferences (light/dark mode) and applies appropriate colors and gradients.

### Color Themes
- **Light Mode**: Bright, vibrant colors with light backgrounds
- **Dark Mode**: Soft, muted colors with dark backgrounds
- **Weather-Based Gradients**: Dynamic backgrounds based on current weather conditions

## 🧩 Components

### Core Components

1. **HomeScreen** - Main weather display screen
2. **SearchBar** - City search with current location button
3. **HourlyForecast** - Horizontal scroll of hourly weather
4. **DailyForecast** - 7-day weather forecast cards
5. **WeatherDetailCard** - Reusable card for weather metrics
6. **SkeletonLoader** - Loading state animations
7. **ErrorState** - Error handling with retry functionality

### Hooks

- **useWeather** - Weather data fetching and management
- **useColorScheme** - System theme detection

### Services

- **WeatherService** - All weather API calls
- **LocationService** - Geolocation functionality

## 📊 Features Roadmap

### Implemented ✅
- Auto-location detection
- City search
- Current weather display
- Hourly forecast (24h)
- 7-day forecast
- Weather details cards
- Pull-to-refresh
- Skeleton loaders
- Error states with retry
- Light/Dark mode
- TypeScript throughout

### Future Enhancements 🚀
- [ ] Add Lottie animations for weather conditions
- [ ] Weather alerts and notifications
- [ ] Multiple saved locations
- [ ] Weather maps
- [ ] Air quality index
- [ ] Share weather information
- [ ] Widget support
- [ ] Offline mode with cached data
- [ ] Unit preferences (Metric/Imperial)
- [ ] Multiple languages support

## 🔧 Development

### TypeScript

The entire codebase is written in TypeScript with strict typing enabled. All API responses, component props, and state are properly typed.

### Code Style

- **Components**: Functional components with TypeScript
- **Styling**: StyleSheet API with theme-based colors
- **State Management**: React hooks
- **API Calls**: Async/await with proper error handling

### Testing

Run tests:
```bash
yarn test
```

## 📄 License

This project is open source and available for educational and commercial use.

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
- UI inspiration from top weather apps on App Store and Play Store

## 📞 Support

For issues, questions, or contributions, please open an issue in the repository.

---

**Built with ❤️ using React Native and TypeScript**
