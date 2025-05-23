import React, { useState } from 'react';
import './dashboard.css';
import SkillAssessment from '../skills/skill';
import LearningModule from '../learning/learning';
import CareerResources from '../career/career';

const WorkforceDashboard = () => {
  const [activeTab, setActiveTab] = useState('assessments');

  return (
    <div className="workforce-dashboard">
      <h1>Workforce Preparation</h1>
      <p className="subtitle">Bridge academic learning with essential job skills</p>
      
      <div className="tabs">
        <button 
          className={activeTab === 'assessments' ? 'active' : ''}
          onClick={() => setActiveTab('assessments')}
        >
          Skill Assessments
        </button>
        <button 
          className={activeTab === 'learning' ? 'active' : ''}
          onClick={() => setActiveTab('learning')}
        >
          Learning Modules
        </button>
        <button 
          className={activeTab === 'career' ? 'active' : ''}
          onClick={() => setActiveTab('career')}
        >
          Career Resources
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'assessments' && <SkillAssessment />}
        {activeTab === 'learning' && <LearningModule />}
        {activeTab === 'career' && <CareerResources />}
      </div>
    </div>
  );
};

export default WorkforceDashboard;