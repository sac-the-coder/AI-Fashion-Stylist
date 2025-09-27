import React from 'react';
import { CreditCard as Edit, Trash2, Tag, Calendar } from 'lucide-react';
import { WardrobeItem } from '../../types';
import { useWardrobe } from '../../context/WardrobeContext';

interface WardrobeGridProps {
  items: WardrobeItem[];
  viewMode: 'grid' | 'list';
}

const WardrobeGrid: React.FC<WardrobeGridProps> = ({ items, viewMode }) => {
  const { removeWardrobeItem } = useWardrobe();

  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="text-6xl mb-4">👗</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
        <p className="text-gray-600">Add some items to your wardrobe to get started</p>
      </div>
    );
  }

  const formatFormality = (formality: string) => {
    return formality.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {items.map((item) => (
            <div key={item.id} className="p-6 hover:bg-gray-50 transition-all duration-200">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2 capitalize">
                        {item.category} • {item.color} • {formatFormality(item.formality)}
                      </p>
                      
                      {item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {item.tags.map((tag) => (
                            <span key={tag} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {item.seasonality.join(', ')}
                        </span>
                        {item.brand && <span>Brand: {item.brand}</span>}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => removeWardrobeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="aspect-square bg-gray-100 overflow-hidden relative">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button className="p-2 bg-white rounded-full shadow-lg text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <Edit className="h-4 w-4" />
              </button>
              <button 
                onClick={() => removeWardrobeItem(item.id)}
                className="p-2 bg-white rounded-full shadow-lg text-gray-600 hover:text-red-600 transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{item.name}</h3>
            <p className="text-sm text-gray-600 mb-3 capitalize">
              {item.category} • {item.color}
            </p>
            
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <span className="bg-gray-100 px-2 py-1 rounded-md capitalize">
                {formatFormality(item.formality)}
              </span>
              <span>{item.seasonality.join(', ')}</span>
            </div>
            
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="inline-flex items-center px-2 py-1 bg-rose-50 text-rose-700 text-xs font-medium rounded-md">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
                {item.tags.length > 2 && (
                  <span className="text-xs text-gray-500">+{item.tags.length - 2} more</span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WardrobeGrid;