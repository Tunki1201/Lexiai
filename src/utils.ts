import { OpenAI } from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import { FoodGuideOptions, FoodGuideQuestions, FoodGuideFinalOutput, FoodGuideOption, FoodGuideQuestion } from './model/food_guide_model';
import { ModelType, PromptTemplate } from './config';
import * as dotenv from 'dotenv';

// Load environment variables from .env file  
require('dotenv').config();

const PROJECT_ROOT = '';  // Set your project root if needed
const PROMPTS = path.join(PROJECT_ROOT, 'prompt_templates');

// Initialize OpenAI client with the API key from the environment variable  
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getPromptTemplate(promptTemplate: PromptTemplate): Promise<string> {
    const filePath = path.join(PROMPTS, promptTemplate);
    return fs.promises.readFile(filePath, 'utf-8');
}

export async function getFoodGuideOptions(userInput: string, condition: string): Promise<FoodGuideOptions> {

    // """Gets the final output based on selected options and user answers using ChatGPT."""
    let system_message = "You are a helpful food guide assistant."
    if (condition) {
        system_message += `\nHere are some of the conditions that you must keep while generating a response:\n${condition}`

    }
    const promptTemplate = await getPromptTemplate(PromptTemplate.GET_FOOD_GUIDE_OPTIONS);
    const prompt = promptTemplate.replace('user_input', userInput);

    const response = await client.chat.completions.create({
        model: ModelType.GPT4O,
        messages: [
            { role: 'system', content: system_message },
            { role: 'user', content: prompt },
        ],
    });

    const responseContent = response.choices[0].message?.content;

    // Check if the response is null or not a string  
    if (!responseContent || typeof responseContent !== 'string') {
        throw new Error("Invalid response from the API.");
    }

    // Parse the response content into FoodGuideOptions  
    try {
        const options: FoodGuideOption[] = JSON.parse(responseContent);
        return { options }; // Return in the expected structure  
    } catch (error) {
        throw new Error("Failed to parse the response content as FoodGuideOptions.");
    }
}

export async function getFoodGuideQuestions(selectedOptions: string[], condition: string): Promise<FoodGuideQuestions> {

    // """Gets the final output based on selected options and user answers using ChatGPT."""
    let system_message = "You are a helpful food guide assistant."
    if (condition) {
        system_message += `\nHere are some of the conditions that you must keep while generating a response:\n${condition}`

    }
    const selectedOptionsStr = selectedOptions.join(', ');
    const promptTemplate = await getPromptTemplate(PromptTemplate.GET_FOOD_GUIDE_QUESTIONS);
    const prompt = promptTemplate.replace('selected_options', selectedOptionsStr);

    const response = await client.chat.completions.create({
        model: ModelType.GPT4O,
        messages: [
            { role: 'system', content: system_message },
            { role: 'user', content: prompt },
        ],
    });

    const responseContent = response.choices[0].message?.content;

    // Check if the response is null or not a string  
    if (!responseContent || typeof responseContent !== 'string') {
        throw new Error("Invalid response from the API.");
    }

    // Parse the response content into FoodGuideQuestions  
    try {
        // Assuming the API returns a structured JSON response  
        const questions: FoodGuideQuestion[] = JSON.parse(responseContent);
        return { questions }; // Return in the expected structure of FoodGuideQuestions  
    } catch (error) {
        throw new Error("Failed to parse the response content as FoodGuideQuestions.");
    }
}

export async function getFinalOutput(selectedOptions: string[], userAnswers: string[], condition: string): Promise<FoodGuideFinalOutput> {
    const foodGuideQuestions = await getFoodGuideQuestions(selectedOptions, condition);

    const userAnswersStr = foodGuideQuestions.questions.map((q, i) => `${q.question}: "${userAnswers[i]}"`).join('\n');
    const promptTemplate = await getPromptTemplate(PromptTemplate.GET_FINAL_OUTPUT);
    const prompt = promptTemplate.replace('user_answers', userAnswersStr);

    const response = await client.chat.completions.create({
        model: ModelType.GPT4O,
        messages: [
            { role: 'system', content: 'You are a helpful food guide assistant.' },
            { role: 'user', content: prompt },
        ],
    });

    return response.choices[0].message?.content as FoodGuideFinalOutput;
}
