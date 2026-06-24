export function ResultView({ result, onRetake }) {
  return (
    <div className="bg-[#0e1a40] min-h-screen flex flex-col items-center justify-center hp-title text-[#936b2d]">
      <h1 className="text-4xl mb-4">You are</h1>
      <h2 className="text-5xl font-bold">{result}</h2>
      <button
        onClick={onRetake}
        className="mt-8 bg-[#1b2a6b] hover:bg-[#273c9b] px-6 py-3 rounded-lg text-[#936b2d] font-semibold transition-colors"
      >
        Retake Quiz
      </button>
    </div>
  );
}
