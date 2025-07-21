
// interface TE {
//   score: number;
// }

// export const Score = ({ score }: TE) => {
 
//   const getReadinessDescription = (score: number) => {
//     if (score >= 80) {
//       return "demonstrates excellent readiness for implementing online proctoring solutions with minimal areas for improvement.";
//     } else if (score >= 60) {
//       return "demonstrates good readiness for implementing online proctoring solutions with some areas for improvement.";
//     } else  {
//       return "indicates limited readiness for online proctoring with several areas requiring attention.";
//     } 
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white">
      
//       <div className="mb-8">
//         <div className="text-gray-700 text-base leading-relaxed mb-6">
//           This report provides a comprehensive assessment of your institution's readiness for implementing online proctoring solutions. Based on the data provided and analysis conducted, we have identified key strengths, challenges, and recommendations to guide your proctoring strategy.
//         </div>
//       </div>

      
//       <div className="flex items-center gap-8 mb-8">
       
//         <div className="flex-shrink-0">
//           <div className="relative w-48 h-48">
           
//             <div className="absolute inset-0 rounded-full bg-blue-600 flex items-center justify-center">
//               <span className="text-white text-6xl font-bold">{score}</span>
//             </div>
//           </div>
//         </div>        
//         <div className="flex-1">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">
//             Proctoring Readiness
//           </h1>
//           <div className="text-2xl font-semibold text-gray-700 mb-6">
//             Score: {score}/100
//           </div>
//           <div className="text-lg text-gray-600 leading-relaxed">
//             Your institution {getReadinessDescription(score)}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Score;

interface TE {
  score: number;
}

export const Score = ({ score }: TE) => {
  const getReadinessDescription = (score: number) => {
    if (score >= 80) {
      return "demonstrates excellent readiness for implementing online proctoring solutions with minimal areas for improvement.";
    } else if (score >= 60) {
      return "demonstrates good readiness for implementing online proctoring solutions with some areas for improvement.";
    } else {
      return "indicates limited readiness for online proctoring with several areas requiring attention.";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <p className="text-gray-700 text-base leading-relaxed mb-8">
        This report provides a comprehensive assessment of your institution's readiness for implementing online proctoring solutions. Based on the data provided and analysis conducted, we have identified key strengths, challenges, and recommendations to guide your proctoring strategy.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        <div className="flex-shrink-0">
          <div className="relative w-32 h-32 sm:w-48 sm:h-48">
            <div className="absolute inset-0 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-5xl sm:text-6xl font-bold">
                {score}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1">
          
          <p className="text-xl sm:text-2xl font-semibold text-gray-700 mb-6">
           Proctoring Readiness Score: {score}/100
          </p>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Your institution {getReadinessDescription(score)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Score;
