import Geolocation from '@react-native-community/geolocation';
import { Platform, PermissionsAndroid } from 'react-native';
import { LocationData } from '../types/weather.types';

export class LocationService {
  /**
   * Request location permissions
   */
  static async requestLocationPermission(): Promise<boolean> {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to show local weather.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Location permission error:', err);
        return false;
      }
    }
    // iOS permissions are handled in Info.plist
    return true;
  }

  /**
   * Get current device location
   */
  static async getCurrentLocation(): Promise<LocationData> {
    return new Promise(async (resolve, reject) => {
      const hasPermission = await this.requestLocationPermission();

      if (!hasPermission) {
        reject(new Error('Location permission denied'));
        return;
      }

      Geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          reject(new Error(`Unable to get location: ${error.message}`));
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    });
  }

  /**
   * Watch location changes
   */
  static watchLocation(
    onSuccess: (location: LocationData) => void,
    onError: (error: Error) => void
  ): number {
    return Geolocation.watchPosition(
      (position) => {
        onSuccess({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        onError(new Error(`Location error: ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 100, // Update every 100 meters
        interval: 10000, // Update every 10 seconds
        fastestInterval: 5000,
      }
    );
  }

  /**
   * Clear location watch
   */
  static clearWatch(watchId: number): void {
    Geolocation.clearWatch(watchId);
  }

  /**
   * Get city name from coordinates using reverse geocoding
   * Note: OpenWeatherMap's reverse geocoding is part of their API
   */
  static async getCityFromCoords(
    lat: number,
    lon: number
  ): Promise<{ city: string; country: string }> {
    try {
      // This would typically use a reverse geocoding service
      // For now, we'll get the city name from the weather API response
      return {
        city: 'Unknown',
        country: 'Unknown',
      };
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return {
        city: 'Unknown',
        country: 'Unknown',
      };
    }
  }
}
