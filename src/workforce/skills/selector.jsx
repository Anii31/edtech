import React, { useState } from 'react';
import './selector.css';

const SkillSelector = ({ onStartAssessment }) => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillLevel, setSkillLevel] = useState('beginner');

  const skills = [
    'Data Structures & Algorithms',
    'JavaScript',
    'Python',
    'React',
    'Node.js',
    'Java',
    'C++',
    'System Design',
    'HTML/CSS',
    'SQL',
    'Git',
    'TypeScript'
  ];

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      if (selectedSkills.length < 5) { // Limit to 5 skills
        setSelectedSkills([...selectedSkills, skill]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSkills.length > 0) {
      onStartAssessment(selectedSkills, skillLevel);
    }
  };

  return (
    <div className="skill-selector">
      <h2>Select Skills to Assess</h2>
      <p>Choose up to 5 skills you want to be tested on</p>
      
      <form onSubmit={handleSubmit}>
        <div className="skills-grid">
          {skills.map(skill => (
            <div 
              key={skill}
              className={`skill-card ${selectedSkills.includes(skill) ? 'selected' : ''}`}
              onClick={() => toggleSkill(skill)}
            >
              {skill}
              {selectedSkills.includes(skill) && <span className="checkmark">✓</span>}
            </div>
          ))}
        </div>
        
        <div className="level-selector">
          <h3>Select Difficulty Level:</h3>
          <div className="level-options">
            {['beginner', 'intermediate', 'advanced'].map(level => (
              <label key={level} className="level-option">
                <input
                  type="radio"
                  name="skillLevel"
                  value={level}
                  checked={skillLevel === level}
                  onChange={() => setSkillLevel(level)}
                />
                <span className="level-label">
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>
        
        <button 
          type="submit" 
          className="start-btn"
          disabled={selectedSkills.length === 0}
        >
          Start Assessment
        </button>
        
        {selectedSkills.length > 0 && (
          <div className="selected-skills">
            <h4>Selected Skills:</h4>
            <div className="selected-tags">
              {selectedSkills.map(skill => (
                <span key={skill} className="selected-tag">
                  {skill}
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSkill(skill);
                    }}
                    className="remove-tag"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SkillSelector;