import React, { useState } from 'react';
import { X, Upload, Camera } from 'lucide-react';
import { useWardrobe } from '../../context/WardrobeContext';
import { WardrobeItem } from '../../types';

interface AddItemModalProps {
  onClose: () => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ onClose }) => {
  const { addWardrobeItem } = useWardrobe();
  const [formData, setFormData] = useState({
    name: '',
    category: 'tops' as const,
    subcategory: '',
    color: '',
    pattern: '',
    material: '',
    brand: '',
    tags: '',
    seasonality: [] as string[],
    formality: 'casual' as const,
    comfort: 3,
  });
  const [imageUrl, setImageUrl] = useState('');

  const categories = [
    { value: 'tops', label: 'Tops' },
    { value: 'bottoms', label: 'Bottoms' },
    { value: 'dresses', label: 'Dresses' },
    { value: 'outerwear', label: 'Outerwear' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'accessories', label: 'Accessories' },
  ];

  const formalityOptions = [
    { value: 'casual', label: 'Casual' },
    { value: 'smart-casual', label: 'Smart Casual' },
    { value: 'formal', label: 'Formal' },
    { value: 'party', label: 'Party' },
  ];

  const seasons = ['spring', 'summer', 'fall', 'winter'];

  const handleSeasonToggle = (season: string) => {
    setFormData(prev => ({
      ...prev,
      seasonality: prev.seasonality.includes(season)
        ? prev.seasonality.filter(s => s !== season)
        : [...prev.seasonality, season]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem: WardrobeItem = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      subcategory: formData.subcategory,
      color: formData.color,
      pattern: formData.pattern || undefined,
      material: formData.material || undefined,
      brand: formData.brand || undefined,
      imageUrl: imageUrl || 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300',
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      seasonality: formData.seasonality as ('spring' | 'summer' | 'fall' | 'winter')[],
      formality: formData.formality,
      comfort: formData.comfort,
      createdAt: new Date(),
    };

    addWardrobeItem(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Add New Item</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Item Photo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-rose-400 transition-colors duration-200">
              {imageUrl ? (
                <div className="relative">
                  <img src={imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded-lg mx-auto mb-4" />
                  <button
                    type="button"
                    onClick={() => setImageUrl('')}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Upload a photo or enter URL</p>
                  <input
                    type="url"
                    placeholder="Enter image URL..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Item Name*</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="e.g., White Cotton Shirt"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category*</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color*</label>
              <input
                type="text"
                required
                value={formData.color}
                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="e.g., White, Navy Blue"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="e.g., Zara, H&M"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="e.g., Cotton, Polyester"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Formality*</label>
              <select
                required
                value={formData.formality}
                onChange={(e) => setFormData(prev => ({ ...prev, formality: e.target.value as any }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                {formalityOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Seasonality */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Seasonality*</label>
            <div className="flex flex-wrap gap-3">
              {seasons.map(season => (
                <label key={season} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.seasonality.includes(season)}
                    onChange={() => handleSeasonToggle(season)}
                    className="w-4 h-4 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">{season}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Comfort Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Comfort Level: {formData.comfort}/5
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={formData.comfort}
              onChange={(e) => setFormData(prev => ({ ...prev, comfort: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Uncomfortable</span>
              <span>Very Comfortable</span>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              placeholder="e.g., casual, work, summer (comma-separated)"
            />
            <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Add to Wardrobe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;