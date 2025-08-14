
import { GoogleGenAI, Type } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const subtaskSchema = {
  type: Type.OBJECT,
  properties: {
    subtasks: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of small, actionable sub-tasks.",
    },
  },
  required: ["subtasks"],
};

export const getTaskSuggestions = async (prompt: string): Promise<string[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY not configured.");
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a productivity assistant. Break down the following user request into a list of simple, actionable sub-tasks. Request: "${prompt}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: subtaskSchema,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    if (result && Array.isArray(result.subtasks)) {
      return result.subtasks;
    }
    
    return [];

  } catch (error) {
    console.error("Error fetching task suggestions from Gemini API:", error);
    // Gracefully return an empty array or throw a custom error
    throw new Error("Failed to generate task suggestions.");
  }
};
