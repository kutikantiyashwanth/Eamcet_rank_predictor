import React, { useState } from 'react';
import './App.css';
import RankCalculator from './components/RankCalculator';
import RankTrends from './components/RankTrends';
import Instructions from './components/Instructions';

function App() {
  const [predictedRank, setPredictedRank] = useState(null);
  const [yearData, setYearData] = useState(2024);

  const handleRankPrediction = (rank) => {
    setPredictedRank(rank);
  };

  const handleYearChange = (e) => {
    setYearData(Number(e.target.value));
    setPredictedRank(null); // Reset prediction on year change
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>EAMCET Rank Predictor</h1>
        <p>Predict your rank based on subject marks and previous year trends</p>
      </header>

      <div className="app-container">
        <div className="main-content">
          <RankCalculator 
            onPredict={handleRankPrediction} 
            year={yearData}
            onYearChange={handleYearChange}
          />
          {predictedRank && (
            <div className="prediction-result">
              <h3>Predicted Rank: <span className="rank-value">{predictedRank.toLocaleString()}</span></h3>
              <p className="disclaimer">
                *Note: This is an approximate prediction based on previous year trends. 
                Actual rank may vary based on overall competition and marking patterns.
              </p>
            </div>
          )}
          <RankTrends year={yearData} />
        </div>
        <div className="sidebar">
          <Instructions />
          <div className="additional-info">
            <h3>Important Notes</h3>
            <ul>
              <li>Based on 2023-2025 EAMCET patterns</li>
              <li>Includes normalization process</li>
              <li>Considers subject weightage</li>
              <li>Updated with latest trends</li>
            </ul>
          </div>
        </div>
      </div>
      <footer className="app-footer">
        <p>© 2024 EAMCET Rank Predictor. For educational purposes only.</p>
        <p>This tool provides approximate predictions and should not be considered as final.</p>
      </footer>
    </div>
  );
}

export default App;