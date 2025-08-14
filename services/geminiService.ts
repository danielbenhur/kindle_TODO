import { GoogleGenAI, Type } from "@google/genai";

// Use the standard process.env.API_KEY which is available in AI Studio.
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("Gemini API key not found. Smart Add feature will be disabled.");
}

const subtaskSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      taskName: {
        type: Type.STRING,
        description: "The name of the sub-task.",
      },
    },
    required: ["taskName"],
  },
};

export async function getSubtasks(mainTask: string): Promise<string[]> {
  if (!ai) {
    return [];
  }
  
  try {
    const prompt = `Break down the following complex task into smaller, actionable sub-tasks. Return only a JSON array of objects, where each object has a 'taskName' property. Task: "${mainTask}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subtasks: subtaskSchema
          },
          required: ["subtasks"],
        }
      },
    });
    
    // The response text from the API should be a clean JSON string now
    const jsonText = response.text.trim();
    const jsonResponse = JSON.parse(jsonText);
    const subtasks = jsonResponse?.subtasks?.map((item: any) => item.taskName) || [];
    return subtasks.filter((task: any) => typeof task === 'string' && task.trim() !== '');

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return [];
  }
}
