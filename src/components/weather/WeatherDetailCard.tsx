import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights, Shadows } from '../../theme/colors';

interface WeatherDetailCardProps {
  icon: string;
  label: string;
  value: string;
  description?: string;
}

export const WeatherDetailCard: React.FC<WeatherDetailCardProps> = ({
  icon,
  label,
  value,
  description,
}) => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface },
        Shadows.md,
      ]}
    >
      <View style={styles.iconContainer}>
        <Icon name={icon} size={28} color={colors.primary} />
      </View>
      
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        {label}
      </Text>
      
      <Text style={[styles.value, { color: colors.text }]}>
        {value}
      </Text>
      
      {description && (
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {description}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 160,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    margin: Spacing.xs,
  },
  iconContainer: {
    marginBottom: Spacing.sm,
  },
  label: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    marginBottom: Spacing.xs,
  },
  value: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.xs,
  },
  description: {
    fontSize: FontSizes.xs,
    textAlign: 'center',
  },
});
