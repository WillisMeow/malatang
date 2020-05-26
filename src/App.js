import React from 'react';
import './App.css';
import Layout from './Layout/Layout';
import MalaBuilder from './Components/MalaBuilder/MalaBuilder';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ContactDetails from './Components/ContactDetails/ContactDetails';
import Orders from './Components/Orders/Orders';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/contactDetails' component={ContactDetails} />
          <Route path='/orders' component={Orders} />
          <Route path='/' exact component={MalaBuilder} />
        </Switch>
          
        </Layout>
    </BrowserRouter>
      
    </div>
  );
}

export default App;