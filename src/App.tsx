import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';

class App extends Component {
  public render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo'/>
          <h1 className='App-title'>Welcome to React</h1>
        </header>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to='player'>landing page</Link>
      </div>
    );
  }
}

export default App;
