import React from 'react';
import './career.css';

const CareerResources = () => {
  const resources = [
    {
      id: 1,
      title: "Resume Builder",
      description: "Create a professional resume in minutes",
      icon: "📝"
    },
    {
      id: 2,
      title: "Interview Prep",
      description: "Practice common interview questions",
      icon: "💼"
    },
    {
      id: 3,
      title: "Career Path Explorer",
      description: "Discover jobs that match your skills",
      icon: "🔍"
    },
    {
      id: 4,
      title: "Salary Calculator",
      description: "Find average salaries for different roles",
      icon: "💰"
    }
  ];

  return (
    <div className="career-resources">
      <h2>Career Resources</h2>
      <p className="resources-subtitle">Tools to help you succeed in your job search</p>
      
      <div className="resources-grid">
        {resources.map(resource => (
          <div key={resource.id} className="resource-card">
            <div className="resource-icon">{resource.icon}</div>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <button className="explore-btn">Explore</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerResources;