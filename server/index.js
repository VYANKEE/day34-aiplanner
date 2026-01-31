const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

// Environment variables load karna (.env file se)
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Frontend ko allow karega
app.use(express.json()); // JSON data padhne ke liye

// NVIDIA AI Setup (Tere snippet wala configuration)
const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY, 
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

// API Route
app.post('/api/generate', async (req, res) => {
  try {
    const { idea, type, depth, audience } = req.body;

    console.log(`Request received for: ${idea.substring(0, 20)}...`);

    // AI Request (Humne stream: false rakha hai taaki React ko seedha JSON mile)
    const completion = await openai.chat.completions.create({
      model: "meta/llama-3.1-70b-instruct", // Tere snippet wala model
      messages: [
        {
          role: "system",
          content: `You are a Senior Product Manager and Tech Lead. 
          Your goal is to convert vague ideas into professional requirements.
          
          Output Format (Markdown):
          # Project Name
          
          ## 1. Problem Statement
          (Clear definition of the problem)
          
          ## 2. Core Features (MVP)
          - Feature 1: Description
          - Feature 2: Description
          
          ## 3. Tech Stack Recommendation
          - Frontend: ...
          - Backend: ...
          - DB: ...
          
          ## 4. Future Roadmap
          (What to add after launch)
          
          Tone: Professional, Concise, Actionable.
          Context: The user wants a ${type} for ${audience} with ${depth} details.`
        },
        {
          role: "user",
          content: `Here is the raw idea: "${idea}"`
        }
      ],
      temperature: 0.2, // Tere code se liya (Precise output ke liye)
      top_p: 0.7,
      max_tokens: 1024,
      stream: false // IMPORTANT: Isko false rakha hai taaki frontend crash na ho
    });

    // AI ka jawaab extract karna
    const result = completion.choices[0]?.message?.content || "No response generated.";
    
    // Frontend ko wapas bhejna
    res.json({ result });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Failed to generate requirements" });
  }
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});