import React from 'react';
import type { FormType } from '../Form/Form';

interface SimpleRecProps {
  formdata: FormType;
}


const liveSummary =
  'Live proctoring involves trained human proctors monitoring exams in real time to ensure integrity and provide immediate intervention.';
const aiAgentSummary =
  'AI-Agent proctoring leverages computer vision and audio analysis to automatically detect suspicious behaviors at scale.';
const lockdownSummary =
  'Lockdown Browser restricts access to other applications and resources, combined with periodic manual spot-checks by proctors.';


const simpleRecommendations: Record<string, { title: string; summary: string }[]> = {
  high: [
    {
      title: 'Primary Recommendation:Live Proctoring',
      summary: liveSummary,
    },
    {
      title: 'Secondary Recommendation: AI-Agent Proctoring Solution',
      summary: aiAgentSummary,
    },
    {
      title: 'Alternative Approach: Lockdown Browser + Periodic Monitoring',
      summary: lockdownSummary,
    },
  ],
  medium: [
    {
      title: 'Primary Recommendation: AI-Agent Proctoring Solution',
      summary: aiAgentSummary,
    },
    {
      title: 'Secondary Recommendation:Live Proctoring',
      summary: liveSummary,
    },
    {
      title: 'Alternative Approach: Lockdown Browser + Periodic Monitoring',
      summary: lockdownSummary,
    },
  ],
  low: [
    {
      title: 'Primary Recommendation:Lockdown Browser + Periodic Monitoring',
      summary: lockdownSummary,
    },
    {
      title: 'Secondary Recommendation: AI-Agent Proctoring Solution',
      summary: aiAgentSummary,
    },
    {
      title: 'Alternative Approach: Live Proctoring',
      summary: liveSummary,
    },
  ],
};

export const SimpleRecommendations: React.FC<SimpleRecProps> = ({ formdata }) => {
  const budgetKey = (formdata.budget as string) || 'medium';
  const recs = simpleRecommendations[budgetKey] || simpleRecommendations['medium'];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 text-center sm:text-left">
        Proctoring Recommendations
      </h2>
      <ul className="space-y-6">
        {recs.map((rec, idx) => (
          <li
            key={idx}
            className="flex flex-col border-l-4 border-blue-500 pl-4 pr-4 py-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-0">
              {rec.title}
            </h3>
            <p className="text-gray-700 text-sm sm:text-base">
              {rec.summary}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimpleRecommendations;
