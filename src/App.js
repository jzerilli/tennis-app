import React from 'react';
// import './App.css';

import MatchInput from './components/MatchInput'


function App() {
  return (
    <div className = "background">
      <h1 className = "header">Tennis Match Predictor</h1>
      <MatchInput/>
      <footer className = "footer">
        <p>Created by Jack Zerilli</p>
        <a href="">
        Website Source Code</a>
        <br>
        </br>
        <a href="https://github.com/jzerilli/tennis-api">
        Backend Source Code</a>
      </footer>
    </div>
  );
}

export default App;
