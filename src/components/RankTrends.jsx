import React from 'react';
import './RankTrends.css';

const RankTrends = ({ year }) => {
  // Sample historical data
  const trendsData = {
    2025: [
      { marks: 300, rank: 1 },
      { marks: 290, rank: 400 },
      { marks: 280, rank: 1300 },
      { marks: 270, rank: 3000 },
      { marks: 260, rank: 6500 },
      { marks: 250, rank: 13000 },
      { marks: 240, rank: 21000 },
      { marks: 230, rank: 35000 },
      { marks: 220, rank: 52000 },
      { marks: 210, rank: 75000 },
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
    ]
  };

  const currentYearData = trendsData[year] || trendsData[2024];

  return (
    <div className="rank-trends">
      <h3>Historical Rank Trends ({year})</h3>
      <div className="trends-table-container">
        <table className="trends-table">
          <thead>
            <tr>
              <th>Total Marks (out of 300)</th>
              <th>Approximate Rank</th>
              <th>College Tier</th>
            </tr>
          </thead>
          <tbody>
            {currentYearData.map((item, index) => (
              <tr key={index}>
                <td>{item.marks}</td>
                <td>{item.rank.toLocaleString()}</td>
                <td>
                  {item.marks >= 280 ? 'Top IITs/NITs' :
                   item.marks >= 250 ? 'Good Government Colleges' :
                   item.marks >= 230 ? 'Private Top Colleges' :
                   item.marks >= 200 ? 'Average Private Colleges' :
                   'Other Colleges'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="trends-info">
        <p><strong>Note:</strong> These are approximate ranks based on previous year data. Actual ranks may vary.</p>
      </div>
    </div>
  );
};

export default RankTrends;