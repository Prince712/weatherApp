import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights, Shadows } from '../../theme/colors';
import { formatTemp, getDayName, getWeatherIconName } from '../../utils/helpers';

interface DailyForecastItem {
  dt: number;
  temp_min: number;
  temp_max: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  humidity: number;
  pop: number;
}

interface DailyForecastProps {
  data: DailyForecastItem[];
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ data }) => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>
        7-Day Forecast
      </Text>
      
      {data.map((item, index) => {
        const iconName = getWeatherIconName(item.weather.main, true);
        
        return (
          <View
            key={item.dt}
            style={[
              styles.dayItem,
              { backgroundColor: colors.surface },
              Shadows.sm,
            ]}
          >
            <Text style={[styles.dayName, { color: colors.text }]}>
              {getDayName(item.dt)}
            </Text>
            
            <View style={styles.weatherInfo}>
              <Icon name={iconName} size={28} color={colors.primary} />
              <Text
                style={[styles.description, { color: colors.textSecondary }]}
                numberOfLines={1}
              >
                {item.weather.description}
              </Text>
            </View>
            
            <View style={styles.tempRange}>
              <Text style={[styles.tempMax, { color: colors.text }]}>
                {formatTemp(item.temp_max)}
              </Text>
              <Text style={[styles.tempMin, { color: colors.textSecondary }]}>
                {formatTemp(item.temp_min)}
              </Text>
            </View>
            
            <View style={styles.details}>
              <View style={styles.detailItem}>
                <Icon name="water" size={14} color={colors.info} />
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                  {Math.round(item.pop * 100)}%
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Icon name="water-outline" size={14} color={colors.secondary} />
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                  {item.humidity}%
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  title: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.md,
  },
  dayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  dayName: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.semibold,
    width: 100,
  },
  weatherInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  description: {
    fontSize: FontSizes.sm,
    textTransform: 'capitalize',
    flex: 1,
  },
  tempRange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginRight: Spacing.md,
  },
  tempMax: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  tempMin: {
    fontSize: FontSizes.base,
  },
  details: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: FontSizes.xs,
  },
});
