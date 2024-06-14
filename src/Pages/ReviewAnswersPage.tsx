import React, { useState, useEffect } from 'react';

const ReviewAnswersPage: React.FC = () => {
  const [quiz, setQuiz] = useState<any>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  useEffect(() => {
    const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    if (quizzes.length > 0) {
      setQuiz(quizzes[0]);
    }
    const savedAnswers = localStorage.getItem('userAnswers');
    if (savedAnswers) {
      setUserAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      {quiz ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
          {quiz.questions.map((question: any, index: number) => (
            <div key={index} className="mb-4">
              <p className="mb-2">{question.questionText}</p>
              {question.options.map((option: string, optIndex: number) => (
                <label
                  key={optIndex}
                  className={`block ${option === question.correctAnswer ? 'text-green-500' : ''} ${
                    option === userAnswers[index] && option !== question.correctAnswer ? 'text-red-500' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={option === userAnswers[index]}
                    readOnly
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
        </>
      ) : (
        <p>No quiz available</p>
      )}
    </div>
  );
};

export default ReviewAnswersPage;
