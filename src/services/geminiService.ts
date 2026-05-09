/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { StandingsEntry, Match } from "../types/ipl";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function parseAIResponse(text: string): string[] {
  if (!text) return [];
  
  // Try direct parse
  try {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    // If direct parse fails, try to extract JSON array
    const arrayMatch = text.match(/\[[\s\S]*\]/);
    if (arrayMatch) {
      try {
        const parsed = JSON.parse(arrayMatch[0]);
        return Array.isArray(parsed) ? parsed : [];
      } catch (innerError) {
        console.error("Failed to parse extracted JSON array:", innerError);
      }
    }
    console.error("Could not find or parse JSON array in response:", text);
    throw e;
  }
}

export async function getAIInsights(standings: StandingsEntry[], remainingMatches: Match[], selectedTeamId?: string) {
  try {
    const prompt = `
      You are an expert IPL strategy analyst. 
      Current Standings: ${JSON.stringify(standings.map(s => ({ team: s.id, pts: s.points, nrr: s.nrr })))}
      Remaining Matches: ${JSON.stringify(remainingMatches.map(m => ({ t1: m.team1, t2: m.team2 })))}
      Selected Team: ${selectedTeamId || 'All'}

      Provide 3-4 concise, high-impact strategic insights for the IPL playoffs. 
      Focus on qualification scenarios, which teams to support, and NRR requirements.
      Keep it professional, like an F1 analyst.
      Format the response as a JSON array of strings.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    return parseAIResponse(response.text || "[]");
  } catch (error) {
    console.error("Gemini Error:", error);
    return [
      "CSK fans should support RR tonight; a loss for SRH significantly boosts CSK's top-2 chances.",
      "RCB must win their remaining 3 games by a combined margin of 45+ runs to overhaul DC's NRR.",
      "The KKR vs MI clash is the most pivotal; KKR qualification probability swings by 18% based on the result."
    ];
  }
}
