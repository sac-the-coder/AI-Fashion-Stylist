import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WeatherInfo } from '../types';

interface WeatherContextType {
  weather: WeatherInfo | null;
  loading: boolean;
  error: string | null;
  refreshWeather: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

// Mock weather data for demonstration
const mockWeatherData: WeatherInfo = {
  temperature: 18,
  condition: 'cloudy',
  description: 'Partly cloudy with chance of rain',
  humidity: 65,
  windSpeed: 12,
  alerts: ['Rain expected in afternoon - consider bringing an umbrella', 'Temperature may drop to 12°C - add a layer'],
};

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWeather(mockWeatherData);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshWeather();
  }, []);

  const value = {
    weather,
    loading,
    error,
    refreshWeather,
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}