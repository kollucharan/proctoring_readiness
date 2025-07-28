
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Score } from '../Score/Score';
import { Details } from '../Details/Details';
import { Prosandcons } from '../Strengthsandchallenges/prosandcons';
import { Recommendations } from '../Recommendations/Recommendations';
import { Implementation } from '../Implementations/Implementations';
import { Conclusion } from '../Conclusion/Conclusion';
import type { FormType } from '../Form/Form';
import SimpleScore from '../Score/Simplescore';
 import { jsPDF } from "jspdf";
import { toPng } from 'html-to-image';
import toast from 'react-hot-toast';
interface ReportProps {
  formdata: FormType;
}

export const Report: React.FC<ReportProps> = ({ formdata }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score;
  const reportRef = useRef<HTMLDivElement>(null);

 
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFullReport, setShowFullReport] = useState(false);

  useEffect(() => {
    
    if (!score || !formdata || Object.keys(formdata).length === 0) {
      navigate('/', { replace: true });
    }
  }, [score, formdata, navigate]);

const DownloadReport = async () => {
  if (!reportRef.current) return;
  setIsGenerating(true);

  try {
    const wrapper = reportRef.current;
    const pageGroups = Array.from(wrapper.querySelectorAll<HTMLElement>(".page-group"));
    if (!pageGroups.length) throw new Error("No .page-group elements found"); 
    const offscreen = document.createElement("div");
    offscreen.style.position = "fixed";
    offscreen.style.top = "-9999px";
    offscreen.style.left = "-9999px";
    document.body.appendChild(offscreen);
    const pdf = new jsPDF({ unit: "px", format: "a4", orientation: "portrait" });
    const pageWidth  = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin     = 20;

   
    for (let i = 0; i < pageGroups.length; i++) {
      const node = pageGroups[i];

      
      const clone = node.cloneNode(true) as HTMLElement;
      
      clone.style.maxWidth = "none";
      clone.style.width    = "1152px";
      offscreen.appendChild(clone);

     
      const width  = Math.ceil(clone.scrollWidth);
      const height = Math.ceil(clone.scrollHeight);
      const pixRat = Math.min(window.devicePixelRatio || 1, 2);

    
      const dataUrl = await toPng(clone, {
        cacheBust: true,
        pixelRatio: pixRat,
        canvasWidth:  width,
        canvasHeight: height,
        style: {
          transform:       "scale(1)",
          transformOrigin: "top left",
          width:           `${width}px`,
          height:          `${height}px`,
        },
      });

   
      offscreen.removeChild(clone);

      
      const scale = (pageWidth - margin * 2) / width;
      const imgW  = width  * scale;
      const imgH  = height * scale;

      if (i > 0) pdf.addPage();
      pdf.addImage(dataUrl, "PNG", margin, margin, imgW, imgH);
    }

    
    document.body.removeChild(offscreen);

    
    pdf.save("Talview_Proctoring_Readiness_Report.pdf");
  } catch (err) {
    console.error("PDF generation failed:", err);
    toast.error('PDF generation failed:', {
        id: 'Pdf-error',
      });
  } finally {
    setIsGenerating(false);
  }
};
  

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
          {!showFullReport ? (
           
            <>              
              <button
                onClick={() => setShowFullReport(true)}
                className="group relative inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3
                           bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 cursor-pointer
                           text-white font-semibold text-sm sm:text-base
                           rounded-lg shadow-lg hover:shadow-xl
                           transition-all duration-300 ease-in-out
                           transform hover:scale-105 active:scale-95
                           focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50
                           border border-blue-600 hover:border-blue-700"
              >
                <span className="hidden sm:inline">View Full Report</span>
                <span className="sm:hidden">View Report</span>
              </button>

              <button
                onClick={() => navigate('/')}
                className="group relative inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3
                           bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 cursor-pointer
                           text-white font-semibold text-sm sm:text-base
                           rounded-lg shadow-lg hover:shadow-xl
                           transition-all duration-300 ease-in-out
                           transform hover:scale-105 active:scale-95
                           focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50
                           border border-blue-600 hover:border-blue-700"
              >
                <span className="hidden sm:inline">Try Again</span>
                <span className="sm:hidden">Retry</span>
              </button>
            </>
          ) : (
            
            <>
              <button
                onClick={DownloadReport}
                disabled={isGenerating}
                className={`group relative inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3
                           ${isGenerating ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 cursor-pointer'}
                           text-white font-semibold text-sm sm:text-base
                           rounded-lg shadow-lg hover:shadow-xl
                           transition-all duration-300 ease-in-out
                           ${!isGenerating ? 'transform hover:scale-105 active:scale-95' : ''}
                           focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50
                           ${isGenerating ? 'border border-gray-400' : 'border border-blue-600 hover:border-blue-700'}`}
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin">
                      <svg className="w-full h-full" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </div>
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2 transition-transform duration-300 group-hover:translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Report
                  </>
                )}
              </button>

              <button
                onClick={() => navigate('/')}
                className="group relative inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3
                           bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 cursor-pointer
                           text-white font-semibold text-sm sm:text-base
                           rounded-lg shadow-lg hover:shadow-xl
                           transition-all duration-300 ease-in-out
                           transform hover:scale-105 active:scale-95
                           focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50
                           border border-blue-600 hover:border-blue-700"
              >
                <span className="hidden sm:inline">Try Again</span>
                <span className="sm:hidden">Retry</span>
              </button>
            </>
          )}
        </div>
      </div>

      {!showFullReport ? (
      
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md px-4 sm:px-6 lg:px-8 py-8 sm:py-10 my-6">
          <section>
          
              <SimpleScore score={score} formdata={formdata} />
          </section>
          
        </div>
      ) : (
<div ref={reportRef} className="max-w-6xl mx-auto bg-white rounded-lg shadow-md px-4 sm:px-6 lg:px-8 py-8 sm:py-10 my-6">
 
  <div className="page-group" id="page-1">
    <div className="report-header text-center mb-10 sm:mb-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
        Proctoring Readiness Report
      </h1>
      <div className="w-20 sm:w-24 h-1 bg-blue-600 mx-auto mb-5 sm:mb-6" />
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
        Executive Summary
      </h2>
    </div>
    <section>
      <Score score={score} />
    </section>
    <section>
      <div className="mb-5 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
         Assessment Profile
        </h3>
        <div className="w-16 h-1 bg-blue-600" />
      </div>
     <Details formdata={formdata}/>
    </section>
 
  </div>

 
  <div className="page-group" id="page-2">
    <section>
      <div className="mb-5 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Strengths &amp; Challenges
        </h3>
        <div className="w-16 h-1 bg-blue-600" />
      </div>
      <Prosandcons formdata={formdata} />
    </section>
  </div>

  
  <div className="page-group" id="page-3">
    <section>
      <div className="mb-5 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Recommendations
        </h3>
        <div className="w-16 h-1 bg-blue-600" />
      </div>
      <Recommendations formdata={formdata} />
    </section>
  </div>

 
  <div className="page-group" id="page-4">
    <section>
      <div className="mb-5 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Roadmap
        </h3>
        <div className="w-16 h-1 bg-blue-600" />
      </div>
      <Implementation />
    </section>
    <section className="mt-12">
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

      )}

      <Footer />
    </div>
  );
};



export default Report;
