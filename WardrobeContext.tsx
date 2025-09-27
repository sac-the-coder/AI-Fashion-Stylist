import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WardrobeItem, Outfit } from '../types';

interface WardrobeContextType {
  wardrobeItems: WardrobeItem[];
  outfits: Outfit[];
  addWardrobeItem: (item: WardrobeItem) => void;
  removeWardrobeItem: (id: string) => void;
  updateWardrobeItem: (id: string, updates: Partial<WardrobeItem>) => void;
  addOutfit: (outfit: Outfit) => void;
  removeOutfit: (id: string) => void;
  getItemsByCategory: (category: string) => WardrobeItem[];
}

const WardrobeContext = createContext<WardrobeContextType | undefined>(undefined);

// Sample data for demonstration
const sampleWardrobeItems: WardrobeItem[] = [
  {
    id: '1',
    name: 'White Cotton Shirt',
    category: 'tops',
    subcategory: 'shirt',
    color: 'white',
    material: 'cotton',
    brand: 'J.Crew',
    imageUrl: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300',
    tags: ['classic', 'versatile'],
    seasonality: ['spring', 'summer', 'fall'],
    formality: 'smart-casual',
    comfort: 4,
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Dark Denim Jeans',
    category: 'bottoms',
    subcategory: 'jeans',
    color: 'blue',
    material: 'denim',
    brand: 'Levi\'s',
    imageUrl: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=300',
    tags: ['casual', 'durable'],
    seasonality: ['fall', 'winter', 'spring'],
    formality: 'casual',
    comfort: 4,
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Black Blazer',
    category: 'outerwear',
    subcategory: 'blazer',
    color: 'black',
    material: 'wool',
    brand: 'Zara',
    imageUrl: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300',
    tags: ['professional', 'elegant'],
    seasonality: ['fall', 'winter', 'spring'],
    formality: 'formal',
    comfort: 3,
    createdAt: new Date(),
  },
  {
    id: '4',
    name: 'Brown Leather Boots',
    category: 'shoes',
    subcategory: 'boots',
    color: 'brown',
    material: 'leather',
    brand: 'Dr. Martens',
    imageUrl: 'https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg?auto=compress&cs=tinysrgb&w=300',
    tags: ['sturdy', 'stylish'],
    seasonality: ['fall', 'winter'],
    formality: 'smart-casual',
    comfort: 4,
    createdAt: new Date(),
  },
];

export function WardrobeProvider({ children }: { children: ReactNode }) {
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>(sampleWardrobeItems);
  const [outfits, setOutfits] = useState<Outfit[]>([]);

  const addWardrobeItem = (item: WardrobeItem) => {
    setWardrobeItems(prev => [...prev, item]);
  };

  const removeWardrobeItem = (id: string) => {
    setWardrobeItems(prev => prev.filter(item => item.id !== id));
  };

  const updateWardrobeItem = (id: string, updates: Partial<WardrobeItem>) => {
    setWardrobeItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const addOutfit = (outfit: Outfit) => {
    setOutfits(prev => [...prev, outfit]);
  };

  const removeOutfit = (id: string) => {
    setOutfits(prev => prev.filter(outfit => outfit.id !== id));
  };

  const getItemsByCategory = (category: string) => {
    return wardrobeItems.filter(item => item.category === category);
  };

  const value = {
    wardrobeItems,
    outfits,
    addWardrobeItem,
    removeWardrobeItem,
    updateWardrobeItem,
    addOutfit,
    removeOutfit,
    getItemsByCategory,
  };

  return (
    <WardrobeContext.Provider value={value}>
      {children}
    </WardrobeContext.Provider>
  );
}

export function useWardrobe() {
  const context = useContext(WardrobeContext);
  if (context === undefined) {
    throw new Error('useWardrobe must be used within a WardrobeProvider');
  }
  return context;
}