import React from 'react';
import './App.css';
import CountryList from './CountryList';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Countries</h1>
      </header>
      <main>
        <CountryList />
      </main>
    </div>
  );
};

export default App;
