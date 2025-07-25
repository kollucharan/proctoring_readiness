
import React from 'react';
import type { FormType } from "../Form/Form";
import type { ReactNode } from 'react';

interface ProsAndConsProps {
  formdata: FormType;
}

interface Strength {
  category: string;
  description: string;
}

interface Challenge {
  icon: string;
  title: string;
  // description: string;
   description: ReactNode;
}

export const Prosandcons: React.FC<ProsAndConsProps> = ({ formdata }) => {


  const getStrengths = (): Strength[] => {
    const strengths: Strength[] = [];

 
    if (formdata.budget === 'High' || formdata.budget === 'Medium') {
      strengths.push({
        category: 'Budget Allocation',
        description:
          formdata.budget === 'High'
            ? 'The high budget range provides access to premium proctoring solutions with advanced features.'
            : 'The medium budget range allows for several viable proctoring options with good feature sets.',
      });
    }

    // Technical infrastructure
    if (formdata.techRequirements === 'Standard' || formdata.techRequirements === 'Advanced') {
      strengths.push({
        category: 'Technical Infrastructure',
        description:
          formdata.techRequirements === 'Advanced'
            ? 'Your institution has advanced technical capabilities that can support sophisticated proctoring solutions.'
            : 'Your institution has standard technical capabilities that can support most proctoring solutions.',
      });
    }

    // Assessment design
    if (
      formdata.assessmentType === 'Multiple Choice' ||
      formdata.assessmentType === 'Project Based' ||
      formdata.assessmentType === 'Mixed Format'
    ) {
      strengths.push({
        category: 'Assessment Design',
        description:
          formdata.assessmentType === 'Mixed Format'
            ? 'The mixed assessment format provides flexibility in implementing different proctoring approaches.'
            : `The ${formdata.assessmentType.toLowerCase()} format is well-suited for various proctoring solutions.`,
      });
    }

    // Security requirements
    if (formdata.concerns.length < 2) {
      strengths.push({
        category: 'Security Requirements',
        description:
          'With minimal security concerns, implementation will be more straightforward and cost-effective.',
      });
    }

    // Student population
    if (
      formdata.organizationSize === 'Small (Less than 50)' ||
      formdata.organizationSize === 'Medium (50-200)'
    ) {
      strengths.push({
        category: 'Student Population',
        description:
          'The manageable student population size allows for more personalized proctoring approaches and easier implementation.',
      });
    }

    // Exam schedule
    if (formdata.examFrequency === 'Termly' || formdata.examFrequency === 'Yearly') {
      strengths.push({
        category: 'Exam Schedule',
        description:
          'The infrequent exam schedule allows for more thorough preparation and quality control for each proctoring session.',
      });
    }

    return strengths;
  };

  const getChallenges = (): Challenge[] => {
    const challenges: Challenge[] = [];

    // Budget constraints
    if (formdata.budget === 'Low') {
      challenges.push({
        icon: '⚠️',
        title: 'Budget Constraints',
        description:
          'The low budget range may limit options for comprehensive proctoring solutions, especially for larger populations.',
      });
    }

    // Technical limitations
    if (formdata.techRequirements === 'Minimal') {
      challenges.push({
        icon: '⚠️',
        title: 'Technical Limitations',
        description:
          'Minimal technical infrastructure may restrict the types of proctoring solutions that can be effectively implemented.',
      });
    }

    
    if (formdata.concerns.length > 2) {
      //  const list = formdata.concerns.join(', ');
      challenges.push({
        icon: '⚠️',
        title: 'Multiple Security Concerns',
        // description: `Your institution has identified ${list} as major security concerns that need to be addressed by any proctoring solution.`,
     description: (
        <>
          Your institution has identified{' '}
          {formdata.concerns.map((c, i) => (
            <strong key={c}>
              {c}
              {i < formdata.concerns.length - 1 ? ', ' : ''}
            </strong>
          ))}{' '}
          as major security concerns that need to be addressed by any proctoring solution.
        </>
      ),
      });
    }

    // Large student population
    if (
      formdata.organizationSize === 'Large (200-500)' ||
      formdata.organizationSize === 'Massive (500+)'
    ) {
      const sizeDescription =
        formdata.organizationSize === 'Massive (500+)' 
          ? 'With 500+ students per assessment session'
          : 'With 200-500 students per assessment session';

      challenges.push({
        icon: '⚠️',
        title: 'Large Student Population',
        description: `${sizeDescription}, scalability and performance are critical factors for any proctoring solution.`,
      });
    }

    
    if (formdata.examFrequency === 'Daily' || formdata.examFrequency === 'Weekly') {
      challenges.push({
        icon: '⚠️',
        title: 'High Exam Frequency',
        description: `${formdata.examFrequency.charAt(0).toUpperCase() +
          formdata.examFrequency.slice(1)} examinations require a robust, reliable proctoring solution with minimal downtime.`,
      });
    }

    return challenges;
  };

  const strengths = getStrengths();
  const challenges = getChallenges();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {strengths.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
            Key Strengths
          </h3>
          <ul className="space-y-3">
            {strengths.map((strength, idx) => (
              <li key={idx} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div>
                  <strong className=" font-semibold text-gray-700">
                    {strength.category}:
                  </strong>
                  <span className="text-gray-600 ml-2">
                    {strength.description}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {challenges.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
            Identified Challenges
          </h3>
          <div className="space-y-4">
            {challenges.map((challenge, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border-l-4 border-blue-400 flex items-start space-x-4"
              >
                <div className="flex-shrink-0 text-2xl">
                  {challenge.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {challenge.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {challenge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {strengths.length === 0 && challenges.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">
            Complete the form to see your analysis
          </p>
        </div>
      )}
    </div>
  );
};

export default Prosandcons;
