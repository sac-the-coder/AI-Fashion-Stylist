export interface WardrobeItem {
  id: string;
  name: string;
  category: 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'shoes' | 'accessories';
  subcategory: string;
  color: string;
  pattern?: string;
  material?: string;
  brand?: string;
  imageUrl: string;
  tags: string[];
  seasonality: ('spring' | 'summer' | 'fall' | 'winter')[];
  formality: 'casual' | 'smart-casual' | 'formal' | 'party';
  comfort: number; // 1-5 scale
  createdAt: Date;
}

export interface Outfit {
  id: string;
  name: string;
  items: WardrobeItem[];
  occasion: string;
  mood: string;
  weather?: WeatherInfo;
  score: number;
  compatibility: CompatibilityScore;
  createdAt: Date;
  scheduledDate?: Date;
}

export interface CompatibilityScore {
  colorHarmony: number;
  formalityMatch: number;
  seasonalMatch: number;
  overallScore: number;
  feedback: string[];
}

export interface WeatherInfo {
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy';
  description: string;
  humidity: number;
  windSpeed: number;
  alerts: string[];
}

export interface StylePreferences {
  mood: 'comfortable' | 'confident' | 'romantic' | 'edgy' | 'professional' | 'playful';
  occasion: 'work' | 'casual' | 'date' | 'party' | 'formal' | 'workout' | 'travel';
  colorPreference: 'warm' | 'cool' | 'neutral' | 'bright' | 'muted';
  comfortLevel: number; // 1-5 scale
}