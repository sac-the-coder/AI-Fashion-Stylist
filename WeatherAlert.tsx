import React from 'react';
import { AlertTriangle, Cloud, Umbrella, Thermometer } from 'lucide-react';
import { WeatherInfo } from '../../types';

interface WeatherAlertProps {
  weather: WeatherInfo;
}

const WeatherAlert: React.FC<WeatherAlertProps> = ({ weather }) => {
  const getTemperatureAdvice = (temp: number) => {
    if (temp < 5) return { message: "Very cold - layer up with warm outerwear", icon: Thermometer, color: 'blue' };
    if (temp < 15) return { message: "Cool weather - add a jacket or sweater", icon: Thermometer, color: 'blue' };
    if (temp < 25) return { message: "Mild temperature - perfect for layers", icon: Thermometer, color: 'green' };
    if (temp < 30) return { message: "Warm weather - light clothing recommended", icon: Thermometer, color: 'yellow' };
    return { message: "Hot weather - choose breathable fabrics", icon: Thermometer, color: 'red' };
  };

  const getWeatherAdvice = (condition: string) => {
    switch (condition) {
      case 'rainy':
        return { message: "Rain expected - don't forget an umbrella!", icon: Umbrella, color: 'blue' };
      case 'snowy':
        return { message: "Snow expected - wear waterproof shoes", icon: Cloud, color: 'blue' };
      case 'windy':
        return { message: "Windy conditions - avoid loose clothing", icon: Cloud, color: 'gray' };
      default:
        return null;
    }
  };

  const tempAdvice = getTemperatureAdvice(weather.temperature);
  const weatherAdvice = getWeatherAdvice(weather.condition);

  const alerts = [
    ...(tempAdvice ? [tempAdvice] : []),
    ...(weatherAdvice ? [weatherAdvice] : []),
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'green':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'yellow':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'red':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'gray':
        return 'bg-gray-50 border-gray-200 text-gray-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Cloud className="h-5 w-5 text-gray-600" />
        <h4 className="font-semibold text-gray-900">Weather Alerts</h4>
      </div>

      <div className="space-y-3">
        {/* Custom alerts from weather context */}
        {weather.alerts && weather.alerts.map((alert, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-amber-800 leading-relaxed">{alert}</p>
          </div>
        ))}

        {/* Generated alerts based on conditions */}
        {alerts.map((alert, index) => {
          const Icon = alert.icon;
          return (
            <div key={`generated-${index}`} className={`flex items-start gap-3 p-3 rounded-lg border ${getColorClasses(alert.color)}`}>
              <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                alert.color === 'blue' ? 'text-blue-600' :
                alert.color === 'green' ? 'text-green-600' :
                alert.color === 'yellow' ? 'text-yellow-600' :
                alert.color === 'red' ? 'text-red-600' :
                'text-gray-600'
              }`} />
              <p className="text-sm leading-relaxed">{alert.message}</p>
            </div>
          );
        })}
      </div>

      {/* Current Conditions Summary */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Current conditions:</span>
          <span className="font-medium text-gray-900 capitalize">
            {weather.temperature}°C, {weather.description}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherAlert;