import React from 'react';
import { Calendar, Star, Share2, CreditCard as Edit } from 'lucide-react';
import { Outfit } from '../../types';

interface OutfitCardProps {
  outfit: Outfit;
}

const OutfitCard: React.FC<OutfitCardProps> = ({ outfit }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 75) return 'text-blue-600 bg-blue-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
      {/* Image Grid */}
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <div className="grid grid-cols-2 gap-1 p-2 h-full">
          {outfit.items.slice(0, 4).map((item, index) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {outfit.items.length > 4 && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs font-medium px-2 py-1 rounded-md">
              +{outfit.items.length - 4} more
            </div>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="p-2 bg-white rounded-full shadow-lg text-gray-600 hover:text-blue-600 transition-colors duration-200">
            <Edit className="h-4 w-4" />
          </button>
          <button className="p-2 bg-white rounded-full shadow-lg text-gray-600 hover:text-green-600 transition-colors duration-200">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{outfit.name}</h3>
            <p className="text-sm text-gray-600 capitalize">
              {outfit.mood} • {outfit.occasion}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-gray-900">{outfit.score}</span>
          </div>
        </div>

        {/* Compatibility Score */}
        <div className="mb-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(outfit.score)}`}>
            {outfit.score >= 90 ? 'Excellent' : 
             outfit.score >= 75 ? 'Good' : 
             outfit.score >= 60 ? 'Fair' : 'Needs Work'} Match
          </span>
        </div>

        {/* Items Summary */}
        <div className="text-xs text-gray-500 mb-3">
          {outfit.items.length} items: {outfit.items.map(item => item.category).join(', ')}
        </div>

        {/* Weather Info */}
        {outfit.weather && (
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
            <span>🌤️ {outfit.weather.temperature}°C</span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            {outfit.createdAt.toLocaleDateString()}
          </div>
          
          {outfit.scheduledDate && (
            <div className="flex items-center gap-1 text-xs text-rose-600">
              <Calendar className="h-3 w-3" />
              Scheduled
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutfitCard;