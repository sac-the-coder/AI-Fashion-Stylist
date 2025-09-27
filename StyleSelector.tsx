import React from 'react';
import { Heart, Briefcase, Coffee, Sparkles, Zap, Smile } from 'lucide-react';
import { StylePreferences } from '../../types';

interface StyleSelectorProps {
  preferences: StylePreferences;
  onChange: (preferences: StylePreferences) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ preferences, onChange }) => {
  const moods = [
    { id: 'comfortable', label: 'Comfortable', icon: Coffee, color: 'from-amber-500 to-yellow-500' },
    { id: 'confident', label: 'Confident', icon: Zap, color: 'from-red-500 to-pink-500' },
    { id: 'romantic', label: 'Romantic', icon: Heart, color: 'from-pink-500 to-rose-500' },
    { id: 'edgy', label: 'Edgy', icon: Sparkles, color: 'from-purple-500 to-indigo-500' },
    { id: 'professional', label: 'Professional', icon: Briefcase, color: 'from-blue-500 to-cyan-500' },
    { id: 'playful', label: 'Playful', icon: Smile, color: 'from-green-500 to-emerald-500' },
  ];

  const occasions = [
    { id: 'work', label: 'Work', description: 'Professional settings' },
    { id: 'casual', label: 'Casual', description: 'Everyday activities' },
    { id: 'date', label: 'Date Night', description: 'Romantic occasions' },
    { id: 'party', label: 'Party', description: 'Social events' },
    { id: 'formal', label: 'Formal', description: 'Special events' },
    { id: 'workout', label: 'Workout', description: 'Exercise & fitness' },
    { id: 'travel', label: 'Travel', description: 'Comfortable for trips' },
  ];

  const colorPreferences = [
    { id: 'warm', label: 'Warm', description: 'Reds, oranges, yellows' },
    { id: 'cool', label: 'Cool', description: 'Blues, greens, purples' },
    { id: 'neutral', label: 'Neutral', description: 'Blacks, whites, grays' },
    { id: 'bright', label: 'Bright', description: 'Vibrant, bold colors' },
    { id: 'muted', label: 'Muted', description: 'Soft, subdued tones' },
  ];

  const updatePreference = (key: keyof StylePreferences, value: any) => {
    onChange({
      ...preferences,
      [key]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Style Preferences</h3>

        {/* Mood Selection */}
        <div className="mb-8">
          <h4 className="font-semibold text-gray-900 mb-4">What's your mood?</h4>
          <div className="grid grid-cols-2 gap-3">
            {moods.map(mood => {
              const Icon = mood.icon;
              const isSelected = preferences.mood === mood.id;
              
              return (
                <button
                  key={mood.id}
                  onClick={() => updatePreference('mood', mood.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-rose-300 bg-rose-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${mood.color} rounded-xl flex items-center justify-center mb-3 mx-auto ${
                    isSelected ? 'scale-110' : ''
                  } transition-transform duration-200`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <p className={`font-medium text-sm ${
                    isSelected ? 'text-rose-700' : 'text-gray-700'
                  }`}>
                    {mood.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Occasion Selection */}
        <div className="mb-8">
          <h4 className="font-semibold text-gray-900 mb-4">Occasion</h4>
          <div className="space-y-2">
            {occasions.map(occasion => (
              <label
                key={occasion.id}
                className={`flex items-center p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                  preferences.occasion === occasion.id
                    ? 'border-rose-300 bg-rose-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="occasion"
                  value={occasion.id}
                  checked={preferences.occasion === occasion.id}
                  onChange={(e) => updatePreference('occasion', e.target.value)}
                  className="w-4 h-4 text-rose-600 border-gray-300 focus:ring-rose-500"
                />
                <div className="ml-3">
                  <p className="font-medium text-gray-900">{occasion.label}</p>
                  <p className="text-sm text-gray-600">{occasion.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Color Preference */}
        <div className="mb-8">
          <h4 className="font-semibold text-gray-900 mb-4">Color Preference</h4>
          <div className="space-y-2">
            {colorPreferences.map(color => (
              <label
                key={color.id}
                className={`flex items-center p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                  preferences.colorPreference === color.id
                    ? 'border-rose-300 bg-rose-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="colorPreference"
                  value={color.id}
                  checked={preferences.colorPreference === color.id}
                  onChange={(e) => updatePreference('colorPreference', e.target.value)}
                  className="w-4 h-4 text-rose-600 border-gray-300 focus:ring-rose-500"
                />
                <div className="ml-3">
                  <p className="font-medium text-gray-900">{color.label}</p>
                  <p className="text-sm text-gray-600">{color.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Comfort Level */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">
            Comfort Priority: {preferences.comfortLevel}/5
          </h4>
          <input
            type="range"
            min="1"
            max="5"
            value={preferences.comfortLevel}
            onChange={(e) => updatePreference('comfortLevel', parseInt(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Style First</span>
            <span>Comfort First</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleSelector;