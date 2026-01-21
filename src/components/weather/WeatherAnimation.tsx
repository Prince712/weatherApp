import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getWeatherIconName } from '../../utils/helpers';

interface WeatherAnimationProps {
  condition: string;
  isDay?: boolean;
  size?: number;
  color?: string;
}

/**
 * Weather Animation Component
 * In a production app, this would use Lottie animations
 * For now, we're using animated icons as placeholders
 * 
 * To add Lottie animations:
 * 1. Download free weather animations from https://lottiefiles.com
 * 2. Place JSON files in src/assets/animations/
 * 3. Replace Icon with LottieView component
 */
export const WeatherAnimation: React.FC<WeatherAnimationProps> = ({
  condition,
  isDay = true,
  size = 120,
  color = '#6366F1',
}) => {
  const iconName = getWeatherIconName(condition, isDay);

  return (
    <View style={styles.container}>
      <Icon name={iconName} size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Example of how to integrate Lottie (commented out for reference):
/*
import LottieView from 'lottie-react-native';

export const WeatherAnimation: React.FC<WeatherAnimationProps> = ({
  condition,
  isDay = true,
  size = 120,
}) => {
  const animationSource = getAnimationSource(condition, isDay);

  return (
    <LottieView
      source={animationSource}
      autoPlay
      loop
      style={{ width: size, height: size }}
    />
  );
};

const getAnimationSource = (condition: string, isDay: boolean) => {
  const conditionLower = condition.toLowerCase();
  
  // Map conditions to animation files
  if (conditionLower.includes('clear')) {
    return isDay 
      ? require('../../assets/animations/sunny.json')
      : require('../../assets/animations/clear-night.json');
  }
  if (conditionLower.includes('cloud')) {
    return require('../../assets/animations/cloudy.json');
  }
  if (conditionLower.includes('rain')) {
    return require('../../assets/animations/rainy.json');
  }
  // ... more conditions
  
  return require('../../assets/animations/default.json');
};
*/
