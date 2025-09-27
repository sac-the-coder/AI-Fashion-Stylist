import React from 'react';
import { X, Shirt } from 'lucide-react';
import { WardrobeItem } from '../../types';

interface OutfitDisplayProps {
  items: WardrobeItem[];
  onRemoveItem: (itemId: string) => void;
}

const OutfitDisplay: React.FC<OutfitDisplayProps> = ({ items, onRemoveItem }) => {
  const categoryOrder = ['outerwear', 'tops', 'dresses', 'bottoms', 'shoes', 'accessories'];
  const sortedItems = items.sort((a, b) => 
    categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
  );

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
        <Shirt className="h-24 w-24 text-gray-300 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Outfit Canvas</h3>
        <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
          Select your style preferences and click "Generate Outfit" to create the perfect look, 
          or manually select items from your wardrobe.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Your Outfit</h3>
          <span className="bg-rose-100 text-rose-700 text-sm font-medium px-3 py-1 rounded-full">
            {items.length} items
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-square relative">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-black bg-opacity-75 text-white text-xs font-medium px-2 py-1 rounded-md capitalize">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">{item.name}</h4>
                <p className="text-sm text-gray-600 mb-2 capitalize">
                  {item.color} • {item.formality.replace('-', ' ')}
                </p>
                
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="inline-flex items-center px-2 py-1 bg-rose-50 text-rose-700 text-xs font-medium rounded-md">
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 2 && (
                      <span className="text-xs text-gray-500">+{item.tags.length - 2}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Outfit Summary */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {categoryOrder.filter(cat => items.some(item => item.category === cat)).map(category => {
              const item = items.find(item => item.category === category);
              return (
                <span key={category} className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full capitalize">
                  {category}: {item?.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitDisplay;