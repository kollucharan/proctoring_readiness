
import React from 'react';
import type { FormType } from "../Form/Form";

interface Recoprop {
  formdata: FormType;
}

interface Recommendation {
  heading: string;
  description: string;
  Advantages: {
    title: string;
    content: string[];
  };
  Limitations: {
    title: string;
    content: string[];
  };
}

const elem1: Recommendation = {
  heading: 'Primary Recommendation:Live Proctoring',
  description:
    "Live proctoring involves real-time monitoring of candidates by human proctors, offering the highest level of exam integrity and immediate intervention capabilities.",
  Advantages: {
    title: 'Advantages',
    content: [
      'Human verification reduces false positives',
      'Better security than AI-only solutions',
      'Enables real-time intervention during suspicious activity',
      'Scalable for high population',
      'More appropriate for high-stakes exams'
    ]
  },
  Limitations: {
    title: 'Limitations',
    content: [
      'Higher cost',
      'More complex implementation',
      'Will require clear communication and training',
      'Additional staffing requirements'
    ]
  }
};

const elem2: Recommendation = {
  heading: 'Secondary Recommendation: AI-Agent Proctoring Solution',
  description:
    "Based on your institution's profile, we recommend implementing an AI-powered proctoring solution that can automatically detect suspicious behaviors through webcam, microphone, and screen analysis.",
  Advantages: {
    title: 'Advantages',
    content: [
      'Cost-effective for your budget range ($5-15 per student)',
      'Scalable for your large student population',
      '24/7 availability for flexible exam scheduling',
      'Consistent monitoring across all assessment sessions',
     
    ]
  },
  Limitations: {
    title: 'Limitations',
    content: [
      'May produce false positives requiring review',
      'Student privacy concerns need to be addressed',
      'Limited intervention capabilities during exams',
      'Will require clear communication and training',
      'May not detect all sophisticated cheating methods'
    ]
  }
};

const elem3: Recommendation = {
  heading: 'Alternative Approach: Lockdown Browser + Periodic Monitoring',
  description:
    "For more budget-conscious implementation, consider a secure browser solution combined with random spot checks by proctors.",
  Advantages: {
    title: 'Advantages',
    content: [
      'Lower cost implementation',
      'Fewer privacy concerns',
      'Lower bandwidth requirements',
      'Easier to implement quickly'
    ]
  },
  Limitations: {
    title: 'Limitations',
    content: [
      'Limited protection against impersonation',
      'Cannot detect off-screen activities',
      'Technical workarounds exist',
      'Not suitable for high-stakes assessments'
    ]
  }
};
//'Primary Recommendation:Live Proctoring'
// 'Secondary Recommendation: AI-Agent Proctoring Solution'
//  'Alternative Approach: Lockdown Browser + Periodic Monitoring',

export const Recommendations: React.FC<Recoprop> = ({ formdata }) => {
  const array: Recommendation[] = [];
  if (formdata.budget === 'High') {
    elem1.heading='Primary Recommendation:Live Proctoring'
    elem2.heading='Secondary Recommendation: AI-Agent Proctoring Solution'
    elem3.heading='Alternative Approach: Lockdown Browser + Periodic Monitoring'

    array.push(elem1, elem2, elem3);
  } else if (formdata.budget === 'Medium') {
     elem2.heading='Primary Recommendation:AI-Agent Proctoring Solution'
     elem1.heading='Secondary Recommendation:Live Proctoring'
      elem3.heading='Alternative Approach: Lockdown Browser + Periodic Monitoring'

    array.push(elem2, elem1, elem3);
  } else {
    elem3.heading='Primary Recommendation:Lockdown Browser + Periodic Monitoring'
    elem2.heading='Secondary Recommendation: AI-Agent Proctoring Solution'
    elem1.heading='Live Proctoring'
    array.push(elem3, elem2, elem1);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-700 pb-2">
        Proctoring Recommendations
      </h1>

      {array.map((elem, index) => (
        <div key={index} className="mb-12">
          {/* Recommendation Header */}
          <div className="border-l-4 border-blue-500 pl-4 sm:pl-6 py-2">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
              {elem.heading}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {elem.description}
            </p>
          </div>

          {/* Advantages & Limitations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="flex items-center text-base sm:text-lg font-semibold text-[#143A59] mb-2">
                <span className="mr-2 font-semibold text-gray-800">✓</span>
                {elem.Advantages.title}
              </h3>
              <ul className="space-y-2 ml-6">
                {elem.Advantages.content.map((adv, i) => (
                  <li key={i} className="text-gray-700 text-sm sm:text-base flex items-start">
                    <span className="mr-2 mt-1">•</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="flex items-center text-base sm:text-lg font-semibold text-[#143A59] mb-2">
                <span className="mr-2 font-semibold text-gray-800">✗</span>
                {elem.Limitations.title}
              </h3>
              <ul className="space-y-2 ml-6">
                {elem.Limitations.content.map((lim, i) => (
                  <li key={i} className="text-gray-700 text-sm sm:text-base flex items-start">
                    <span className="mr-2 mt-1">•</span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
