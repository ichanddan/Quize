import React, { useState } from 'react';

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

const QuizCreationPage: React.FC = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    questionText: '',
    options: ['', '', '', ''],
    correctAnswer: '',
  });

  const addQuestion = () => {
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({ questionText: '', options: ['', '', '', ''], correctAnswer: '' });
  };

  const handleSubmit = () => {
    if (!quizTitle || questions.length === 0) {
      alert('Quiz title and at least one question are required');
      return;
    }
    const quiz = { title: quizTitle, questions };
    const existingQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    localStorage.setItem('quizzes', JSON.stringify([...existingQuizzes, quiz]));
    // Reset form
    setQuizTitle('');
    setQuestions([]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Quiz</h1>
      <input
        type="text"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        placeholder="Quiz Title"
        className="mb-4 p-2 border rounded w-full"
      />
      <div>
        <input
          type="text"
          value={currentQuestion.questionText}
          onChange={(e) => setCurrentQuestion({ ...currentQuestion, questionText: e.target.value })}
          placeholder="Question"
          className="mb-2 p-2 border rounded w-full"
        />
        {currentQuestion.options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => {
              const newOptions = [...currentQuestion.options];
              newOptions[index] = e.target.value;
              setCurrentQuestion({ ...currentQuestion, options: newOptions });
            }}
            placeholder={`Option ${index + 1}`}
            className="mb-2 p-2 border rounded w-full"
          />
        ))}
        <input
          type="text"
          value={currentQuestion.correctAnswer}
          onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
          placeholder="Correct Answer"
          className="mb-4 p-2 border rounded w-full"
        />
        <button onClick={addQuestion} className="bg-blue-500 text-white p-2 rounded">
          Add Question
        </button>
      </div>
      <button onClick={handleSubmit} className="mt-4 bg-green-500 text-white p-2 rounded">
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizCreationPage;
