export const Colors = {
  // Light mode colors
  light: {
    primary: '#6366F1',
    secondary: '#8B5CF6',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    
    // Weather condition colors
    clear: '#FCD34D',
    clouds: '#9CA3AF',
    rain: '#60A5FA',
    snow: '#E0F2FE',
    thunderstorm: '#7C3AED',
    mist: '#D1D5DB',
  },
  
  // Dark mode colors
  dark: {
    primary: '#818CF8',
    secondary: '#A78BFA',
    background: '#111827',
    surface: '#1F2937',
    text: '#F9FAFB',
    textSecondary: '#9CA3AF',
    border: '#374151',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    info: '#60A5FA',
    
    // Weather condition colors
    clear: '#FCD34D',
    clouds: '#6B7280',
    rain: '#3B82F6',
    snow: '#DBEAFE',
    thunderstorm: '#8B5CF6',
    mist: '#9CA3AF',
  },
};

// Weather-based background gradients
export const WeatherGradients = {
  light: {
    Clear: ['#FEF3C7', '#FCD34D', '#F59E0B'],
    Clouds: ['#E5E7EB', '#D1D5DB', '#9CA3AF'],
    Rain: ['#DBEAFE', '#93C5FD', '#60A5FA'],
    Drizzle: ['#E0F2FE', '#BAE6FD', '#7DD3FC'],
    Thunderstorm: ['#DDD6FE', '#C4B5FD', '#A78BFA'],
    Snow: ['#F0F9FF', '#E0F2FE', '#BAE6FD'],
    Mist: ['#F3F4F6', '#E5E7EB', '#D1D5DB'],
    default: ['#DBEAFE', '#BFDBFE', '#93C5FD'],
  },
  dark: {
    Clear: ['#1E293B', '#334155', '#475569'],
    Clouds: ['#0F172A', '#1E293B', '#334155'],
    Rain: ['#1E3A8A', '#1E40AF', '#2563EB'],
    Drizzle: ['#164E63', '#155E75', '#0E7490'],
    Thunderstorm: ['#4C1D95', '#5B21B6', '#6D28D9'],
    Snow: ['#0C4A6E', '#075985', '#0369A1'],
    Mist: ['#18181B', '#27272A', '#3F3F46'],
    default: ['#0F172A', '#1E293B', '#334155'],
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const FontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
};

export const FontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
};
