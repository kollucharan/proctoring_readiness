
import React, { useRef ,useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Score } from "../Score/Score";
import { Details } from "../Details/Details";
import { Prosandcons } from "../Strengthsandchallenges/prosandcons";
import { Recommendations } from "../Recommendations/Recommendations";
import { Implementation } from "../Implementations/Implementations";
import { Conclusion } from "../Conclusion/Conclusion";
import type { FormType } from '../Form/Form';
interface ReportProps {
  formdata: FormType;
}

export const Report: React.FC<ReportProps> = ({ formdata }) => {
  const navigate=useNavigate();
  const location = useLocation();
  const score = location.state?.score;
   const reportRef = useRef<HTMLDivElement>(null);
 const [isGenerating, setIsGenerating] = useState(false);


 useEffect(() => {
   
    if (!score || !formdata || Object.keys(formdata).length === 0) {
      navigate('/', { replace: true });
      return;
    }
    
  }, [score, formdata, navigate]);

  const DownloadReport = async () => {
    if (!reportRef.current) return;
    setIsGenerating(true);

    try {
      const htmlToImage = await import('html-to-image');
      const { toPng } = htmlToImage;
      const { jsPDF } = await import('jspdf');

      const dataUrl = await toPng(reportRef.current, { cacheBust: true });

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      const pageHeight = pdf.internal.pageSize.getHeight();

      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('Talviews_Proctoring_Readiness_Report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
   <div className="flex justify-end mb-4 sm:mb-6">
  <button
    onClick={DownloadReport}
    disabled={isGenerating}
    className={`group relative inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 
               ${isGenerating 
                 ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' 
                 : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 cursor-pointer'
               }
               text-white font-semibold text-sm sm:text-base
               rounded-lg shadow-lg hover:shadow-xl 
               transition-all duration-300 ease-in-out
               ${!isGenerating ? 'transform hover:scale-105 active:scale-95' : ''}
               focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50
               ${isGenerating 
                 ? 'border border-gray-400' 
                 : 'border border-blue-600 hover:border-blue-700'
               }`}
  >
   
    {isGenerating && (
      <div className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin">
        <svg className="w-full h-full" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    )}
    
    {/* Download Icon */}
    {!isGenerating && (
      <svg 
        className="w-4 h-4 sm:w-5 sm:h-5 mr-2 transition-transform duration-300 group-hover:translate-y-0.5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
        />
      </svg>
    )}
    
    {/* Button Text */}
    <span className="hidden sm:inline">
      {isGenerating ? 'Generating PDF...' : 'Download Report'}
    </span>
    <span className="sm:hidden">
      {isGenerating ? 'Generating...' : 'Download Report'}
    </span>
    
    {/* Subtle shine effect - only when not generating */}
    {!isGenerating && (
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 transform -skew-x-12" />
    )}
  </button>
</div>
  </div>
      
      <div ref={reportRef} className="max-w-6xl mx-auto bg-white rounded-lg shadow-md px-4 sm:px-6 lg:px-8 py-8 sm:py-10 my-6" >
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Proctoring Readiness Report
          </h1>
          <div className="w-20 sm:w-24 h-1 bg-blue-600 mx-auto mb-5 sm:mb-6" />
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
            Executive Summary
          </h2>
        
        </div>
        
        <div className="space-y-12 sm:space-y-16">
          <section>
            <Score score={score} />
          </section>
          
          <section>
            <Details formdata={formdata} />
          </section>
          
          <section>
            <div className="mb-5 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Strengths & Challenges
              </h3>
              <div className="w-16 h-1 bg-blue-600" />
            </div>
            <Prosandcons formdata={formdata} />
          </section>
          
          <section>
            <div className="mb-5 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Recommendations
              </h3>
              <div className="w-16 h-1 bg-blue-600" />
            </div>
            <Recommendations formdata={formdata} />
          </section>
          
          <section>
            <div className="mb-5 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                 Roadmap
              </h3>
              <div className="w-16 h-1 bg-blue-600" />
            </div>
            <Implementation />
          </section>
          
          <section>
            <div className="mb-5 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Conclusion
              </h3>
              <div className="w-16 h-1 bg-blue-600" />
            </div>
            <Conclusion score={score} budget={formdata.budget} />
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Report;