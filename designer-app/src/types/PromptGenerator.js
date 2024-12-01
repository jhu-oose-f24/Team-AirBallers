import { GarmentTypes } from "@/types/GarmentParser";
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

function resolveAsset(promptAsset = "") {
  const fullPath = path.resolve(`src/assets/${promptAsset}.md`);
  return readFileSync(fullPath, { encoding: "utf-8" });
}

/** @hideconstructor */
export default class PromptGenerator {
  static ASSETS = {
    CREATIVE: () => resolveAsset("creativePrompt"),
    IMAGE: () => resolveAsset("imagePrompt"),
    SPEC: (schemaStr = "") => {
      return resolveAsset("specPrompt").replace("JSON_SCHEMA", schemaStr);
    },
    // TODO: insert dynamic list of garment types to pick from
    CLASSIFY: () => {
      return resolveAsset("classifyPrompt").replace(
        "GARMENT_TYPES",
        JSON.stringify(Object.keys(GarmentTypes), null, 2),
      );
    },
  };

  /**
   * @param {string} systemPrompt
   * @param {string} userPrompt // TODO: use class
   * @returns {Promise<string>} // TODO: use class
   */
  static async generateFrom(systemPrompt, userPrompt, model = defaultModel) {
    return await apiOpenAI
      .post("/chat/completions", {
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      })
      .then(({ data }) => data.choices[0].message.content);
  }
}
