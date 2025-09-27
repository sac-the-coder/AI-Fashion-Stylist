import React from 'react';
import { Star, Palette, Award, Sun, TrendingUp } from 'lucide-react';
import { CompatibilityScore as CompatibilityScoreType } from '../../types';

interface CompatibilityScoreProps {
  compatibility: CompatibilityScoreType;
}

const CompatibilityScore: React.FC<CompatibilityScoreProps> = ({ compatibility }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 75) return 'text-blue-600 bg-blue-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreText = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Work';
  };

  const metrics = [
    {
      label: 'Color Harmony',
      score: compatibility.colorHarmony,
      icon: Palette,
      description: 'How well colors work together',
    },
    {
      label: 'Formality Match',
      score: compatibility.formalityMatch,
      icon: Award,
      description: 'Consistency in dress code level',
    },
    {
      label: 'Seasonal Match',
      score: compatibility.seasonalMatch,
      icon: Sun,
      description: 'Appropriate for current season',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-rose-600" />
          Outfit Compatibility
        </h3>
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500 fill-current" />
          <span className="text-lg font-bold text-gray-900">{compatibility.overallScore}/100</span>
        </div>
      </div>

      {/* Overall Score */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Overall Score</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(compatibility.overallScore)}`}>
            {getScoreText(compatibility.overallScore)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full transition-all duration-500 relative overflow-hidden"
            style={{ width: `${compatibility.overallScore}%` }}
          >
            <div className="absolute inset-0 bg-white bg-opacity-30 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Individual Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{metric.label}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.score}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-rose-400 to-pink-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${metric.score}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600">{metric.description}</p>
            </div>
          );
        })}
      </div>

      {/* Feedback */}
      {compatibility.feedback && compatibility.feedback.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900 mb-3">Style Insights</h4>
          {compatibility.feedback.map((feedback, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-blue-800 leading-relaxed">{feedback}</p>
            </div>
          ))}
        </div>
      )}

      {/* Improvement Suggestions */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <h4 className="font-semibold text-gray-900 mb-3">Suggestions for Improvement</h4>
        <div className="space-y-2">
          {compatibility.overallScore < 80 && (
            <>
              {compatibility.colorHarmony < 75 && (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-sm text-amber-800">
                    💡 Try incorporating more neutral colors or sticking to a monochromatic color scheme
                  </p>
                </div>
              )}
              {compatibility.formalityMatch < 75 && (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-sm text-amber-800">
                    👔 Consider matching formality levels - mix casual with casual, formal with formal
                  </p>
                </div>
              )}
              {compatibility.seasonalMatch < 75 && (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-sm text-amber-800">
                    🌤️ Some items might not be suitable for the current season - check weather conditions
                  </p>
                </div>
              )}
            </>
          )}
          {compatibility.overallScore >= 80 && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">
                ✨ Great outfit! Your style choices work well together.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompatibilityScore;