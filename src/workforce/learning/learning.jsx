import React from 'react';
import './learning.css';

const LearningModule = () => {
  const modules = [
    {
      id: 1,
      title: "Effective Communication",
      description: "Learn how to communicate clearly and professionally in the workplace",
      duration: "30 min",
      completed: false
    },
    {
      id: 2,
      title: "Excel for Business",
      description: "Master essential Excel functions for data analysis and reporting",
      duration: "45 min",
      completed: true
    },
    {
      id: 3,
      title: "Time Management",
      description: "Techniques to prioritize tasks and boost productivity",
      duration: "25 min",
      completed: false
    }
  ];

  return (
    <div className="learning-module">
      <h2>Learning Modules</h2>
      <p className="module-subtitle">Develop essential workforce skills through interactive lessons</p>
      
      <div className="module-list">
        {modules.map(module => (
          <div key={module.id} className="module-card">
            <div className="module-info">
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <div className="module-meta">
                <span className="duration">{module.duration}</span>
                {module.completed && <span className="completed">Completed</span>}
              </div>
            </div>
            <button className="start-btn">
              {module.completed ? 'Review' : 'Start'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningModule;