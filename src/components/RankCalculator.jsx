import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import './RankCalculator.css';

const years = [2025, 2024, 2023, 2022];

const RankCalculator = ({ onPredict, year, onYearChange }) => {
  const { user } = useAuth();
  const [marks, setMarks] = useState({
    physics: '',
    chemistry: '',
    mathematics: '',
  });

  const [stream] = useState('MPC');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value === '') {
      setMarks({ ...marks, [name]: '' });
      return;
    }
    const num = Math.min(100, Math.max(0, parseFloat(value)));
    setMarks({ ...marks, [name]: isNaN(num) ? '' : num });
  };

  const totalMarks = useMemo(() => {
    const p = parseFloat(marks.physics) || 0;
    const c = parseFloat(marks.chemistry) || 0;
    const m = parseFloat(marks.mathematics) || 0;
    return p + c + m;
  }, [marks]);

  const getProgressColor = (value) => {
    const v = parseFloat(value) || 0;
    if (v >= 80) return 'var(--accent-emerald)';
    if (v >= 50) return 'var(--accent-amber)';
    if (v > 0) return 'var(--accent-rose)';
    return 'transparent';
  };

  const calculateRank = () => {
    const physics = parseFloat(marks.physics) || 0;
    const chemistry = parseFloat(marks.chemistry) || 0;
    const mathematics = parseFloat(marks.mathematics) || 0;
    const total = physics + chemistry + mathematics;

    let predictedRank;
    if (total >= 280) {
      predictedRank = Math.floor((301 - total) * 150);
    } else if (total >= 240) {
      predictedRank = Math.floor((301 - total) * 300);
    } else if (total >= 200) {
      predictedRank = Math.floor((301 - total) * 500);
    } else if (total >= 150) {
      predictedRank = Math.floor((301 - total) * 800);
    } else {
      predictedRank = Math.floor((301 - total) * 1200);
    }

    // Year-specific factors based on competition intensity
    const yearFactors = {
      2025: 0.90,
      2024: 0.95,
      2023: 1.0,
      2022: 1.05,
    };
    predictedRank = Math.floor(predictedRank * (yearFactors[year] || 1.0));
    predictedRank = Math.max(1, predictedRank);

    onPredict(predictedRank, total);

    // Save prediction to database
    if (user && supabase) {
      supabase.from('predictions').insert([
        {
          user_id: user.id,
          marks: total,
          predicted_rank: predictedRank,
          year: year
        }
      ]).then(({ error }) => {
        if (error) console.error("Error saving prediction:", error.message);
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateRank();
  };

  const resetForm = () => {
    setMarks({ physics: '', chemistry: '', mathematics: '' });
    onPredict(null, null);
  };

  const subjects = [
    { key: 'physics', label: 'Physics', icon: '⚛️' },
    { key: 'chemistry', label: 'Chemistry', icon: '🧪' },
    { key: 'mathematics', label: 'Mathematics', icon: '📐' },
  ];

  return (
    <div className="rank-calculator">
      <div className="calculator-header">
        <div className="calculator-title">
          <span className="icon">🎯</span>
          <h2>Rank Predictor</h2>
        </div>
        <div className="year-selector">
          {years.map((y) => (
            <button
              key={y}
              type="button"
              className={`year-btn ${year === y ? 'active' : ''}`}
              onClick={() => onYearChange({ target: { value: y } })}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      <div className="stream-selector">
        <label className={`stream-chip ${stream === 'MPC' ? 'active' : ''}`}>
          <input type="radio" value="MPC" checked={stream === 'MPC'} readOnly />
          📘 MPC (Maths, Physics, Chemistry)
        </label>
      </div>

      <form onSubmit={handleSubmit} className="marks-form">
        {subjects.map((subject) => (
          <div className="input-group" key={subject.key}>
            <div className="input-label">
              <label htmlFor={subject.key}>
                <span className="subject-icon">{subject.icon}</span>
                {subject.label}
              </label>
              <span className="max-marks">/ 100</span>
            </div>
            <input
              type="number"
              id={subject.key}
              name={subject.key}
              value={marks[subject.key]}
              onChange={handleInputChange}
              min="0"
              max="100"
              step="0.1"
              placeholder={`Enter ${subject.label} marks`}
              required
            />
            <div className="marks-progress">
              <div
                className="marks-progress-bar"
                style={{
                  width: `${parseFloat(marks[subject.key]) || 0}%`,
                  background: getProgressColor(marks[subject.key]),
                }}
              />
            </div>
          </div>
        ))}

        <div className="total-display">
          <span className="total-label">Total Marks</span>
          <span className="total-value">{totalMarks} / 300</span>
        </div>

        <div className="form-actions">
          <button type="submit" className="predict-btn" id="predict-rank-btn">
            🚀 Predict Rank
          </button>
          <button type="button" onClick={resetForm} className="reset-btn" id="reset-btn">
            ↺ Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default RankCalculator;