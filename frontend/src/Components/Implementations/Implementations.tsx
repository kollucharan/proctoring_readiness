

// import React from 'react';

// interface StepItem {
//   title: string;
//   description: string;
// }

//  export const Implementation: React.FC = () => {
//   const steps: StepItem[] = [
//     {
//       title: "Assessment of Technical Requirements",
//       description: "Conduct a detailed assessment of your existing technical infrastructure, including network bandwidth, student device capabilities, and LMS integration requirements."
//     },
//     {
//       title: "Vendor Selection",
//       description: "Research and select a proctoring solution provider that meets your specific needs, budget constraints, and security requirements."
//     },
//     {
//       title: "Pilot Implementation",
//       description: "Implement the solution with a small group of courses or departments to test functionality, identify issues, and gather feedback."
//     },
//     {
//       title: "Faculty and Student Training",
//       description: "Develop and deliver comprehensive training programs for faculty and students on using the proctoring solution effectively."
//     },
//     {
//       title: "Policy Development",
//       description: "Establish clear policies regarding proctoring use, including privacy protections, data retention, and academic integrity guidelines."
//     },
//     {
//       title: "Full Implementation",
//       description: "Roll out the solution across all targeted courses and departments, with ongoing support and monitoring."
//     },
//     {
//       title: "Continuous Evaluation",
//       description: "Regularly assess the effectiveness of the proctoring solution and make adjustments as needed based on feedback and outcomes."
//     }
//   ];

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold text-gray-800 mb-2 border-b-4 border-blue-600 pb-2">
//           Implementation Roadmap
//         </h2>
//       </div>
      
//       <div className="space-y-6">
//         {steps.map((step, index) => (
//           <div 
//             key={index} 
//             className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500 hover:bg-blue-50 transition-colors duration-200"
//           >
//             <div className="flex items-start space-x-4">
//               <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
//                 {index + 1}
//               </div>
//               <div className="flex-1">
//                 <h4 className="text-xl font-semibold text-gray-800 mb-3">
//                   {step.title}
//                 </h4>
//                 <p className="text-gray-600 leading-relaxed">
//                   {step.description}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

import React from 'react';

interface StepItem {
  title: string;
  description: string;
}

export const Implementation: React.FC = () => {
  const steps: StepItem[] = [
    {
      title: "Assessment of Technical Requirements",
      description:
        "Conduct a detailed assessment of your existing technical infrastructure, including network bandwidth, student device capabilities, and LMS integration requirements.",
    },
    {
      title: "Vendor Selection",
      description:
        "Research and select a proctoring solution provider that meets your specific needs, budget constraints, and security requirements.",
    },
    {
      title: "Pilot Implementation",
      description:
        "Implement the solution with a small group of courses or departments to test functionality, identify issues, and gather feedback.",
    },
    {
      title: "Faculty and Student Training",
      description:
        "Develop and deliver comprehensive training programs for faculty and students on using the proctoring solution effectively.",
    },
    {
      title: "Policy Development",
      description:
        "Establish clear policies regarding proctoring use, including privacy protections, data retention, and academic integrity guidelines.",
    },
    {
      title: "Full Implementation",
      description:
        "Roll out the solution across all targeted courses and departments, with ongoing support and monitoring.",
    },
    {
      title: "Continuous Evaluation",
      description:
        "Regularly assess the effectiveness of the proctoring solution and make adjustments as needed based on feedback and outcomes.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 border-b-4 border-blue-600 pb-2">
          Implementation Roadmap
        </h2>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="border-l-4 border-blue-500 pl-4 sm:pl-6 py-4 transition-colors duration-200"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                  {step.title}
                </h4>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Implementation;
