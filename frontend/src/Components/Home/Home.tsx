
import React from 'react';
import { Formcomponent } from '../Form/Form';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import type { FormType } from '../Form/Form';

interface HomeProps {
  formdata: FormType;
  setFormdata: React.Dispatch<React.SetStateAction<FormType>>;
}

export const Home: React.FC<HomeProps> = ({ formdata, setFormdata }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="shadow-md bg-white">
        <Header />
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
         
          <Formcomponent formdata={formdata} setFormdata={setFormdata} />
        </div>
      </main>

     
        <div className="container">
          <Footer />
        </div>
      
    </div>
  );
};
