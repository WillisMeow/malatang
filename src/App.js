import React from 'react';
import './App.css';
import Layout from './Layout/Layout';
import MalaBuilder from './Components/MalaBuilder/MalaBuilder';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Layout>
          <MalaBuilder/> {/* Comment */}
        </Layout>
    </BrowserRouter>
      
    </div>
  );
}

export default App;