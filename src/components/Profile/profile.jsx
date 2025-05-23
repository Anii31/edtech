// src/components/Profile/Profile.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio || ''
  });
  const navigate = useNavigate();

  // Mock data for additional features
  const profileData = {
    skills: ['JavaScript', 'React', 'Python', 'Machine Learning'],
    learningStats: {
      coursesCompleted: 12,
      hoursLearned: 85,
      questionsAsked: 47,
      streakDays: 18
    },
    achievements: [
      { id: 1, title: 'Fast Learner', description: 'Completed 5 courses in one month', icon: '🏆' },
      { id: 2, title: 'Question Master', description: 'Asked 25+ questions', icon: '❓' },
      { id: 3, title: 'Streak Champion', description: '7-day learning streak', icon: '🔥' }
    ],
    mentor: {
      name: 'Dr. Sarah Chen',
      field: 'Artificial Intelligence',
      nextMeeting: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    projects: [
      { id: 1, title: 'E-commerce Dashboard', status: 'Completed', skills: ['React', 'Node.js'] },
      { id: 2, title: 'ML Sentiment Analysis', status: 'In Progress', skills: ['Python', 'NLP'] }
    ],
    recentActivity: [
      { id: 1, action: 'Completed course "Advanced React Patterns"', time: '2 days ago' },
      { id: 2, action: 'Asked a question about "State Management in Large Apps"', time: '5 days ago' },
      { id: 3, action: 'Started new project "E-commerce Dashboard"', time: '1 week ago' }
    ]
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In a real app, you would call an API to save changes
    onLogout(); // For demo purposes, we'll logout after "saving"
    navigate('/');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatDateTime = (dateTimeString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar-container">
          <img 
            src={`https://ui-avatars.com/api/?name=${user.name}&background=4a6fa5&color=fff&size=150`} 
            alt="User avatar" 
            className="profile-avatar" 
          />
          <button className="edit-avatar-btn">Edit</button>
        </div>
        <div className="profile-info">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                className="edit-input"
              />
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                className="edit-input"
              />
              <textarea
                name="bio"
                value={editForm.bio}
                onChange={handleEditChange}
                className="edit-textarea"
                rows="3"
                placeholder="Tell us about yourself..."
              />
              <div className="edit-buttons">
                <button onClick={handleSave} className="save-btn">Save</button>
                <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h1>{user.name}</h1>
              <p className="email">{user.email}</p>
              {editForm.bio && <p className="bio">{editForm.bio}</p>}
              <p className="member-since">Member since {formatDate(user.joinDate)}</p>
              <div className="profile-action-buttons">
                <button onClick={() => setIsEditing(true)} className="edit-profile-btn">
                  Edit Profile
                </button>
                <button onClick={onLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </button>
        <button 
          className={`tab-btn ${activeTab === 'mentor' ? 'active' : ''}`}
          onClick={() => setActiveTab('mentor')}
        >
          Mentor
        </button>
        <button 
          className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="stats-container">
              <h2>Your Learning Statistics</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>{profileData.learningStats.coursesCompleted}</h3>
                  <p>Courses Completed</p>
                </div>
                <div className="stat-card">
                  <h3>{profileData.learningStats.hoursLearned}</h3>
                  <p>Hours Learned</p>
                </div>
                <div className="stat-card">
                  <h3>{profileData.learningStats.questionsAsked}</h3>
                  <p>Questions Asked</p>
                </div>
                <div className="stat-card">
                  <h3>{profileData.learningStats.streakDays}</h3>
                  <p>Day Streak</p>
                </div>
              </div>
            </div>

            <div className="skills-container">
              <h2>Your Skills</h2>
              <div className="skills-list">
                {profileData.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
                <button className="add-skill-btn">+ Add Skill</button>
              </div>
            </div>

            <div className="recent-activity">
              <h2>Recent Activity</h2>
              {profileData.recentActivity.map(activity => (
                <div key={activity.id} className="activity-item">
                  <p>{activity.action}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="achievements-tab">
            <h2>Your Achievements</h2>
            <div className="achievements-grid">
              {profileData.achievements.map(achievement => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'mentor' && (
          <div className="mentor-tab">
            <h2>Your Mentor</h2>
            <div className="mentor-card">
              <div className="mentor-info">
                <h3>{profileData.mentor.name}</h3>
                <p className="mentor-field">{profileData.mentor.field}</p>
                <p className="next-meeting">
                  Next Meeting: {formatDateTime(profileData.mentor.nextMeeting)}
                </p>
                <button className="schedule-btn">Schedule Meeting</button>
              </div>
              <div className="mentor-actions">
                <button className="action-btn message-btn">Send Message</button>
                <button className="action-btn resources-btn">Request Resources</button>
                <button className="action-btn feedback-btn">Give Feedback</button>
              </div>
            </div>
            <div className="mentor-history">
              <h3>Past Meetings</h3>
              <div className="meeting-item">
                <p>Career Guidance Session</p>
                <span className="meeting-date">May 10, 2023</span>
              </div>
              <div className="meeting-item">
                <p>Technical Interview Preparation</p>
                <span className="meeting-date">April 28, 2023</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="projects-tab">
            <h2>Your Projects</h2>
            <button className="new-project-btn" onClick={() => navigate('/projects/new')}>
              Start New Project
            </button>
            <div className="projects-list">
              {profileData.projects.map(project => (
                <div key={project.id} className="project-card">
                  <h3>{project.title}</h3>
                  <p className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
                    {project.status}
                  </p>
                  <div className="project-skills">
                    {project.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                  <button className="project-details-btn">View Details</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;