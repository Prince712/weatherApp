import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Colors } from '../../theme/colors';

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 8,
  style,
}) => {
  const colorScheme = useColorScheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor:
            colorScheme === 'dark' ? Colors.dark.border : Colors.light.border,
          opacity,
        },
        style,
      ]}
    />
  );
};

export const WeatherCardSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SkeletonLoader width={200} height={32} />
        <SkeletonLoader width={120} height={24} style={{ marginTop: 8 }} />
      </View>

      <View style={styles.mainTemp}>
        <SkeletonLoader width={150} height={80} />
      </View>

      <View style={styles.details}>
        <SkeletonLoader width="30%" height={60} />
        <SkeletonLoader width="30%" height={60} />
        <SkeletonLoader width="30%" height={60} />
      </View>

      <View style={styles.hourlySection}>
        <SkeletonLoader width={120} height={24} style={{ marginBottom: 12 }} />
        <View style={styles.hourlyItems}>
          {[1, 2, 3, 4, 5].map((i) => (
            <View key={i} style={styles.hourlyItem}>
              <SkeletonLoader width={60} height={80} />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.dailySection}>
        <SkeletonLoader width={150} height={24} style={{ marginBottom: 12 }} />
        {[1, 2, 3, 4, 5].map((i) => (
          <View key={i} style={styles.dailyItem}>
            <SkeletonLoader width="100%" height={60} style={{ marginBottom: 8 }} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  mainTemp: {
    alignItems: 'center',
    marginVertical: 24,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 24,
  },
  hourlySection: {
    marginVertical: 24,
  },
  hourlyItems: {
    flexDirection: 'row',
    gap: 12,
  },
  hourlyItem: {
    width: 80,
  },
  dailySection: {
    marginVertical: 24,
  },
  dailyItem: {
    marginBottom: 8,
  },
});
