import React, { useState } from 'react';
import './RankCalculator.css';

const RankCalculator = ({ onPredict, year }) => {
  const [marks, setMarks] = useState({
    physics: '',
    chemistry: '',
    mathematics: '',
    // For MPC stream
  });

  const [stream, setStream] = useState('MPC');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMarks({
      ...marks,
      [name]: Math.min(100, Math.max(0, value)) // Limit between 0-100
    });
  };

  const calculateRank = () => {
    // Convert string values to numbers
    const physics = parseFloat(marks.physics) || 0;
    const chemistry = parseFloat(marks.chemistry) || 0;
    const mathematics = parseFloat(marks.mathematics) || 0;

    // Calculate total marks
    const totalMarks = physics + chemistry + mathematics;
    
    // Base prediction algorithm (simplified version)
    // In reality, this would be more complex based on historical data
    let predictedRank;
    
    if (totalMarks >= 280) {
      predictedRank = Math.floor((301 - totalMarks) * 150); // Top ranks
    } else if (totalMarks >= 240) {
      predictedRank = Math.floor((301 - totalMarks) * 300);
    } else if (totalMarks >= 200) {
      predictedRank = Math.floor((301 - totalMarks) * 500);
    } else if (totalMarks >= 150) {
      predictedRank = Math.floor((301 - totalMarks) * 800);
    } else {
      predictedRank = Math.floor((301 - totalMarks) * 1200);
    }

    // Add some randomization based on year trends
    const yearFactor = year === 2024 ? 0.95 : year === 2023 ? 1.0 : 1.05;
    predictedRank = Math.floor(predictedRank * yearFactor);

    // Ensure rank is positive
    predictedRank = Math.max(1, predictedRank);

    onPredict(predictedRank);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateRank();
  };

  const resetForm = () => {
    setMarks({
      physics: '',
      chemistry: '',
      mathematics: '',
    });
    onPredict(null);
  };

  return (
    <div className="rank-calculator">
      <h2>Rank Predictor</h2>
      <div className="year-selector">
        <label>Select Year for Comparison: </label>
        <select value={year} onChange={() => {}} disabled>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} className="marks-form">
        <div className="stream-selector">
          <label>
            <input
              type="radio"
              value="MPC"
              checked={stream === 'MPC'}
              onChange={(e) => setStream(e.target.value)}
            />
            MPC (Mathematics, Physics, Chemistry)
          </label>
        </div>

        <div className="input-group">
          <label htmlFor="physics">Physics Marks (0-100)</label>
          <input
            type="number"
            id="physics"
            name="physics"
            value={marks.physics}
            onChange={handleInputChange}
            min="0"
            max="100"
            step="0.1"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="chemistry">Chemistry Marks (0-100)</label>
          <input
            type="number"
            id="chemistry"
            name="chemistry"
            value={marks.chemistry}
            onChange={handleInputChange}
            min="0"
            max="100"
            step="0.1"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="mathematics">Mathematics Marks (0-100)</label>
          <input
            type="number"
            id="mathematics"
            name="mathematics"
            value={marks.mathematics}
            onChange={handleInputChange}
            min="0"
            max="100"
            step="0.1"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="predict-btn">
            Predict Rank
          </button>
          <button type="button" onClick={resetForm} className="reset-btn">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default RankCalculator;