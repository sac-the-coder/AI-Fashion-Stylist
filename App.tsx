import React, { useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './components/pages/HomePage';
import WardrobePage from './components/pages/WardrobePage';
import OutfitCreatorPage from './components/pages/OutfitCreatorPage';
import PlannerPage from './components/pages/PlannerPage';
import TryOnPage from './components/pages/TryOnPage';
import { WardrobeProvider } from './context/WardrobeContext';
import { WeatherProvider } from './context/WeatherContext';

function App() {
  return (
    <BrowserRouter>
      <WeatherProvider>
        <WardrobeProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/wardrobe" element={<WardrobePage />} />
              <Route path="/create" element={<OutfitCreatorPage />} />
              <Route path="/planner" element={<PlannerPage />} />
              <Route path="/try-on" element={<TryOnPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </WardrobeProvider>
      </WeatherProvider>
    </BrowserRouter>
  );
}

export default App;