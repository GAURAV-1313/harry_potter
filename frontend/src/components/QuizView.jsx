import { questions } from "../constants/questions";

const quizQuestions = questions.quiz.questions;

export function QuizView({ currentIndex, answers, handleAnswerSelect }) {
  const currentQuestion = quizQuestions[currentIndex];

  return (
    <div className="bg-[#0e1a40] min-h-screen p-6 body-text text-[#936b2d]">
      <h1 className="text-4xl text-center mb-4 hp-title text-[#936b2d]">
        {questions.quiz.title}
      </h1>
      <p className="text-center text-xl mb-8">
        {questions.quiz.description}
      </p>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl mb-6">
          {currentQuestion.question}
        </h2>
        <div className="flex flex-col gap-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className="bg-[#1b2a6b] hover:bg-[#273c9b] p-4 rounded-lg text-left"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}