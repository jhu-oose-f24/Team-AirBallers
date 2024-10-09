import axios from "axios";
import { readFileSync } from "fs";
import path from "path";

const defaultModel = "gpt-3.5-turbo";
const baseURL = "https://api.openai.com/v1";
const apiKey = process.env.OPENAI_API_KEY;

const apiOpenAI = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
});

/** @hideconstructor */
export default class PromptGenerator {
  static PROMPT_ASSET = {
    CREATIVE: "creativePrompt",
    SPEC: "specPrompt",
  };

  /**
   * @param {string} promptAsset
   * @param {string} userPrompt // TODO: use class
   * @returns {Promise<string>} // TODO: use class
   */
  static async generateFrom(promptAsset, userPrompt, model = defaultModel) {
    const systemMessage = readFileSync(
      path.resolve(`src/app/assets/${promptAsset}.md`),
      { encoding: "utf-8" },
    );

    return await apiOpenAI
      .post("/chat/completions", {
        model,
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: userPrompt },
        ],
      })
      .then(({ data }) => data.choices[0].message.content);
  }
}
