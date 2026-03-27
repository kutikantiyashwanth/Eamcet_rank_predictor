import React from 'react';
import './RankTrends.css';

const RankTrends = ({ year }) => {
  const trendsData = {
    2025: [
      { marks: 300, rank: 1 },
      { marks: 290, rank: 350 },
      { marks: 280, rank: 1200 },
      { marks: 270, rank: 2800 },
      { marks: 260, rank: 6000 },
      { marks: 250, rank: 12000 },
      { marks: 240, rank: 19500 },
      { marks: 230, rank: 32000 },
      { marks: 220, rank: 48000 },
      { marks: 210, rank: 70000 },
      { marks: 200, rank: 95000 },
      { marks: 180, rank: 140000 },
      { marks: 160, rank: 200000 },
    ],
    2024: [
      { marks: 300, rank: 1 },
      { marks: 290, rank: 500 },
      { marks: 280, rank: 1500 },
      { marks: 270, rank: 3500 },
      { marks: 260, rank: 7500 },
      { marks: 250, rank: 15000 },
      { marks: 240, rank: 25000 },
      { marks: 230, rank: 40000 },
      { marks: 220, rank: 60000 },
      { marks: 210, rank: 85000 },
      { marks: 200, rank: 110000 },
      { marks: 180, rank: 160000 },
      { marks: 160, rank: 220000 },
    ],
    2023: [
      { marks: 300, rank: 1 },
      { marks: 290, rank: 450 },
      { marks: 280, rank: 1400 },
      { marks: 270, rank: 3200 },
      { marks: 260, rank: 7000 },
      { marks: 250, rank: 14000 },
      { marks: 240, rank: 23000 },
      { marks: 230, rank: 38000 },
      { marks: 220, rank: 58000 },
      { marks: 210, rank: 82000 },
      { marks: 200, rank: 105000 },
      { marks: 180, rank: 150000 },
      { marks: 160, rank: 210000 },
    ],
    2022: [
      { marks: 300, rank: 1 },
      { marks: 290, rank: 520 },
      { marks: 280, rank: 1600 },
      { marks: 270, rank: 3800 },
      { marks: 260, rank: 8000 },
      { marks: 250, rank: 16000 },
      { marks: 240, rank: 27000 },
      { marks: 230, rank: 42000 },
      { marks: 220, rank: 62000 },
      { marks: 210, rank: 88000 },
      { marks: 200, rank: 115000 },
      { marks: 180, rank: 165000 },
      { marks: 160, rank: 230000 },
    ],
  };

  const currentYearData = trendsData[year] || trendsData[2025];

  const getTier = (marks) => {
    if (marks >= 280) return { label: 'Top IITs/NITs', className: 'tier-top', emoji: '🏆' };
    if (marks >= 250) return { label: 'Govt. Colleges', className: 'tier-good', emoji: '🥇' };
    if (marks >= 220) return { label: 'Top Private', className: 'tier-mid', emoji: '🎓' };
    if (marks >= 200) return { label: 'Avg. Private', className: 'tier-avg', emoji: '📚' };
    return { label: 'Other', className: 'tier-other', emoji: '📝' };
  };

  // For bar chart: take a subset for visualization
  const chartData = currentYearData.filter(d => d.marks >= 200);
  const maxRank = Math.max(...chartData.map(d => d.rank));

  return (
    <div className="rank-trends">
      <div className="trends-header">
        <h3>📊 Historical Rank Trends</h3>
        <span className="year-badge">{year}</span>
      </div>

      <div className="trends-table-container">
        <table className="trends-table">
          <thead>
            <tr>
              <th>Total Marks</th>
              <th>Approx. Rank</th>
              <th>College Tier</th>
            </tr>
          </thead>
          <tbody>
            {currentYearData.map((item, index) => {
              const tier = getTier(item.marks);
              return (
                <tr key={index}>
                  <td className="marks-cell">{item.marks} / 300</td>
                  <td className="rank-cell">#{item.rank.toLocaleString()}</td>
                  <td>
                    <span className={`tier-badge ${tier.className}`}>
                      {tier.emoji} {tier.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mini bar chart */}
      <div className="chart-container">
        <div className="chart-title">📈 Marks vs Rank Distribution</div>
        <div className="bar-chart">
          {chartData.map((item, i) => {
            const widthPct = Math.max(5, (item.rank / maxRank) * 100);
            const hue = 250 - (i * 15); // purple to cyan gradient
            return (
              <div className="bar-row" key={item.marks}>
                <span className="bar-label">{item.marks}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${widthPct}%`,
                      background: `linear-gradient(90deg, hsl(${hue}, 70%, 55%), hsl(${hue - 20}, 70%, 65%))`,
                      animationDelay: `${i * 0.05}s`,
                    }}
                  >
                    <span className="bar-value">{item.rank.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="trends-info">
        <span className="info-icon">⚠️</span>
        <p>
          <strong>Note:</strong> These are approximate ranks based on previous year data for TS EAMCET. 
          Actual ranks may vary based on overall competition, normalization, and paper difficulty.
        </p>
      </div>
    </div>
  );
};

export default RankTrends;