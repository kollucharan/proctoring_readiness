


import type { FormType } from '../Form/Form'

interface DetailsProps {
  formdata: FormType;
}

export const Details = ({ formdata }: DetailsProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
    
      
      
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        
        <div className="space-y-2">
          <div className="text-sm font-bold text-gray-800 uppercase tracking-wide">
            Institution Type
          </div>
          <div className="text-xl  text-gray-600">
            {formdata.instituteType}
          </div>
        </div>

        {/* Student Count */}
        <div className="space-y-2">
          <div className="text-sm font-bold text-gray-800 uppercase tracking-wide">
            Student Count
          </div>
          <div className="text-xl  text-gray-600">
            {formdata.organizationSize}
          </div>
        </div>

        {/* Assessment Format */}
        <div className="space-y-2">
          <div className="text-sm font-bold text-gray-800 uppercase tracking-wide">
            Assessment Format
          </div>
          <div className="text-xl  text-gray-600" >
            {formdata.assessmentType}
          </div>
        </div>

        {/* Exam Frequency */}
        <div className="space-y-2">
          <div className="text-sm font-bold text-gray-800 uppercase tracking-wide">
            Exam Frequency
          </div>
          <div className="text-xl  text-gray-600" >
            {formdata.examFrequency}
          </div>
        </div>

        {/* Security Concerns */}
        <div className="space-y-2">
          <div className="text-sm font-bold text-gray-800 uppercase tracking-wide">
            Security Concerns
          </div>
          <div className="text-xl  text-gray-600" >
            {formdata.concerns.length} Identified
          </div>
        </div>

        {/* Technical Capacity */}
        <div className="space-y-2">
          <div className="text-sm font-bold text-gray-800 uppercase tracking-wide">
            Technical Capacity
          </div>
          <div className="text-xl  text-gray-600" >
            {formdata.techRequirements}
          </div>
        </div>

        
        <div className="space-y-2">
          <div className="text-sm font-bold text-gray-800 uppercase tracking-wide">
            Available Budget
          </div>
          <div className="text-xl  text-gray-600" >
            {formdata.budget}
          </div>
        </div>
      </div>
    </div>
  )
}