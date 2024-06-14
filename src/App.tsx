import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import QuizCreationPage from './Pages/QuizCreationPage';
import TakeQuizPage from './Pages/TakeQuizPage';
import ReviewAnswersPage from './Pages/ReviewAnswersPage';

const App: React.FC = () => {
  return (
    <div>
      <nav className="p-4 bg-gray-800 text-white">
        <ul className="flex space-x-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create">Create Quiz</Link></li>
          <li><Link to="/take">Take Quiz</Link></li>
          <li><Link to="/review">Review Answers</Link></li>
        </ul>
      </nav>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<QuizCreationPage />} />
          <Route path="/take" element={<TakeQuizPage />} />
          <Route path="/review" element={<ReviewAnswersPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
