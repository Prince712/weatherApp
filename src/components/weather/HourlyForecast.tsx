import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HourlyForecast as HourlyForecastType } from '../../types/weather.types';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights, Shadows } from '../../theme/colors';
import { formatTemp, formatDate, getWeatherIconName } from '../../utils/helpers';

interface HourlyForecastProps {
  data: HourlyForecastType[];
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ data }) => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  // Get next 24 hours (8 items * 3 hours each)
  const hourlyData = data.slice(0, 8);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>
        Hourly Forecast
      </Text>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {hourlyData.map((item, index) => {
          const isDay = item.sys.pod === 'd';
          const iconName = getWeatherIconName(item.weather[0].main, isDay);

          return (
            <View
              key={item.dt}
              style={[
                styles.hourItem,
                { backgroundColor: colors.surface },
                Shadows.sm,
              ]}
            >
              <Text style={[styles.time, { color: colors.textSecondary }]}>
                {index === 0 ? 'Now' : formatDate(item.dt, 'time')}
              </Text>
              
              <Icon
                name={iconName}
                size={32}
                color={colors.primary}
                style={styles.icon}
              />
              
              <Text style={[styles.temp, { color: colors.text }]}>
                {formatTemp(item.main.temp)}
              </Text>
              
              <View style={styles.popContainer}>
                <Icon name="water" size={12} color={colors.info} />
                <Text style={[styles.pop, { color: colors.textSecondary }]}>
                  {Math.round(item.pop * 100)}%
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.md,
  },
  title: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  hourItem: {
    width: 80,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  time: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    marginBottom: Spacing.sm,
  },
  icon: {
    marginVertical: Spacing.sm,
  },
  temp: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.xs,
  },
  popContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pop: {
    fontSize: FontSizes.xs,
  },
});
