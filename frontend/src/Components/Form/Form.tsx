
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { gql, useMutation } from "@apollo/client";

 export type SecurityConcern = 'Student Impersonation' | 'Unauthorized Resources'| 'Student Collusion'| 'AI Tool Usage';
  export interface FormType {
  instituteType: 'K12-school' | 'Higher Education' | 'Corporate Training' | 'Other' | '';
  assessmentType: 'Multiple Choice' | 'Essay/Written Response' | 'Open Book' | 'Project Based' | 'Mixed Format' | '';
  organizationSize: 'Small (Less than 50)' | 'Medium (50-200)' | 'Large (200-500)' | 'Massive (500+)' | '';
  examFrequency: 'daily' | 'weekly' | 'monthly' | 'termly' | 'yearly' | '';
  techRequirements: 'minimal' | 'standard' | 'advanced' | '';
  budget: 'low' | 'medium' | 'high' | '';
  concerns : SecurityConcern[] ;
}
const arrs = [
  'Student Impersonation',
  'Unauthorized Resources',
  'Student Collusion',
  'AI Tool Usage',
  'Student Privacy'
];
 interface FormProps {
  formdata: FormType;
  setFormdata: React.Dispatch<React.SetStateAction<FormType>>;
}
 
const UPDATE_DATA =gql `   
mutation InsertFormResponse($email: String!, $budget: String!, $frequency: String!, $Total_students: String!) {
  insert_user_details_one(object: {email: $email, budget: $budget, frequency: $frequency, Total_students: $Total_students}) {
    id
  }
}
`
 export const Formcomponent =({formdata,setFormdata}:FormProps) =>{
    const [showpopup,setShowpopup]=useState<Boolean>(false);
    const [email, setEmail] = useState('');
    const [addData,{loading}] =useMutation(UPDATE_DATA)
    const navigate =useNavigate();
    const calculatescore =()=>{
     let score = 50;

  if (formdata.assessmentType === 'Multiple Choice') score += 10;
  if (formdata.assessmentType === 'Essay/Written Response') score += 5;
  if (formdata.assessmentType === 'Open Book') score -= 5;
  if (formdata.organizationSize === 'Small (Less than 50)') score += 10;
  if (formdata.organizationSize === 'Massive (500+)') score -= 10;
  if (formdata.techRequirements === 'minimal') score -= 5;
  if (formdata.techRequirements === 'advanced') score += 10;
  if (formdata.budget === 'low') score -= 10;
  if (formdata.budget === 'high') score += 15;
  score -= (formdata.concerns.length * 3);
  if (formdata.examFrequency === 'daily') score -= 5;
  if (formdata.examFrequency === 'yearly') score += 5;
  return score;
    }

    const handleformchange =(e:any)=>{
   
       setFormdata(
        prev=>({
            ...prev,
            [e.target.id]:e.target.value
        })    
       )
    }
    const handleemailsubmit = async ()=>{
    let re= calculatescore ();
   
     await addData({
        variables:{
            email:email,
            budget:formdata.budget,
            frequency:formdata.examFrequency,
            Total_students:formdata.organizationSize
        }
         })
     setShowpopup(false);
   navigate('/report', { state: { score: re } });

    }
    const handlesubmit =(e:any) =>{
        e.preventDefault();
  
        if(!formdata.assessmentType||!formdata.budget||!formdata.examFrequency||!formdata.instituteType||!formdata.organizationSize||!formdata.techRequirements)
          {
            console.log('fill all the things');
            return ;
          }
          setShowpopup(true);
    }

 const handlecheck = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value as SecurityConcern;

  setFormdata((prev) => {
    const alreadySelected = prev.concerns.includes(value);
    return {
      ...prev,
      concerns: alreadySelected
        ? prev.concerns.filter((item) => item !== value)
        : [...prev.concerns, value],
    };
  });
};

return (
  <>
   <div className="relative">
    <form
      onSubmit={handlesubmit}
      className="max-w-2xl mx-auto bg-white shadow-md rounded-md px-4 sm:px-6 py-6 space-y-6"
    >
         <h2 className="text-2xl font-semibold text-gray-800 text-center">
      Proctoring Readiness Assessment
    </h2>
      <div>
        <label htmlFor="instituteType" className="block text-sm font-medium text-gray-700 mb-1">
           What type of institution do you represent ?
        </label>
        <select
          id="instituteType"
          value={formdata.instituteType}
          onChange={handleformchange}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose your institution type</option>
          <option value="Higher Education">Higher Education</option>
          <option value="K12-school">K12-school</option>
          <option value="Corporate Training">Corporate Training</option>
          <option value="Other">Other</option>
        </select>
      </div>

     
      <div>
        <label htmlFor="assessmentType" className="block text-sm font-medium text-gray-700 mb-1">
           How do you usually conduct evaluations or exams ?
        </label>
        <select
          id="assessmentType"
          value={formdata.assessmentType}
          onChange={handleformchange}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select assessment format</option>
          <option value="Multiple Choice">Multiple Choice</option>
          <option value="Essay/Written Response">Essay/Written Response</option>
          <option value="Open Book">Open Book</option>
          <option value="Project Based">Project Based</option>
          <option value="Mixed Format">Mixed Format</option>
        </select>
      </div>

     
      <div>
        <label htmlFor="organizationSize" className="block text-sm font-medium text-gray-700 mb-1">
          How many candidates usually take the exam at once?
        </label>
        <select
          id="organizationSize"
          value={formdata.organizationSize}
          onChange={handleformchange}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select the appropriate range</option>
          <option value="Small (Less than 50)">Small (Less than 50)</option>
          <option value="Medium (50-200)">Medium (50-200)</option>
          <option value="Large (200-500)">Large (200-500)</option>
          <option value="Massive (500+)">Massive (500+)</option>
        </select>
      </div>

  
      <div>
        <label htmlFor="examFrequency" className="block text-sm font-medium text-gray-700 mb-1">
          How often do you conduct exams?
        </label>
        <select
          id="examFrequency"
          value={formdata.examFrequency}
          onChange={handleformchange}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose frequency</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Termly">Once per Term / Semester</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>

    
      <div>
        <label htmlFor="techRequirements" className="block text-sm font-medium text-gray-700 mb-1">
           What kind of tech setup do you have?
        </label>
        <select
          id="techRequirements"
          value={formdata.techRequirements}
          onChange={handleformchange}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose your tech level</option>
          <option value="Minimal">Minimal (Basic computers/internet)</option>
          <option value="Standard">Standard (Reliable internet, webcams)</option>
          <option value="Advanced">Advanced (High-speed internet, multiple cameras)</option>
        </select>
      </div>

     
      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
          What’s your budget per candidate per exam?
        </label>
        <select
          id="budget"
          value={formdata.budget}
          onChange={handleformchange}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a budget range</option>
          <option value="Low">Low ($0–$5)</option>
          <option value="Medium">Medium ($5–$15)</option>
          <option value="High">High ($15+)</option>
        </select>
      </div>

      
      <div>
        <label htmlFor="concerns" className="block text-sm font-medium text-gray-700 mb-2">
           What are your biggest concerns during online exams?<span className="text-gray-500">(Select all that apply)</span>
        </label>
        <div className="space-y-2">
          {arrs.map((arr) => (
            <div key={arr} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={arr}
                checked={formdata.concerns.includes(arr as SecurityConcern)}
                onChange={handlecheck}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700">{arr}</label>
            </div>
          ))}
        </div>
      </div>

     
      <div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          Analyze Readiness
        </button>
      </div>
    </form>
{showpopup && (
  <div className="fixed inset-0  bg-[#00000080]  flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
        Enter your email for Proctoring Readiness Report
      </h2> 
    <div className="mb-6">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter Business Email"
          className="w-full border border-gray-300 rounded-lg p-4 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
        />
      </div>
      
      <div className="flex flex-col space-y-3">
        
        <button
  onClick={handleemailsubmit}
  disabled={loading}
  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded ${
    loading ? 'opacity-50 cursor-not-allowed' : ''
  }`}
>
  {loading ? 'Submitting...' : 'Submit'}
</button>
        <button
          onClick={() => setShowpopup(false)}
          className="w-full bg-white text-gray-600 px-6 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
 </div>
 
  </>
);


}