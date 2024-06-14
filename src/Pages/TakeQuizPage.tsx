import React, { useState, useEffect } from 'react';

const TakeQuizPage: React.FC = () => {
  const [quiz, setQuiz] = useState<any>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    if (quizzes.length > 0) {
      setQuiz(quizzes[0]);
    }
  }, []);

  const handleAnswerChange = (index: number, answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = answer;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (!quiz) return;
    const correctAnswers = quiz.questions.map((q: any) => q.correctAnswer);
    const userScore = userAnswers.reduce((score, answer, index) => {
      if (answer === correctAnswers[index]) return score + 1;
      return score;
    }, 0);
    setScore(userScore);
  };

  return (
    <div className="container mx-auto p-4">
      {quiz ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
          {quiz.questions.map((question: any, index: number) => (
            <div key={index} className="mb-4">
              <p className="mb-2">{question.questionText}</p>
              {question.options.map((option: string, optIndex: number) => (
                <label key={optIndex} className="block">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={() => handleAnswerChange(index, option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
            Submit Quiz
          </button>
          {score !== null && (
            <p className="mt-4">Your score: {score} / {quiz.questions.length}</p>
          )}
        </>
      ) : (
        <p>No quiz available</p>
      )}
    </div>
  );
};

export default TakeQuizPage;
