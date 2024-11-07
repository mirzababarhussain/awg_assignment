import React, { useState } from 'react';
import Login from './components/Login';
import PerformanceTestForm from './components/PerformanceTestForm';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [token, setToken] = useState(null);
  const [performanceScore, setPerformanceScore] = useState(null);

  return (
    <div className="App">
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <div className="container mx-auto p-4">
          <h1 className="text-center text-3xl font-bold mb-8">Website Performance Checker</h1>
          <PerformanceTestForm token={token} setPerformanceScore={setPerformanceScore} />
          <ResultDisplay performanceScore={performanceScore} />
        </div>
      )}
    </div>
  );
}

export default App;
