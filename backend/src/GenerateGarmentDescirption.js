import PromptGenerator from './PromptGenerator.js';
import dotenv from 'dotenv';

dotenv.config();

async function GenerateGarmentDescription(userMessage) {
    const apiKey = process.env.OPENAI_API_KEY;
    const promptGenerator = new PromptGenerator(apiKey);

    const systemMessage = `You are an expert fashion designer tasked with describing a garment based on a user input. You will be given a user message where the user will describe a garment they want designed such as a t-shirt, pants, etc. Your goal is to provide a descriptive and creative layout for what the garment might look like, such as adding graphics to a t-shirt, providing a different cut pants, etc. Be as creative and descriptive as possible.

                            This garment description will be used by other fashion designers to design the piece so make sure to include the following information about the garment.

                            T-shirt neccesities:
                            1. Fabric
                            2. Fit
                            3. Neckline
                            4. Sleeves
                            5. Length
                            6. Hemline
                            7. Design/Pattern (make sure to describe what type of graphic might be included or design, be creative)
                            8. Details and Embellishments
                            9. Color (make sure to include the hex color value)

                            For measurements, make sure to report numbers (if necessary) as centimeters.
                            Additionally, keep the response to 1500 words maximum`;

    try {
        const description = await promptGenerator.generatePrompt(systemMessage, userMessage);
        return description;
    } catch (error) {
        console.error('Error generating garment description:', error);
        throw error;
    }
}

export default GenerateGarmentDescription;