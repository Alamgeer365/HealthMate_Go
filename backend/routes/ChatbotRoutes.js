// backend/routes/chatbotRoutes.js
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ success: false, message: 'Question is required.' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // This prompt helps guide the AI to give relevant answers for your website
    const prompt = `You are a helpful customer support assistant for a doctor appointment booking website called "HealthMate". 
    Answer the user's question based on the context of this website. 
    Do not provide any medical advice. Keep your answers concise and friendly.
    User's question: "${question}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ success: true, answer: text });

  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ success: false, message: 'Failed to get a response from the AI assistant.' });
  }
});

export default router;
