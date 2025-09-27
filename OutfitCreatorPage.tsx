import React, { useState } from 'react';
import { Shuffle, Save, Share2, Star } from 'lucide-react';
import { useWardrobe } from '../../context/WardrobeContext';
import { useWeather } from '../../context/WeatherContext';
import { WardrobeItem, StylePreferences, Outfit } from '../../types';
import StyleSelector from '../features/StyleSelector';
import OutfitDisplay from '../features/OutfitDisplay';
import CompatibilityScore from '../features/CompatibilityScore';
import WeatherAlert from '../features/WeatherAlert';

const OutfitCreatorPage: React.FC = () => {
  const { wardrobeItems, addOutfit } = useWardrobe();
  const { weather } = useWeather();
  const [selectedItems, setSelectedItems] = useState<WardrobeItem[]>([]);
  const [stylePrefs, setStylePrefs] = useState<StylePreferences>({
    mood: 'comfortable',
    occasion: 'casual',
    colorPreference: 'neutral',
    comfortLevel: 3,
  });
  const [outfitName, setOutfitName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);

  const generateOutfit = () => {
    // Smart outfit generation based on preferences and weather
    const availableItems = wardrobeItems.filter(item => {
      // Filter by formality
      const formalityMatch = (stylePrefs.occasion === 'formal' && item.formality === 'formal') ||
                           (stylePrefs.occasion === 'work' && ['smart-casual', 'formal'].includes(item.formality)) ||
                           (['casual', 'workout'].includes(stylePrefs.occasion) && ['casual', 'smart-casual'].includes(item.formality));
      
      // Filter by weather appropriateness
      const weatherMatch = !weather || 
                          (weather.temperature > 20 && item.seasonality.includes('summer')) ||
                          (weather.temperature <= 20 && weather.temperature > 10 && ['spring', 'fall'].includes(item.seasonality[0])) ||
                          (weather.temperature <= 10 && item.seasonality.includes('winter'));

      return formalityMatch && weatherMatch;
    });

    // Simple outfit selection logic
    const tops = availableItems.filter(item => item.category === 'tops');
    const bottoms = availableItems.filter(item => item.category === 'bottoms');
    const shoes = availableItems.filter(item => item.category === 'shoes');
    const outerwear = availableItems.filter(item => item.category === 'outerwear');

    const newOutfit: WardrobeItem[] = [];
    
    if (tops.length > 0) newOutfit.push(tops[Math.floor(Math.random() * tops.length)]);
    if (bottoms.length > 0) newOutfit.push(bottoms[Math.floor(Math.random() * bottoms.length)]);
    if (shoes.length > 0) newOutfit.push(shoes[Math.floor(Math.random() * shoes.length)]);
    
    // Add outerwear based on weather
    if (weather && (weather.temperature < 15 || weather.condition === 'rainy') && outerwear.length > 0) {
      newOutfit.push(outerwear[Math.floor(Math.random() * outerwear.length)]);
    }

    setSelectedItems(newOutfit);
  };

  const calculateCompatibility = () => {
    if (selectedItems.length < 2) return null;

    // Simple compatibility scoring
    const colors = selectedItems.map(item => item.color);
    const formalities = selectedItems.map(item => item.formality);
    
    const colorHarmony = colors.every(color => color === colors[0]) ? 100 : 
                        colors.includes('black') || colors.includes('white') || colors.includes('gray') ? 85 : 70;
    
    const formalityMatch = formalities.every(f => f === formalities[0]) ? 100 : 
                          formalities.every(f => ['casual', 'smart-casual'].includes(f)) ? 80 : 60;

    const overallScore = Math.round((colorHarmony + formalityMatch) / 2);

    return {
      colorHarmony,
      formalityMatch,
      seasonalMatch: 85,
      overallScore,
      feedback: [
        overallScore > 80 ? 'Great color coordination!' : 'Consider adjusting color balance',
        formalityMatch > 80 ? 'Perfect formality match' : 'Mixed formality levels detected',
      ],
    };
  };

  const saveOutfit = () => {
    if (selectedItems.length === 0 || !outfitName.trim()) return;

    const compatibility = calculateCompatibility();
    
    const newOutfit: Outfit = {
      id: Date.now().toString(),
      name: outfitName,
      items: selectedItems,
      occasion: stylePrefs.occasion,
      mood: stylePrefs.mood,
      weather: weather || undefined,
      score: compatibility?.overallScore || 0,
      compatibility: compatibility || {
        colorHarmony: 0,
        formalityMatch: 0,
        seasonalMatch: 0,
        overallScore: 0,
        feedback: [],
      },
      createdAt: new Date(),
    };

    addOutfit(newOutfit);
    setShowSaveModal(false);
    setOutfitName('');
  };

  const compatibility = calculateCompatibility();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Outfit</h1>
          <p className="text-gray-600">Design the perfect look for any occasion</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Style Preferences */}
          <div className="lg:col-span-1">
            <StyleSelector
              preferences={stylePrefs}
              onChange={setStylePrefs}
            />
            
            {/* Weather Alert */}
            {weather && (
              <div className="mt-6">
                <WeatherAlert weather={weather} />
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <button
                onClick={generateOutfit}
                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                <Shuffle className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                Generate Outfit
              </button>
              
              {selectedItems.length > 0 && (
                <>
                  <button
                    onClick={() => setShowSaveModal(true)}
                    className="w-full flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-rose-300 hover:text-rose-700 transition-all duration-200 shadow-lg hover:shadow-xl group"
                  >
                    <Save className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                    Save Outfit
                  </button>
                  
                  <button className="w-full flex items-center justify-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl group">
                    <Share2 className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                    Share Outfit
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Outfit Display */}
          <div className="lg:col-span-2">
            <OutfitDisplay
              items={selectedItems}
              onRemoveItem={(itemId) => 
                setSelectedItems(items => items.filter(item => item.id !== itemId))
              }
            />

            {/* Compatibility Score */}
            {compatibility && (
              <div className="mt-6">
                <CompatibilityScore compatibility={compatibility} />
              </div>
            )}
          </div>
        </div>

        {/* Save Modal */}
        {showSaveModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Save Outfit</h3>
              <input
                type="text"
                placeholder="Enter outfit name..."
                value={outfitName}
                onChange={(e) => setOutfitName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent mb-6"
              />
              <div className="flex gap-3">
                <button
                  onClick={saveOutfit}
                  disabled={!outfitName.trim()}
                  className="flex-1 px-6 py-3 bg-rose-600 text-white font-semibold rounded-xl hover:bg-rose-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutfitCreatorPage;