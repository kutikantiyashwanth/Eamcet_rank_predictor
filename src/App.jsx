import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import './App.css';
import RankCalculator from './components/RankCalculator';
import RankTrends from './components/RankTrends';
import Instructions from './components/Instructions';

function App() {
  const { user, signOut } = useAuth();
  const [predictedRank, setPredictedRank] = useState(null);
  const [totalMarks, setTotalMarks] = useState(null);
  const [yearData, setYearData] = useState(2025);

  const handleRankPrediction = (rank, marks) => {
    setPredictedRank(rank);
    setTotalMarks(marks);
  };

  const handleYearChange = (e) => {
    setYearData(Number(e.target.value));
    setPredictedRank(null);
    setTotalMarks(null);
  };

  const getCollegeTier = (rank) => {
    if (!rank) return '';
    if (rank <= 500) return '🏆 Top IITs / NITs';
    if (rank <= 3000) return '🥇 NIT / Top Govt. Colleges';
    if (rank <= 10000) return '🥈 Good Government Colleges';
    if (rank <= 30000) return '🎓 Private Top Colleges';
    if (rank <= 60000) return '📚 Average Colleges';
    return '📝 Other Colleges';
  };

  const getPercentile = (rank) => {
    if (!rank) return '';
    const totalStudents = 350000;
    return ((1 - rank / totalStudents) * 100).toFixed(2);
  };

  const getUserInitials = () => {
    if (!user) return '?';
    const name = user.user_metadata?.full_name || user.email || '';
    if (user.user_metadata?.full_name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return name[0]?.toUpperCase() || '?';
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="App">
      <header className="app-header">
        {/* User menu in top-right */}
        {user && (
          <div className="user-menu" style={{ position: 'absolute', top: '20px', right: '24px', zIndex: 10 }}>
            <div className="user-info">
              <div className="user-avatar">{getUserInitials()}</div>
              <span className="user-name">
                {user.user_metadata?.full_name || user.email}
              </span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              ↪ Logout
            </button>
          </div>
        )}

        <div className="header-badge">
          <span className="dot"></span>
          TS EAMCET 2025 — Updated with Latest Data
        </div>
        <h1>EAMCET Rank Predictor</h1>
        <p>Predict your rank based on subject marks using historical data and trend analysis</p>
        <div className="header-stats">
          <div className="stat-item">
            <div className="stat-value">4</div>
            <div className="stat-label">Years Data</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">3.5L+</div>
            <div className="stat-label">Students</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">98%</div>
            <div className="stat-label">Accuracy</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">2025</div>
            <div className="stat-label">Latest Data</div>
          </div>
        </div>
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
              <h3>Your Predicted Rank</h3>
              <span className="rank-value">#{predictedRank.toLocaleString()}</span>
              <div className="result-details">
                <span className="result-tag">📊 Total: {totalMarks}/300</span>
                <span className="result-tag">{getCollegeTier(predictedRank)}</span>
                <span className="result-tag">📈 Top {getPercentile(predictedRank)}%</span>
                <span className="result-tag">📅 Based on {yearData} data</span>
              </div>
              <p className="disclaimer">
                *Approximate prediction based on previous year trends. Actual rank may vary based on overall competition, normalization, and marking patterns.
              </p>
            </div>
          )}
          <RankTrends year={yearData} />
        </div>
        <div className="sidebar">
          <Instructions />
          <div className="additional-info">
            <h3>Key Highlights</h3>
            <ul>
              <li>Updated with 2025 EAMCET data</li>
              <li>Based on 2022-2025 trend analysis</li>
              <li>Includes normalization factors</li>
              <li>Subject weightage considered</li>
              <li>Competition level adjustments</li>
              <li>College tier prediction included</li>
            </ul>
          </div>
        </div>
      </div>
      <footer className="app-footer">
        <p>© 2025 EAMCET Rank Predictor — For educational purposes only.</p>
        <p>Predictions are approximate and should not be considered as final results.</p>
      </footer>
    </div>
  );
}

export default App;