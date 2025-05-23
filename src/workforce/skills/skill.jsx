import React, { useState } from 'react';
import './skill.css';
import SkillSelector from './selector';

const SkillAssessment = () => {
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillLevel, setSkillLevel] = useState('beginner');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const HF_API_KEY = "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";
  const HF_API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-xxl";

  const generateQuestionsWithAI = async (skills, level) => {
    setLoading(true);
    setError(null);

    try {
      const generatedQuestions = [];
      
      // Generate 5 questions per skill (total 15 for 3 skills)
      for (const skill of skills) {
        const prompt = `Generate 5 ${level}-level multiple choice questions about ${skill} for a programming skill assessment. 
        Each question should have 4 options and indicate the correct answer. 
        Format as JSON: [{
          "question": "question text",
          "options": ["option1", "option2", "option3", "option4"],
          "correctAnswer": index_of_correct_answer
        }]`;

        const response = await fetch(HF_API_URL, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${HF_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ inputs: prompt })
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();
        
        try {
          // Try to parse the generated text as JSON
          const parsedQuestions = JSON.parse(result[0].generated_text);
          if (Array.isArray(parsedQuestions)) {
            generatedQuestions.push(...parsedQuestions);
          } else {
            console.warn("Unexpected response format from API");
            // Fallback to mock questions if API response is unexpected
            generatedQuestions.push(...getFallbackQuestions(skill, level));
          }
        } catch (e) {
          console.error("Error parsing API response:", e);
          // Fallback to mock questions if parsing fails
          generatedQuestions.push(...getFallbackQuestions(skill, level));
        }
      }

      // Shuffle and limit to 15 questions
      setQuestions(
        generatedQuestions
          .sort(() => Math.random() - 0.5)
          .slice(0, 15)
      );
    } catch (err) {
      setError("Failed to generate questions. Using sample questions instead.");
      console.error("Error generating questions:", err);
      // Fallback to mock questions if API fails
      const fallbackQuestions = [];
      selectedSkills.forEach(skill => {
        fallbackQuestions.push(...getFallbackQuestions(skill, skillLevel));
      });
      setQuestions(fallbackQuestions.slice(0, 15));
    } finally {
      setLoading(false);
    }
  };

  // Fallback questions in case API fails
  const getFallbackQuestions = (skill, level) => {
    const fallbackBank = {
      'Data Structures & Algorithms': {
        beginner: [
          {
            question: "What is the time complexity of accessing an array element by index?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            correctAnswer: 0
          },
          {
            question: "Which data structure uses LIFO (Last In First Out) principle?",
            options: ["Queue", "Stack", "Heap", "Tree"],
            correctAnswer: 1
          }
        ],
        intermediate: [
          {
            question: "What is the time complexity of binary search?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            correctAnswer: 1
          },
          {
            question: "Which sorting algorithm typically has the best average-case time complexity?",
            options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"],
            correctAnswer: 2
          }
        ],
        advanced: [
          {
            question: "What data structure is typically used to implement Dijkstra's algorithm efficiently?",
            options: ["Stack", "Queue", "Priority Queue", "Linked List"],
            correctAnswer: 2
          },
          {
            question: "What is the time complexity of Floyd's cycle detection algorithm?",
            options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
            correctAnswer: 0
          }
        ]
      },
      'JavaScript': {
        beginner: [
          {
            question: "Which keyword is used to declare a constant in JavaScript?",
            options: ["let", "var", "const", "static"],
            correctAnswer: 2
          },
          {
            question: "What does the 'typeof' operator return for an array?",
            options: ["'array'", "'object'", "'list'", "'undefined'"],
            correctAnswer: 1
          }
        ],
        intermediate: [
          {
            question: "What is the output of: console.log(1 + '1')?",
            options: ["2", "'11'", "NaN", "undefined"],
            correctAnswer: 1
          },
          {
            question: "What does the 'this' keyword refer to in a method?",
            options: ["The function itself", "The global object", "The object the method belongs to", "undefined"],
            correctAnswer: 2
          }
        ],
        advanced: [
          {
            question: "What is a closure in JavaScript?",
            options: [
              "A function that has access to its outer function's scope",
              "A way to close a program",
              "A method to hide variables",
              "A type of loop"
            ],
            correctAnswer: 0
          },
          {
            question: "What does the 'new' keyword do?",
            options: [
              "Creates a new variable",
              "Creates a new instance of an object type",
              "Imports a new module",
              "Declares a new function"
            ],
            correctAnswer: 1
          }
        ]
      }
    };

    return fallbackBank[skill]?.[level] || [];
  };

  const startAssessment = async (skills, level) => {
    setSelectedSkills(skills);
    setSkillLevel(level);
    setAssessmentStarted(true);
    await generateQuestionsWithAI(skills, level);
  };

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setAssessmentStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setQuestions([]);
  };

  if (!assessmentStarted) {
    return <SkillSelector onStartAssessment={startAssessment} />;
  }

  return (
    <div className="skill-assessment">
      {loading ? (
        <div className="loading">
          <h3>Generating your personalized assessment...</h3>
          <div className="spinner"></div>
          <p>This may take a few moments</p>
        </div>
      ) : error ? (
        <div className="error">
          <h3>{error}</h3>
        </div>
      ) : showResult ? (
        <div className="result">
          <h2>Your Assessment Result</h2>
          <p>You scored {score} out of {questions.length}</p>
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ width: `${(score / questions.length) * 100}%` }}
            ></div>
          </div>
          <p className="feedback">
            {score === questions.length 
              ? "🎉 Excellent! You've mastered these concepts!"
              : score >= questions.length * 0.7 
              ? "👍 Good job! You're proficient with room to grow."
              : score >= questions.length * 0.4 
              ? "💡 You're getting there! Keep practicing."
              : "📚 Keep learning! Review these topics and try again."}
          </p>
          <div className="skill-tags">
            {selectedSkills.map(skill => (
              <span key={skill} className="skill-tag">{skill} ({skillLevel})</span>
            ))}
          </div>
          <button onClick={restartQuiz} className="retry-btn">Take Again</button>
        </div>
      ) : questions.length > 0 ? (
        <div className="question-container">
          <h2>Skill Assessment</h2>
          <div className="progress-info">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>Score: {score}</span>
          </div>
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
            ></div>
          </div>
          <div className="question">
            <h3>{questions[currentQuestion].question}</h3>
            <div className="options">
              {questions[currentQuestion].options.map((option, index) => (
                <button 
                  key={index} 
                  onClick={() => handleAnswer(index)}
                  className="option-btn"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="no-questions">
          <h3>Couldn't generate questions for your selection.</h3>
          <button onClick={restartQuiz} className="retry-btn">Try Different Skills</button>
        </div>
      )}
    </div>
  );
};

export default SkillAssessment;