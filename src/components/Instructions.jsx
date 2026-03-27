import React from 'react';
import './Instructions.css';

const Instructions = () => {
  const steps = [
    'Enter your subject marks (out of 100 for each subject)',
    'Select the comparison year using the year pills',
    'Click "Predict Rank" to get your approximate rank',
    'Compare with historical trends and bar chart for insights',
  ];

  return (
    <div className="instructions">
      <h3>How to Use</h3>
      <ol className="steps-list">
        {steps.map((step, i) => (
          <li key={i} className="step-item">
            <span className="step-number">{i + 1}</span>
            <span className="step-text">{step}</span>
          </li>
        ))}
      </ol>

      <div className="calculation-method">
        <h4>Calculation Method</h4>
        <p>The prediction is based on:</p>
        <ul className="method-list">
          <li>Previous year rank vs marks data (2022–2025)</li>
          <li>Normalization across subjects</li>
          <li>Statistical analysis of trends</li>
          <li>Competition level adjustments per year</li>
          <li>Subject weightage considerations</li>
        </ul>
      </div>
    </div>
  );
};

export default Instructions;