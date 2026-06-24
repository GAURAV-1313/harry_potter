export const validateQuestions = (questions) => {
  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    return { valid: false, message: "Questions array is required" };
  }

  for (const q of questions) {
    if (!q.question || typeof q.question !== 'string') {
      return { valid: false, message: "Each question must have a string 'question' field" };
    }
    if (!q.answer || typeof q.answer !== 'string') {
      return { valid: false, message: "Each question must have a string 'answer' field" };
    }
  }

  return { valid: true };
};
