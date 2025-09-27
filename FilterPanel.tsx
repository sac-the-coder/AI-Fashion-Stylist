import React, { useState } from 'react';
import { Sliders, X } from 'lucide-react';

const FilterPanel: React.FC = () => {
  const [filters, setFilters] = useState({
    colors: [] as string[],
    formality: [] as string[],
    seasonality: [] as string[],
    brands: [] as string[],
    comfort: [1, 5] as [number, number],
  });

  const colorOptions = ['Black', 'White', 'Gray', 'Blue', 'Red', 'Green', 'Brown', 'Pink', 'Yellow', 'Purple'];
  const formalityOptions = ['Casual', 'Smart Casual', 'Formal', 'Party'];
  const seasonOptions = ['Spring', 'Summer', 'Fall', 'Winter'];
  const brandOptions = ['Zara', 'H&M', 'Nike', 'Adidas', 'Levi\'s', 'J.Crew', 'Uniqlo'];

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category as keyof Pick<typeof filters, 'colors' | 'formality' | 'seasonality' | 'brands'>].includes(value)
        ? (prev[category as keyof Pick<typeof filters, 'colors' | 'formality' | 'seasonality' | 'brands'>] as string[]).filter(item => item !== value)
        : [...(prev[category as keyof Pick<typeof filters, 'colors' | 'formality' | 'seasonality' | 'brands'>] as string[]), value]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      colors: [],
      formality: [],
      seasonality: [],
      brands: [],
      comfort: [1, 5],
    });
  };

  const activeFilterCount = 
    filters.colors.length + 
    filters.formality.length + 
    filters.seasonality.length + 
    filters.brands.length;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sliders className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="bg-rose-100 text-rose-700 text-xs font-medium px-2 py-1 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Colors */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Colors</h4>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map(color => (
              <button
                key={color}
                onClick={() => toggleFilter('colors', color)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  filters.colors.includes(color)
                    ? 'bg-rose-100 text-rose-700 border-rose-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } border`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Formality */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Formality</h4>
          <div className="space-y-2">
            {formalityOptions.map(option => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.formality.includes(option)}
                  onChange={() => toggleFilter('formality', option)}
                  className="w-4 h-4 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Seasonality */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Season</h4>
          <div className="space-y-2">
            {seasonOptions.map(season => (
              <label key={season} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.seasonality.includes(season)}
                  onChange={() => toggleFilter('seasonality', season)}
                  className="w-4 h-4 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                />
                <span className="ml-2 text-sm text-gray-700">{season}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Brands</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {brandOptions.map(brand => (
              <label key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => toggleFilter('brands', brand)}
                  className="w-4 h-4 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                />
                <span className="ml-2 text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Comfort Level */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <h4 className="font-medium text-gray-900 mb-3">
          Comfort Level: {filters.comfort[0]} - {filters.comfort[1]}
        </h4>
        <div className="px-2">
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={filters.comfort[1]}
            onChange={(e) => setFilters(prev => ({ 
              ...prev, 
              comfort: [prev.comfort[0], parseInt(e.target.value)] as [number, number]
            }))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 (Uncomfortable)</span>
            <span>5 (Very Comfortable)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;