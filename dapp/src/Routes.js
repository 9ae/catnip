import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import App from './App';
import CatDetails from './components/CatDetails';
import Landing from './components/Landing';
import Test from  './components/test'
import Matches from './components/Matches';

const Routes = () => (
  <Router>
  <div>
    <Route exact path="/" component={Landing}/>
    <Route exact path="/landing" component={App}/>
    <Route exact path="/cat" component={CatDetails} />
    <Route exact path="/matches" component={Matches} />
    
  </div>
  </Router>
)

export default Routes;
