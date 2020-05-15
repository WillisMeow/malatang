import React from 'react';
import './App.css';
import Layout from './Layout/Layout';
import MalaBuilder from './Components/MalaBuilder/MalaBuilder';

function App() {
  return (
    <div>
      <Layout>
        <MalaBuilder/> {/* Comment */}
      </Layout>
    </div>
  );
}

export default App;