import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// Always initialize with the named parameter apiKey from process.env.API_KEY
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey });

export const generateAIResponse = async (
  history: ChatMessage[], 
  currentMessage: string, 
  contextData: any
): Promise<string> => {
  try {
    // Select gemini-3-flash-preview for general assistant tasks
    const model = 'gemini-3-flash-preview';
    
    // Construct system instruction based on context
    const systemInstruction = `
      You are a helpful travel assistant for Lion Travel (雄獅旅行社).
      Current Trip Context:
      Destination: ${contextData.destination}
      Dates: ${contextData.startDate} to ${contextData.endDate}
      Current Itinerary Items: ${contextData.items.map((i: any) => i.name).join(', ')}
      
      Keep answers concise (under 100 words) and friendly.
      If asked about weather, assume typical weather for the destination/date.
      If asked for packing tips, use the context.
    `;

    // Simply concatenate text history for generating content
    const contents = history
      .filter(msg => msg.role !== 'model') 
      .map(msg => msg.text)
      .join('\n');
    
    const finalPrompt = `${contents}\nUser: ${currentMessage}`;

    const response = await ai.models.generateContent({
      model: model,
      contents: finalPrompt,
      config: {
        systemInstruction: systemInstruction,
        thinkingConfig: { thinkingBudget: 0 } // Optimization for response speed
      }
    });

    return response.text || "I couldn't generate a response at the moment.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the Lion Travel brain right now. Please try again later.";
  }
};

export const generatePackingList = async (destination: string, month: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, bulleted packing list for a trip to ${destination} in ${month}. Include 3 "Smart Items" based on weather.`,
    });
    return response.text || "Could not generate list.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating packing list.";
  }
}