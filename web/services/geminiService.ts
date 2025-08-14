
import { GoogleGenAI, Type } from "@google/genai";

// Ensure the API key is handled securely and not hard-coded.
// For a client-side app, this is tricky. This assumes the key is
// provided via an environment variable during the build process.
const API_KEY = process.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Smart Add feature will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

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
  if (!API_KEY) {
    return [];
  }
  
  try {
    const prompt = `Break down the following complex task into smaller, actionable sub-tasks. Return only a JSON array of strings. Task: "${mainTask}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subtasks: subtaskSchema
          }
        }
      },
    });

    const jsonResponse = JSON.parse(response.text);
    const subtasks = jsonResponse?.subtasks?.map((item: any) => item.taskName) || [];
    return subtasks.filter((task: any) => typeof task === 'string' && task.trim() !== '');

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return [];
  }
}
