import React from 'react';
import { Cloud, Sun, CloudRain, Snowflake, Wind, Thermometer, Droplets, AlertTriangle } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';

const WeatherCard: React.FC = () => {
  const { weather, loading, error } = useWeather();

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse">
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="text-center text-gray-500">
          <AlertTriangle className="h-12 w-12 mx-auto mb-2" />
          <p>Unable to fetch weather data</p>
        </div>
      </div>
    );
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-16 w-16 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-16 w-16 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="h-16 w-16 text-blue-500" />;
      case 'snowy':
        return <Snowflake className="h-16 w-16 text-blue-300" />;
      case 'windy':
        return <Wind className="h-16 w-16 text-gray-600" />;
      default:
        return <Cloud className="h-16 w-16 text-gray-500" />;
    }
  };

  const getBackgroundGradient = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return 'from-yellow-400 to-orange-500';
      case 'cloudy':
        return 'from-gray-400 to-gray-600';
      case 'rainy':
        return 'from-blue-400 to-blue-600';
      case 'snowy':
        return 'from-blue-300 to-blue-500';
      case 'windy':
        return 'from-gray-500 to-gray-700';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden max-w-md">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getBackgroundGradient(weather.condition)} text-white p-6`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-1">{weather.temperature}°C</h3>
            <p className="text-lg opacity-90 capitalize">{weather.description}</p>
          </div>
          {getWeatherIcon(weather.condition)}
        </div>
      </div>

      {/* Details */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="font-semibold">{weather.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Wind Speed</p>
              <p className="font-semibold">{weather.windSpeed} km/h</p>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {weather.alerts && weather.alerts.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Outfit Recommendations
            </h4>
            {weather.alerts.map((alert, index) => (
              <div key={index} className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">{alert}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;