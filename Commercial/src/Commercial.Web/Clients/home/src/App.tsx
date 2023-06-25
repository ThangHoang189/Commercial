import React from 'react';
import logo from './logo.svg';
import './App.css';
import GoldPrice from './service/goldPriceService';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GoldPrice />
      </header>
    </div>
  );
}

export default App;
