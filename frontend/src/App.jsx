import { useState } from "react"
import axios from 'axios';
import { QuizView } from "./components/QuizView";
import { LoadingView } from "./components/LoadingView";
import { ResultView } from "./components/ResultView";

function App() {
  const quizQuestions = [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnswerSelect = (answer) => {
    const updatedAnswers = [
      ...answers,
      {
        question: null,
        answer
      }
    ]
    setAnswers(updatedAnswers);
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else {
      submitQuiz(updatedAnswers);
    }
  }

  const submitQuiz = async (finalAnswers) => {
    setLoading(true);
    try {
      const base_url = import.meta.env.VITE_API_URL;
      const res = await axios.post(
        `${base_url}/api/v1/get-charachter`,
        { questions: finalAnswers }
      );
      setResult(res.data.charachter);
    } catch (error) {
      setError('Failed to analyze personality. Please try again.');
      console.error('Quiz submission error:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleRetake = () => {
    setCurrentIndex(0);
    setAnswers([]);
    setResult(null);
    setError(null);
    setLoading(false);
  };

  if (error) {
    return (
      <div className="bg-[#0e1a40] min-h-screen flex flex-col items-center justify-center text-[#936b2d]">
        <h1 className="text-2xl mb-4">Oops! Something went wrong</h1>
        <p className="mb-6 text-center">{error}</p>
        <button
          onClick={() => { setError(null); setLoading(true); submitQuiz(answers); }}
          className="bg-[#1b2a6b] hover:bg-[#273c9b] px-6 py-3 rounded-lg text-[#936b2d] font-semibold"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (loading) return <LoadingView />;
  if (result) return <ResultView result={result} onRetake={handleRetake} />;
  return <QuizView currentIndex={currentIndex} answers={answers} handleAnswerSelect={handleAnswerSelect} />;
}

export default App
