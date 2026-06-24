import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { validateQuestions } from '../utils/validation.js';

export const getCharachter = async (req, res) => {
  try {
    const { questions } = req.body;

    const validation = validateQuestions(questions);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
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
