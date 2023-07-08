import React from 'react';
import './App.css';
import GoldPrice from './services/goldPriceService';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GoldPrice />
      </header>
    </div>
  );
}

export default App;
