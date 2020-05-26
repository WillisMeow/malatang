import React from 'react';
import './App.css';
import Layout from './Layout/Layout';
import MalaBuilder from './Components/MalaBuilder/MalaBuilder';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/orders' render={()=> <h1>Orders Page</h1>} />
          <Route path='/' exact component={MalaBuilder} />
        </Switch>
          
        </Layout>
    </BrowserRouter>
      
    </div>
  );
}

export default App;