import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import App from './App';
import CatDetails from './components/CatDetails';

const Routes = () => (
  <Router>
  <div>
    <Route exact path="/" component={App}/>
    <Route exact path="/cat" component={CatDetails} />
  </div>
  </Router>
)

export default Routes;
