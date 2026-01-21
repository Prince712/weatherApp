import React, { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useWeather } from '../../hooks/useWeather';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Colors, Spacing, FontSizes, FontWeights } from '../../theme/colors';
import { WeatherGradients } from '../../theme/colors';
import { SearchBar } from '../../components/weather/SearchBar';
import { WeatherAnimation } from '../../components/weather/WeatherAnimation';
import { WeatherDetailCard } from '../../components/weather/WeatherDetailCard';
import { HourlyForecast } from '../../components/weather/HourlyForecast';
import { DailyForecast } from '../../components/weather/DailyForecast';
import { WeatherCardSkeleton } from '../../components/weather/SkeletonLoader';
import { ErrorState } from '../../components/weather/ErrorState';
import { WeatherService } from '../../services/weatherService';
import {
  formatTemp,
  formatDate,
  capitalizeWords,
  getTimeOfDay,
  getWindDirection,
  mpsToKmh,
  getUVIndexLevel,
  getHumidityLevel,
  getVisibilityLevel,
  formatLastUpdated,
} from '../../utils/helpers';

export const HomeScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  
  const {
    currentWeather,
    forecast,
    loading,
    error,
    lastUpdated,
    location,
    refresh,
    fetchWeatherByCity,
  } = useWeather();

  const handleCitySearch = useCallback(
    async (city: string) => {
      await fetchWeatherByCity(city);
    },
    [fetchWeatherByCity]
  );

  const handleCurrentLocation = useCallback(async () => {
    await refresh();
  }, [refresh]);

  // Show skeleton loader while loading
  if (loading && !currentWeather) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <SearchBar
          onSearch={handleCitySearch}
          onCurrentLocation={handleCurrentLocation}
        />
        <WeatherCardSkeleton />
      </View>
    );
  }

  // Show error state
  if (error && !currentWeather) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <SearchBar
          onSearch={handleCitySearch}
          onCurrentLocation={handleCurrentLocation}
        />
        <ErrorState message={error} onRetry={refresh} />
      </View>
    );
  }

  if (!currentWeather || !forecast) {
    return null;
  }

  // Determine time of day for background gradient
  const isDay = getTimeOfDay(
    currentWeather.dt,
    currentWeather.sys.sunrise,
    currentWeather.sys.sunset
  ) === 'day';

  const weatherCondition = currentWeather.weather[0].main;
  const gradientColors = WeatherGradients[colorScheme][weatherCondition] || 
    WeatherGradients[colorScheme].default;

  // Parse forecast data
  const hourlyData = WeatherService.parseHourlyForecast(forecast);
  const dailyData = WeatherService.parseDailyForecast(forecast);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {/* Search Bar */}
        <SearchBar
          onSearch={handleCitySearch}
          onCurrentLocation={handleCurrentLocation}
        />

        {/* Hero Section with Current Weather */}
        <View style={styles.heroSection}>
          {/* Location */}
          <View style={styles.locationContainer}>
            <Text style={[styles.cityName, { color: colors.text }]}>
              {currentWeather.name}
            </Text>
            <Text style={[styles.country, { color: colors.textSecondary }]}>
              {currentWeather.sys.country}
            </Text>
          </View>

          {/* Main Temperature & Animation */}
          <View style={styles.mainWeatherContainer}>
            <WeatherAnimation
              condition={weatherCondition}
              isDay={isDay}
              size={140}
              color={colors.primary}
            />
            
            <Text style={[styles.mainTemp, { color: colors.text }]}>
              {formatTemp(currentWeather.main.temp)}
            </Text>
            
            <Text style={[styles.weatherDescription, { color: colors.textSecondary }]}>
              {capitalizeWords(currentWeather.weather[0].description)}
            </Text>
            
            <Text style={[styles.feelsLike, { color: colors.textSecondary }]}>
              Feels like {formatTemp(currentWeather.main.feels_like)}
            </Text>
          </View>

          {/* Min/Max Temperature */}
          <View style={styles.tempRangeContainer}>
            <View style={styles.tempRangeItem}>
              <Text style={[styles.tempRangeLabel, { color: colors.textSecondary }]}>
                High
              </Text>
              <Text style={[styles.tempRangeValue, { color: colors.text }]}>
                {formatTemp(currentWeather.main.temp_max)}
              </Text>
            </View>
            
            <View style={styles.tempRangeDivider} />
            
            <View style={styles.tempRangeItem}>
              <Text style={[styles.tempRangeLabel, { color: colors.textSecondary }]}>
                Low
              </Text>
              <Text style={[styles.tempRangeValue, { color: colors.text }]}>
                {formatTemp(currentWeather.main.temp_min)}
              </Text>
            </View>
          </View>
        </View>

        {/* Hourly Forecast */}
        {hourlyData && hourlyData.length > 0 && (
          <HourlyForecast data={hourlyData} />
        )}

        {/* Weather Details Grid */}
        <View style={styles.detailsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Weather Details
          </Text>
          
          <View style={styles.detailsGrid}>
            <WeatherDetailCard
              icon="thermometer-outline"
              label="Feels Like"
              value={formatTemp(currentWeather.main.feels_like)}
              description={`Actual temp ${formatTemp(currentWeather.main.temp)}`}
            />
            
            <WeatherDetailCard
              icon="water-outline"
              label="Humidity"
              value={`${currentWeather.main.humidity}%`}
              description={getHumidityLevel(currentWeather.main.humidity)}
            />
            
            <WeatherDetailCard
              icon="speedometer-outline"
              label="Wind Speed"
              value={`${mpsToKmh(currentWeather.wind.speed)} km/h`}
              description={`${getWindDirection(currentWeather.wind.deg)} direction`}
            />
            
            <WeatherDetailCard
              icon="eye-outline"
              label="Visibility"
              value={`${(currentWeather.visibility / 1000).toFixed(1)} km`}
              description={getVisibilityLevel(currentWeather.visibility)}
            />
            
            <WeatherDetailCard
              icon="speedometer"
              label="Pressure"
              value={`${currentWeather.main.pressure} hPa`}
              description="Sea level pressure"
            />
            
            <WeatherDetailCard
              icon="cloud-outline"
              label="Cloudiness"
              value={`${currentWeather.clouds.all}%`}
              description="Cloud coverage"
            />
          </View>
        </View>

        {/* Sunrise & Sunset */}
        <View style={styles.sunSection}>
          <View style={styles.sunItem}>
            <Text style={[styles.sunLabel, { color: colors.textSecondary }]}>
              Sunrise
            </Text>
            <Text style={[styles.sunTime, { color: colors.text }]}>
              {formatDate(currentWeather.sys.sunrise, 'time')}
            </Text>
          </View>
          
          <View style={styles.sunDivider} />
          
          <View style={styles.sunItem}>
            <Text style={[styles.sunLabel, { color: colors.textSecondary }]}>
              Sunset
            </Text>
            <Text style={[styles.sunTime, { color: colors.text }]}>
              {formatDate(currentWeather.sys.sunset, 'time')}
            </Text>
          </View>
        </View>

        {/* Daily Forecast */}
        {dailyData && dailyData.length > 0 && (
          <DailyForecast data={dailyData} />
        )}

        {/* Last Updated */}
        <Text style={[styles.lastUpdated, { color: colors.textSecondary }]}>
          Last updated: {formatLastUpdated(lastUpdated)}
        </Text>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  heroSection: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xl,
    alignItems: 'center',
  },
  locationContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  cityName: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
  },
  country: {
    fontSize: FontSizes.lg,
    marginTop: Spacing.xs,
  },
  mainWeatherContainer: {
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  mainTemp: {
    fontSize: 72,
    fontWeight: FontWeights.bold,
    marginTop: Spacing.md,
  },
  weatherDescription: {
    fontSize: FontSizes.xl,
    marginTop: Spacing.sm,
    textTransform: 'capitalize',
  },
  feelsLike: {
    fontSize: FontSizes.base,
    marginTop: Spacing.xs,
  },
  tempRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
  tempRangeItem: {
    flex: 1,
    alignItems: 'center',
  },
  tempRangeDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#D1D5DB',
    marginHorizontal: Spacing.lg,
  },
  tempRangeLabel: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.xs,
  },
  tempRangeValue: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
  },
  detailsSection: {
    marginVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.md,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.xs,
  },
  sunSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
  sunItem: {
    flex: 1,
    alignItems: 'center',
  },
  sunDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#D1D5DB',
    marginHorizontal: Spacing.lg,
  },
  sunLabel: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.xs,
  },
  sunTime: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
  },
  lastUpdated: {
    textAlign: 'center',
    fontSize: FontSizes.sm,
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  bottomPadding: {
    height: Spacing.xl,
  },
});
