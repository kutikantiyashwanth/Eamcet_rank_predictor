import React from 'react';
import './Instructions.css';

const Instructions = () => {
  return (
    <div className="instructions">
      <h3>How to Use</h3>
      <ol>
        <li>Enter your subject marks (out of 100 for each subject)</li>
        <li>Select your stream (MPC currently supported)</li>
        <li>Click "Predict Rank" to get your approximate rank</li>
        <li>Compare with historical trends for better understanding</li>
      </ol>
      
      <div className="calculation-method">
        <h4>Calculation Method</h4>
        <p>The prediction is based on:</p>
        <ul>
          <li>Previous year rank vs marks data</li>
          <li>Normalization across subjects</li>
          <li>Statistical analysis of trends</li>
          <li>Competition level adjustments</li>
        </ul>
      </div>
    </div>
  );
};

export default Instructions;