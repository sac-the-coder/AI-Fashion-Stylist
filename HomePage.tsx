import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shirt, Palette, Cloud, Star } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import WeatherCard from '../features/WeatherCard';

const HomePage: React.FC = () => {
  const { weather } = useWeather();

  const features = [
    {
      icon: Shirt,
      title: 'Smart Wardrobe',
      description: 'Digitize your entire wardrobe with AI-powered categorization and tagging.',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: Palette,
      title: 'Outfit Creation',
      description: 'Get personalized outfit suggestions based on mood, occasion, and weather.',
      color: 'from-rose-500 to-pink-600',
    },
    {
      icon: Cloud,
      title: 'Weather Integration',
      description: 'Smart recommendations that adapt to current and forecasted weather conditions.',
      color: 'from-teal-500 to-cyan-600',
    },
    {
      icon: Star,
      title: 'Style Scoring',
      description: 'Advanced compatibility scoring with detailed feedback on color harmony and style.',
      color: 'from-amber-500 to-orange-600',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-teal-50 pt-20 pb-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl shadow-lg">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Your Personal
              <span className="block bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                AI Stylist
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your wardrobe into a smart, organized collection. Get personalized outfit suggestions, 
              weather-aware recommendations, and style insights powered by AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/wardrobe"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold rounded-2xl hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                Start Building Wardrobe
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/create"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl border-2 border-gray-200 hover:border-rose-300 hover:text-rose-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Create Outfit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Weather Section */}
      {weather && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Today's Weather Insights</h2>
              <p className="text-lg text-gray-600">Smart outfit suggestions based on current conditions</p>
            </div>
            <div className="flex justify-center">
              <WeatherCard />
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From wardrobe management to weather-aware styling, we've got every aspect of your fashion journey covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-rose-200"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Style?</h2>
          <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have revolutionized their wardrobe management and styling experience.
          </p>
          <Link
            to="/wardrobe"
            className="inline-flex items-center px-8 py-4 bg-white text-rose-600 font-semibold rounded-2xl hover:bg-rose-50 transition-all duration-200 shadow-lg hover:shadow-xl group"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;