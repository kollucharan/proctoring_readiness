
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { gql, useMutation } from "@apollo/client";
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export type SecurityConcern = 'Student Impersonation' | 'Unauthorized Resources' | 'Student Collusion' | 'AI Tool Usage' | 'Student Privacy';

export interface FormType {
  instituteType: 'Higher Education' | 'K12-school' | 'Corporate Training' | 'Other' | '';
  assessmentType: 'Multiple Choice' | 'Essay/Written Response' | 'Open Book' | 'Project Based' | 'Mixed Format' | '';
  organizationSize: 'Small (Less than 50)' | 'Medium (50-200)' | 'Large (200-500)' | 'Massive (500+)' | '';
  examFrequency: 'Daily' | 'Weekly' | 'Monthly' | 'Termly' | 'Yearly' | '';
  techRequirements: 'Minimal' | 'Standard' | 'Advanced' | '';
  budget: 'Low' | 'Medium' | 'High' | '';
  concerns: SecurityConcern[];
}

interface FormProps {
  formdata: FormType;
  setFormdata: React.Dispatch<React.SetStateAction<FormType>>;
}

const UPDATE_DATA = gql`   
mutation InsertFormResponse($email: String!, $budget: String!, $frequency: String!, $Total_students: String!) {
  insert_user_details_one(object: {email: $email, budget: $budget, frequency: $frequency, Total_students: $Total_students}) {
    id
  }
}
`;

export const Formcomponent = ({ formdata, setFormdata }: FormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showpopup, setShowpopup] = useState<Boolean>(false);
  const [email, setEmail] = useState('');
  const [addData, { loading }] = useMutation(UPDATE_DATA);
  const navigate = useNavigate();

  const steps = [
    {
      id: 'instituteType',
      question: 'What type of institution do you represent?',
      type: 'single',
      options: [
        { value: 'Higher Education', label: 'Higher Education' },
        { value: 'K12-school', label: 'K12 School' },
        { value: 'Corporate Training', label: 'Corporate Training' },
        { value: 'Other', label: 'Other' }
      ]
    },
    {
      id: 'assessmentType',
      question: 'How do you usually conduct evaluations or exams?',
      type: 'single',
      options: [
        { value: 'Multiple Choice', label: 'Multiple Choice' },
        { value: 'Essay/Written Response', label: 'Essay/Written Response' },
        { value: 'Open Book', label: 'Open Book' },
        { value: 'Project Based', label: 'Project Based' },
        { value: 'Mixed Format', label: 'Mixed Format' }
      ]
    },
    {
      id: 'organizationSize',
      question: 'How many candidates usually take the exam at once?',
      type: 'single',
      options: [
        { value: 'Small (Less than 50)', label: 'Small (Less than 50)' },
        { value: 'Medium (50-200)', label: 'Medium (50-200)' },
        { value: 'Large (200-500)', label: 'Large (200-500)' },
        { value: 'Massive (500+)', label: 'Massive (500+)' }
      ]
    },
    {
      id: 'examFrequency',
      question: 'How often do you conduct exams?',
      type: 'single',
      options: [
        { value: 'Daily', label: 'Daily' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Monthly', label: 'Monthly' },
        { value: 'Termly', label: 'Once per Term / Semester' },
        { value: 'Yearly', label: 'Yearly' }
      ]
    },
    {
      id: 'techRequirements',
      question: 'What kind of tech setup do you have?',
      type: 'single',
      options: [
        { value: 'Minimal', label: 'Minimal (Basic computers/internet)' },
        { value: 'Standard', label: 'Standard (Reliable internet, webcams)' },
        { value: 'Advanced', label: 'Advanced (High-speed internet, multiple cameras)' }
      ]
      
    },
    {
      id: 'budget',
      question: "What's your budget per candidate per exam?",
      type: 'single',
      options: [
        { value: 'Low', label: 'Low ($0–$5)' },
        { value: 'Medium', label: 'Medium ($5–$15)' },
        { value: 'High', label: 'High ($15+)' }
      ]
    },
    {
      id: 'concerns',
      question: 'What are your biggest concerns during online exams? (Select all that apply)',
      type: 'multiple',
      options: [
        { value: 'Student Impersonation', label: 'Student Impersonation' },
        { value: 'Unauthorized Resources', label: 'Unauthorized Resources' },
        { value: 'Student Collusion', label: 'Student Collusion' },
        { value: 'AI Tool Usage', label: 'AI Tool Usage' },
        { value: 'Student Privacy', label: 'Student Privacy' }
      ]
    }
  ];

  const calculatescore = () => {
    let score = 50;

    if (formdata.assessmentType === 'Multiple Choice') score += 10;
    if (formdata.assessmentType === 'Essay/Written Response') score += 5;
    if (formdata.assessmentType === 'Open Book') score -= 5;
    if (formdata.organizationSize === 'Small (Less than 50)') score += 10;
    if (formdata.organizationSize === 'Massive (500+)') score -= 10;
    if (formdata.techRequirements === 'Minimal') score -= 5;
    if (formdata.techRequirements === 'Advanced') score += 10;
    if (formdata.budget === 'Low') score -= 10;
    if (formdata.budget === 'High') score += 15;
    score -= (formdata.concerns.length * 3);
    if (formdata.examFrequency === 'Daily') score -= 5;
    if (formdata.examFrequency === 'Yearly') score += 5;
    return score;
  };

  const handleOptionClick = (stepId: string, option: any) => {
    if (steps[currentStep].type === 'multiple') {
      if (stepId === 'concerns') {
        const newConcerns = formdata.concerns.includes(option.value as SecurityConcern)
          ? formdata.concerns.filter(c => c !== option.value)
          : [...formdata.concerns, option.value as SecurityConcern];
        setFormdata({ ...formdata, [stepId]: newConcerns });
      }
    } else {
      setFormdata({ ...formdata, [stepId]: option.value });
      setCurrentStep(currentStep + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1 && isStepComplete()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Validate all required fields
    if (!formdata.assessmentType || !formdata.budget || !formdata.examFrequency || 
        !formdata.instituteType || !formdata.organizationSize || !formdata.techRequirements) {
      console.log('Please fill all required fields');
      return;
    }
    setShowpopup(true);
  };

  const handleemailsubmit = async () => {
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || !email.trim()) {
    toast.error('Please enter an email address', {
        id: 'email-required', 
      });
    return;
  }
  
  if (!emailRegex.test(email.trim())) {
     toast.error('Please enter a valid email address', {
        id: 'email-invalid',
      });
    return;
  }

  try{
    let score = calculatescore();
    
    await addData({
      variables: {
        email: email.trim(),
        budget: formdata.budget,
        frequency: formdata.examFrequency,
        Total_students: formdata.organizationSize
      }
    });
    setShowpopup(false);
    navigate('/report', { state: { score: score } });}
    catch(error){
      toast.error('An error occurred while submitting. Please try again.', {
        id: 'submit-error',
      });
    }
  }; 

  const isStepComplete = () => {
    const step = steps[currentStep];
    const answer = formdata[step.id as keyof FormType];
    return step.type === 'multiple' ? (Array.isArray(answer) && answer.length > 0) : !!answer;
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    
    <div className="relative p-4 sm:p-6 md:p-8 lg:p-10">
     
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
           
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        
         <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 min-h-[50vh]">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center">
            Proctoring Readiness Assessment
          </h2>
          
         
          <div className="mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-6 text-center px-2">
              {currentStepData.question}
            </h3>

          
            {currentStepData.type === 'multiple' && (
              <div className="mb-4 sm:mb-6 text-center">
                <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-100 rounded-full">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 mr-2" />
                  <span className="text-blue-700 font-medium text-xs sm:text-sm">Multiple selections allowed</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto">
              {currentStepData.options.map((option, index) => {
                const isSelected = currentStepData.type === 'multiple' 
                  ? formdata.concerns.includes(option.value as SecurityConcern)
                  : formdata[currentStepData.id as keyof FormType] === option.value;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(currentStepData.id, option)}
                    className={`p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 text-left transform hover:scale-[1.02] hover:shadow-lg cursor-pointer ${
                      isSelected
                        ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 shadow-md'
                        : 'border-gray-200 bg-gradient-to-r from-gray-50 to-white text-gray-700 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-25 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm sm:text-base pr-2">{option.label}</span>
                      <div className="flex items-center flex-shrink-0">
                        {currentStepData.type === 'multiple' && (
                          <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded border-2 mr-2 flex items-center justify-center ${
                            isSelected 
                              ? 'bg-blue-600 border-blue-600' 
                              : 'border-gray-300'
                          }`}>
                            {isSelected && <Check className="w-2 h-2 sm:w-3 sm:h-3 text-white" />}
                          </div>
                        )}
                        {isSelected && currentStepData.type === 'single' && (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-600 rounded-full flex items-center justify-center">
                            <Check className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

         
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </button>

            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!isStepComplete()}
                className={`flex items-center px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                  isStepComplete()
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span className="hidden sm:inline">Analyze Readiness</span>
                <span className="sm:hidden">Analyze</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!isStepComplete()}
                className={`flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                  isStepComplete()
                   ?'bg-blue-600 text-white hover:bg-blue-700 shadow-lg cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    // :'bg-blue-600 text-white hover:bg-blue-700 shadow-lg cursor-not-allowed'
                }`}
              >
                Next
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
              </button>
            )}
          </div>

        </div>

       
        <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 space-x-2 pb-4 sm:pb-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                index < currentStep
                  ? 'bg-blue-600'
                  : index === currentStep
                  ? 'bg-blue-400'
                  : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>

     
      {showpopup && (
        <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md mx-4 border border-gray-200">
            <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-2 text-center">
              Enter your email for Proctoring Readiness Report
            </h2>
            <div className="mb-6">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter Business Email"
                className="w-full border border-gray-300 rounded-lg p-3 sm:p-4 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white text-sm sm:text-base"
              />
            </div>

            <div className="flex flex-col space-y-3">
              <button
                onClick={handleemailsubmit}
                disabled={loading}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-4 rounded cursor-pointer text-sm sm:text-base ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
              <button
                onClick={() => setShowpopup(false)}
                className="w-full bg-white text-gray-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-200 cursor-pointer text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};