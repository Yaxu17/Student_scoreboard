import { useState } from 'react';
import './App.css';

// Header Component
const Header = () => (
  <header className="header">
    <div className="header-content">
      <h1 className="title">Student Scoreboard</h1>
      <p className="subtitle">Track & Manage Academic Performance</p>
    </div>
  </header>
);

// StudentRow Component - Reusable row for each student
const StudentRow = ({ student, index, onUpdateScore, onDeleteStudent }) => {
  const isPassed = student.score >= 40;
  const [tempScore, setTempScore] = useState(student.score);

  const handleSave = () => {
    onUpdateScore(index, tempScore);
  };

  return (
    <div className={`student-row ${isPassed ? 'passed' : 'failed'}`}>
      <div className="row-left">
        <div className="student-badge">{index + 1}</div>
        <div className="student-info">
          <h3 className="student-name">{student.name}</h3>
          <span className={`status-badge ${isPassed ? 'status-pass' : 'status-fail'}`}>
            {isPassed ? '✓ PASS' : '✗ FAIL'}
          </span>
        </div>
      </div>

      <div className="row-right">
        <div className="score-section">
          <input
            type="number"
            min="0"
            max="100"
            value={tempScore}
            onChange={(e) => setTempScore(Math.min(100, Math.max(0, Number(e.target.value))))}
            className="score-input"
          />
          <span className="score-display">{tempScore}</span>
        </div>

        <div className="action-buttons">
          <button onClick={handleSave} className="btn-save">
            Save
          </button>
          <button onClick={() => onDeleteStudent(index)} className="btn-delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// StudentTable Component
const StudentTable = ({ students, onUpdateScore, onDeleteStudent }) => (
  <div className="student-table">
    <div className="table-header">
      <div className="header-left">
        <h2 className="section-title">📊 Student Records</h2>
        <p className="record-count">{students.length} entries</p>
      </div>
    </div>

    <div className="table-content">
      {students.length === 0 ? (
        <div className="empty-state">
          <p>No students yet. Add one to get started! 🎓</p>
        </div>
      ) : (
        students.map((student, index) => (
          <StudentRow
            key={index}
            student={student}
            index={index}
            onUpdateScore={onUpdateScore}
            onDeleteStudent={onDeleteStudent}
          />
        ))
      )}
    </div>
  </div>
);

// AddStudentForm Component
const AddStudentForm = ({ onAddStudent }) => {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && score !== '') {
      onAddStudent({
        name: name.trim(),
        score: Number(score),
      });
      setName('');
      setScore('');
    }
  };

  return (
    <form className="add-student-form" onSubmit={handleSubmit}>
      <h2 className="form-title">➕ Add New Student</h2>

      <div className="form-group">
        <label htmlFor="student-name">Student Name</label>
        <input
          id="student-name"
          type="text"
          placeholder="Enter student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="student-score">Score (0-100)</label>
        <input
          id="student-score"
          type="number"
          min="0"
          max="100"
          placeholder="Enter score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="form-input"
        />
      </div>

      <button type="submit" className="btn-submit">
        Add Student
      </button>
    </form>
  );
};

// Stats Component
const Stats = ({ students }) => {
  const total = students.length;
  const passed = students.filter((s) => s.score >= 40).length;
  const avgScore = total > 0 ? (students.reduce((sum, s) => sum + s.score, 0) / total).toFixed(1) : 0;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-label">Total Students</div>
        <div className="stat-value">{total}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Passed</div>
        <div className="stat-value passed-color">{passed}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Average Score</div>
        <div className="stat-value">{avgScore}</div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [students, setStudents] = useState([
    { name: 'Aman', score: 78 },
    { name: 'Riya', score: 45 },
    { name: 'Karan', score: 90 },
    { name: 'Neha', score: 49 },
  ]);

  const handleAddStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  const handleUpdateScore = (index, newScore) => {
    const updatedStudents = [...students];
    updatedStudents[index].score = newScore;
    setStudents(updatedStudents);
  };

  const handleDeleteStudent = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <Header />
      <main className="container">
        <Stats students={students} />
        <div className="content-grid">
          <StudentTable
            students={students}
            onUpdateScore={handleUpdateScore}
            onDeleteStudent={handleDeleteStudent}
          />
          <AddStudentForm onAddStudent={handleAddStudent} />
        </div>
      </main>
    </div>
  );
}

export default App;
