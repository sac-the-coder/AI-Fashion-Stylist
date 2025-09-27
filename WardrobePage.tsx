import React, { useState } from 'react';
import { Plus, Search, Filter, Grid3x3 as Grid3X3, List } from 'lucide-react';
import { useWardrobe } from '../../context/WardrobeContext';
import WardrobeGrid from '../features/WardrobeGrid';
import AddItemModal from '../features/AddItemModal';
import FilterPanel from '../features/FilterPanel';

const WardrobePage: React.FC = () => {
  const { wardrobeItems } = useWardrobe();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Items', count: wardrobeItems.length },
    { id: 'tops', label: 'Tops', count: wardrobeItems.filter(item => item.category === 'tops').length },
    { id: 'bottoms', label: 'Bottoms', count: wardrobeItems.filter(item => item.category === 'bottoms').length },
    { id: 'dresses', label: 'Dresses', count: wardrobeItems.filter(item => item.category === 'dresses').length },
    { id: 'outerwear', label: 'Outerwear', count: wardrobeItems.filter(item => item.category === 'outerwear').length },
    { id: 'shoes', label: 'Shoes', count: wardrobeItems.filter(item => item.category === 'shoes').length },
    { id: 'accessories', label: 'Accessories', count: wardrobeItems.filter(item => item.category === 'accessories').length },
  ];

  const filteredItems = wardrobeItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wardrobe</h1>
              <p className="text-gray-600">Manage and organize your fashion collection</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl group"
            >
              <Plus className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Add Item
            </button>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search items by name or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                  showFilters
                    ? 'bg-rose-100 text-rose-700 border-rose-200'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                } border`}
              >
                <Filter className="h-5 w-5" />
                Filters
              </button>
              <div className="flex bg-white rounded-xl border border-gray-200 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' ? 'bg-rose-100 text-rose-700' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid3X3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' ? 'bg-rose-100 text-rose-700' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-rose-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-rose-50 hover:border-rose-200'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-8">
            <FilterPanel />
          </div>
        )}

        {/* Wardrobe Grid */}
        <WardrobeGrid items={filteredItems} viewMode={viewMode} />

        {/* Add Item Modal */}
        {showAddModal && (
          <AddItemModal
            onClose={() => setShowAddModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default WardrobePage;