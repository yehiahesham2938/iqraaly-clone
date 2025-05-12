const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

  
if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not set in environment variables');
}

  
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    console.log('Received message:', message);

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set');
      throw new Error('Gemini API key is not configured');
    }

    try {
  
      const prompt = `You are an AI assistant for an Arabic audiobook platform called Iqraaly. 
      You can help users with book summaries, recommendations, and answering questions about books. 
      Please respond in Arabic. Keep your responses concise and helpful.
      
      User message: ${message}`;

      console.log('Sending prompt to Gemini API:', prompt);

  
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-04-17" });
      console.log('Model initialized');

      const result = await model.generateContent({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      });

      console.log('Content generated');

      const response = await result.response;
      console.log('Response received:', response);

      if (!response || !response.text) {
        console.error('Invalid response structure:', response);
        throw new Error('Invalid response from Gemini API');
      }

      const text = response.text();
      console.log('Response text:', text);

      if (!text) {
        throw new Error('Empty response from Gemini API');
      }

      res.json({ response: text });
    } catch (apiError) {
      console.error('Gemini API error details:', {
        message: apiError.message,
        stack: apiError.stack,
        name: apiError.name,
        code: apiError.code,
        status: apiError.status,
        statusText: apiError.statusText
      });
      throw new Error(`Gemini API error: ${apiError.message}`);
    }
  } catch (error) {
    console.error('Chat error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    
  
    let errorMessage = 'عذراً، حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى.';
    
    if (error.message.includes('API key')) {
      errorMessage = 'خطأ في تكوين المساعد الذكي. يرجى التواصل مع الدعم الفني.';
    } else if (error.message.includes('Empty response')) {
      errorMessage = 'لم يتم استلام رد من المساعد. يرجى المحاولة مرة أخرى.';
    } else if (error.message.includes('Gemini API error')) {
      errorMessage = 'حدث خطأ في الاتصال بالمساعد الذكي. يرجى المحاولة مرة أخرى.';
    }
    
    res.status(500).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 