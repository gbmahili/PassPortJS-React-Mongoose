import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';
export default class App extends Component {
  render() {
    return (
      <div style={{
        display:'flex', 
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        backgroundColor:'#fafafa',
        height:'100%'
        }}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </Router>
      </div>
    )
  }
};