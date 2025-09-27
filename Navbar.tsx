import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Home, Shirt, Palette, Calendar, Camera } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/wardrobe', icon: Shirt, label: 'Wardrobe' },
    { path: '/create', icon: Palette, label: 'Create' },
    { path: '/planner', icon: Calendar, label: 'Planner' },
    { path: '/try-on', icon: Camera, label: 'Try On' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b border-rose-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              StyleAI
            </span>
          </Link>

          <div className="hidden md:flex space-x-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                  isActive(path)
                    ? 'bg-rose-100 text-rose-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex space-x-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isActive(path)
                    ? 'bg-rose-100 text-rose-700'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
                title={label}
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;