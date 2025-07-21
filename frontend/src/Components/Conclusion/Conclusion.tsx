
interface Conclusionprop{
  score:number,
  budget :recom;
 
}
 type recom ='low' | 'medium' | 'high' |'';
 type recom2= 'Lockdown Browser + Periodic Monitoring'|'AI-Agent Proctoring Solution'|'Live Proctoring'

interface Typeinterface {
low :recom2,
medium:recom2,
 high:recom2

}
  
 const test:Typeinterface  ={
    low:'Lockdown Browser + Periodic Monitoring',
     medium:'AI-Agent Proctoring Solution',
     high:'Live Proctoring'
 }


export const Conclusion =({score,budget}:Conclusionprop)=>{

   const getReadinessDescription = (score: number) => {
    if (score >= 80) {
      return "demonstrates excellent readiness for implementing online proctoring solutions with minimal areas for improvement";
    } else if (score >= 60) {
      return "demonstrates good readiness for implementing online proctoring solutions with some areas for improvement";
    } else  {
      return "demonstrates moderate readiness for implementing online proctoring solutions with several areas requiring attention";
    } 

   
    
  };

  let recommendation = '';
  if (budget === 'low' || budget === 'medium' || budget === 'high') {
    recommendation = test[budget];
  }

    return (<div>
    { ` Based on our comprehensive analysis, your institution ${getReadinessDescription(score)}, with a readiness score of ${score}. The recommended ${recommendation} aligns well with your institution's profile, addressing the identified security concerns while staying within budget constraints.
We recommend beginning with a pilot implementation to test the solution's effectiveness and gather feedback before full-scale deployment. This approach will help identify any technical or procedural issues early in the process and allow for adjustments before broader implementation.
The success of any proctoring solution will depend not only on the technology itself but also on clear communication, comprehensive training, and well-defined policies. We encourage your institution to develop a detailed implementation plan that addresses these critical factors.`}
    </div>)
}