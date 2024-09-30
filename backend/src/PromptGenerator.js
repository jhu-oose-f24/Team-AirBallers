import axios from 'axios';

class PromptGenerator {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.openai.com/v1/chat/completions';
  }

  async generatePrompt(systemMessage, userMessage, model = 'gpt-3.5-turbo') {
    try {
      const response = await axios.post(
        this.baseURL,
        {
          model: model,
          messages: [
            { role: 'system', content: systemMessage },
            { role: 'user', content: userMessage }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating prompt:', error);
      throw error;
    }
  }
}

export default PromptGenerator;