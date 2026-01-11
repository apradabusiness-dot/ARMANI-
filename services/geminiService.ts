
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getFortuneMessage = async (prizeName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a representative for Giorgio Armani. 
      The user just won a "${prizeName}" on a luxury lucky spin wheel. 
      Give them a short, sophisticated message (max 2 sentences) in Indonesian about how they can use this voucher to elevate their style with Armani's timeless elegance. 
      Keep the tone very formal, luxurious, and refined.`,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "Selamat! Keanggunan abadi Armani kini menjadi milik Anda.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Keberuntungan yang luar biasa menyertai langkah Anda. Selamat menikmati kemewahan eksklusif dari Giorgio Armani.";
  }
};
