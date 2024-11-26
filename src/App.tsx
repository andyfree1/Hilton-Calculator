import React from 'react';
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-hilton-blue text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-walbaum">Hilton Honors Travel & Savings</h1>
        </div>
      </header>
      <Calculator />
    </div>
  );
}

export default App;