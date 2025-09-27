import React, { useState, useRef } from 'react';
import { Camera, Upload, Shuffle, Download, Share2 } from 'lucide-react';
import { useWardrobe } from '../../context/WardrobeContext';
import { WardrobeItem } from '../../types';

const TryOnPage: React.FC = () => {
  const { wardrobeItems } = useWardrobe();
  const [selectedItems, setSelectedItems] = useState<WardrobeItem[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('tops');

  const categories = [
    { id: 'tops', label: 'Tops' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'dresses', label: 'Dresses' },
    { id: 'outerwear', label: 'Outerwear' },
    { id: 'shoes', label: 'Shoes' },
    { id: 'accessories', label: 'Accessories' },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addItemToOutfit = (item: WardrobeItem) => {
    // Remove any existing item from the same category
    const filteredItems = selectedItems.filter(existingItem => existingItem.category !== item.category);
    setSelectedItems([...filteredItems, item]);
  };

  const removeItemFromOutfit = (itemId: string) => {
    setSelectedItems(selectedItems.filter(item => item.id !== itemId));
  };

  const generateRandomOutfit = () => {
    const randomItems: WardrobeItem[] = [];
    categories.forEach(category => {
      const categoryItems = wardrobeItems.filter(item => item.category === category.id);
      if (categoryItems.length > 0 && Math.random() > 0.4) { // 60% chance to include each category
        const randomItem = categoryItems[Math.floor(Math.random() * categoryItems.length)];
        randomItems.push(randomItem);
      }
    });
    setSelectedItems(randomItems);
  };

  const filteredItems = wardrobeItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Virtual Try-On</h1>
          <p className="text-gray-600">Mix and match your wardrobe items to create the perfect look</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Item Selection Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Category Selector */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Category</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                      activeCategory === category.id
                        ? 'bg-rose-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Items Grid */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {categories.find(c => c.id === activeCategory)?.label}
                </h3>
                <span className="text-sm text-gray-500">
                  {filteredItems.length} items
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative group cursor-pointer"
                    onClick={() => addItemToOutfit(item)}
                  >
                    <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 group-hover:border-rose-300 transition-all duration-200">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                      <div className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Add
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <button
                onClick={generateRandomOutfit}
                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                <Shuffle className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                Random Outfit
              </button>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-rose-300 hover:text-rose-700 transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                <Upload className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Upload Background
              </button>
            </div>
          </div>

          {/* Try-On Display */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Virtual Outfit</h3>
                <div className="flex gap-3">
                  <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all duration-200">
                    <Download className="h-4 w-4 mr-2" />
                    Save
                  </button>
                  <button className="flex items-center px-4 py-2 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition-all duration-200">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </button>
                </div>
              </div>

              {/* Try-On Canvas */}
              <div className="relative bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl overflow-hidden" style={{ aspectRatio: '3/4', minHeight: '600px' }}>
                {backgroundImage && (
                  <img
                    src={backgroundImage}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                
                {/* Outfit Items Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  {selectedItems.length === 0 ? (
                    <div className="text-center text-gray-500">
                      <Camera className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium mb-2">Start Building Your Outfit</p>
                      <p className="text-sm">Select items from the categories to see them here</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                      {selectedItems.map((item, index) => (
                        <div
                          key={item.id}
                          className="relative group"
                          style={{
                            gridColumn: item.category === 'dresses' ? '1 / -1' : 'auto',
                          }}
                        >
                          <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-lg border-2 border-white">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            onClick={() => removeItemFromOutfit(item.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                          >
                            ×
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {item.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Items Summary */}
              {selectedItems.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-medium text-gray-900 mb-2">Current Outfit:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItems.map((item) => (
                      <span
                        key={item.id}
                        className="inline-flex items-center px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200"
                      >
                        {item.name}
                        <button
                          onClick={() => removeItemFromOutfit(item.id)}
                          className="ml-2 text-red-500 hover:text-red-700 transition-colors duration-200"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default TryOnPage;