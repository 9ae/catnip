import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SwipeCompo from './SwipeCompo';
import TinderLayout from './components/TinderLayout.js';

class App extends Component {
  render() {
    return (
      <div className="App">
      <TinderLayout />
      </div>
    );
  }
}

export default App;
