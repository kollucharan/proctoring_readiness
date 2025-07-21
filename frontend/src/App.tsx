
import './App.css'
import './index.css'
import { useState } from 'react';
import { Home } from './Components/Home/Home'
import { Report } from './Components/Report/Report';
import {BrowserRouter ,Routes ,Route} from 'react-router-dom'
import  type { FormType} from './Components/Form/Form'

function App() {
   const [formdata ,setFormdata] = useState<FormType>({
           instituteType:'',
            assessmentType:'',
            organizationSize:'',
            examFrequency:'',
            techRequirements:'',
              budget:'',
              concerns :[],
  
      }); 

  return (
    <>  
   <BrowserRouter>
   <Routes>

 <Route path='/' element ={<Home formdata={formdata} setFormdata={setFormdata}/> } />
  <Route path='/report' element ={<Report formdata={formdata}/>} />

   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
