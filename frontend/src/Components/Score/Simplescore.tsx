
import React from 'react';
import type { FormType } from '../Form/Form';

interface SimpleScoreProps {
  score: number;
  formdata: FormType;
}

const liveSummary =
  'Live proctoring involves trained human proctors monitoring exams in real time to ensure integrity and provide immediate intervention.';
const aiAgentSummary =
  'AI-Agent proctoring leverages computer vision and audio analysis to automatically detect suspicious behaviors at scale.';
const lockdownSummary =
  'Lockdown Browser restricts access to other applications and resources, combined with periodic manual spot‑checks by proctors.';

const simpleRecommendations: Record<string, { title: string; summary: string }[]> = {
  high: [
    { title: 'Primary Recommendation: Live Proctoring', summary: liveSummary },
    { title: 'Secondary Recommendation: AI‑Agent Proctoring Solution', summary: aiAgentSummary },
    { title: 'Alternative Approach: Lockdown Browser + Periodic Monitoring', summary: lockdownSummary },
  ],
  medium: [
    { title: 'Primary Recommendation: AI‑Agent Proctoring Solution', summary: aiAgentSummary },
    { title: 'Secondary Recommendation: Live Proctoring', summary: liveSummary },
    { title: 'Alternative Approach: Lockdown Browser + Periodic Monitoring', summary: lockdownSummary },
  ],
  low: [
    { title: 'Primary Recommendation: Lockdown Browser + Periodic Monitoring', summary: lockdownSummary },
    { title: 'Secondary Recommendation: AI‑Agent Proctoring Solution', summary: aiAgentSummary },
    { title: 'Alternative Approach: Live Proctoring', summary: liveSummary },
  ],
};

const SimpleScore: React.FC<SimpleScoreProps> = ({ score, formdata }) => {
  const key = (formdata.budget as string) || 'medium';
  const recs = simpleRecommendations[key] || simpleRecommendations['medium'];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-16">
       
        <div className="flex-shrink-0 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 text-center md:text-left">
            Readiness Score
          </h3>
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 mx-auto md:mx-0">
            <div className="absolute inset-0 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
                {score}/100
              </span>
            </div>
          </div>
         
        </div>

      
        <div className="mt-8 md:mt-0 flex-1 md:w-3/5">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 text-center md:text-left">
            Recommendations
          </h3>
          <ul className="space-y-4">
            {recs.map((rec, i) => (
              <li
                key={i}
                className="border-l-4 border-blue-500 bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow"
              >
                <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-1">
                  {rec.title}
                </h4>
                <p className="text-gray-700 text-sm sm:text-base">
                  {rec.summary}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SimpleScore;
