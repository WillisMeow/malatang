import React, { Component } from 'react';
import './App.css';
import Layout from './Layout/Layout';
import MalaBuilder from './Components/MalaBuilder/MalaBuilder';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ContactDetails from './Components/ContactDetails/ContactDetails';
import Orders from './Components/Orders/Orders';
import Auth from './Components/Auth/Auth';
import Logout from './Components/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/index';

class App extends Component {
  componentDidMount () {
    this.props.tryAuthUser()
  }

  render () {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' exact component={MalaBuilder} />
        <Redirect to="/" />
      </Switch>
    )
    if (this.props.authorised) {
      routes = (
        <Switch>
          <Route path='/contactDetails' component={ContactDetails} />
          <Route path='/auth' component={Auth} /> {/* Auth component is required, so that we can correctly redirect after succesfully logging in */}        
          <Route path='/orders' component={Orders} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={MalaBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div>
        <BrowserRouter>
          <Layout>
            {routes}
          </Layout>
      </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authorised: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tryAuthUser: () => dispatch(actionCreators.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);