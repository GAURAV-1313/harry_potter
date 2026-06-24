import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

/**
 * Determines the Harry Potter character that matches user's personality
 * @function getCharachter
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {Array<object>} req.body.questions - Array of question-answer pairs
 * @param {string} req.body.questions[].question - The question text
 * @param {string} req.body.questions[].answer - The selected answer
 * @returns {object} JSON response with matched character
 * @throws {Error} If API key is not configured or Gemini API fails
 */
export const getCharachter = async (req, res) => {
  try {
    const { questions } = req.body;

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        message: "Questions array is required",
      });
    }             

    const ai = new GoogleGenAI({});

    const formattedQA = questions
      .map((q, i) => `${i + 1}. Q: ${q.question}\n   A: ${q.answer}`)
      .join("\n\n");

    const prompt = `
You are a personality analysis expert in the Harry Potter universe.

Based on the following questions and answers, determine which Harry Potter character best matches the user.

Only respond with the character name. Do not explain.

${formattedQA}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    
    const geminiResponse = response.text;
    
    console.log('Response from gemini: ',response.text);

    return res.status(200).json({
      message: geminiResponse,
      charachter: geminiResponse
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};
