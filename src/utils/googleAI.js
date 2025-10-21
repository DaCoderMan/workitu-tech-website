// Google AI API utility functions
const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY;

export async function generateContent(prompt, options = {}) {
  if (!GOOGLE_AI_API_KEY) {
    throw new Error('Google AI API key not configured');
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_AI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: options.temperature || 0.7,
          topK: options.topK || 40,
          topP: options.topP || 0.95,
          maxOutputTokens: options.maxTokens || 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Google AI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('No content generated');
    }
  } catch (error) {
    console.error('Google AI API error:', error);
    throw error;
  }
}

export async function generateProjectDescription(projectTitle, projectType) {
  const prompt = `Generate a compelling, professional description for a ${projectType} project titled "${projectTitle}". 
  The description should be 2-3 sentences, highlight key features and benefits, and be suitable for a portfolio website. 
  Focus on technical innovation, user experience, and business impact.`;

  try {
    return await generateContent(prompt, {
      temperature: 0.8,
      maxTokens: 200
    });
  } catch (error) {
    console.error('Error generating project description:', error);
    return `A ${projectType} project that showcases innovation and technical excellence. Built with modern technologies to deliver exceptional user experiences and measurable business results.`;
  }
}

export async function generateContentSuggestion(contentType, currentContent = '') {
  const prompts = {
    home: `Improve this home page content for a tech company called Workitu Tech that specializes in AI solutions, web development, and digital marketing. Make it more engaging and compelling while maintaining the professional tone: "${currentContent}"`,
    pricing: `Enhance this pricing page content for Workitu Tech's services (web development, AI solutions, e-commerce, digital marketing). Make it more persuasive and clear: "${currentContent}"`,
    contact: `Improve this contact page content to be more welcoming and encourage potential clients to reach out: "${currentContent}"`
  };

  const prompt = prompts[contentType] || `Improve this content while maintaining its professional tone: "${currentContent}"`;

  try {
    return await generateContent(prompt, {
      temperature: 0.7,
      maxTokens: 300
    });
  } catch (error) {
    console.error('Error generating content suggestion:', error);
    return currentContent; // Return original content if AI fails
  }
}

export async function analyzeProjectPerformance(projectData) {
  const prompt = `Analyze this portfolio project data and provide insights on how to improve its presentation and appeal to potential clients. 
  Project: ${JSON.stringify(projectData)}. 
  Provide 3-5 specific recommendations for improvement.`;

  try {
    return await generateContent(prompt, {
      temperature: 0.6,
      maxTokens: 400
    });
  } catch (error) {
    console.error('Error analyzing project performance:', error);
    return 'AI analysis temporarily unavailable. Please try again later.';
  }
}
