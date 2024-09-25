import { OpenAI } from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import { FoodGuideOptions, FoodGuideQuestions, FoodGuideFinalOutput } from './model/food_guide_model';
import { ModelType, PromptTemplate } from './config';
import * as dotenv from 'dotenv';
import { json } from 'stream/consumers';
import { zodResponseFormat } from 'openai/helpers/zod';

// Load environment variables from .env file  
require('dotenv').config();

const PROJECT_ROOT = '';  // Set your project root if needed
const PROMPTS = path.join(PROJECT_ROOT, 'prompt_templates');

// Initialize OpenAI openai with the API key from the environment variable  
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getPromptTemplate(promptTemplate: any) {
    const filePath = path.join(PROMPTS, promptTemplate);
    return fs.promises.readFile(filePath, 'utf-8');
}

export async function getFoodGuideOptions(userInput: any, condition: any) {

    // """Gets the final output based on selected options and user answers using ChatGPT."""
    let system_message = "You are a helpful food guide assistant."
    if (condition) {
        system_message += `\nHere are some of the conditions that you must keep while generating a response:\n${condition}`

    }
    const promptTemplate = await getPromptTemplate(PromptTemplate.GET_FOOD_GUIDE_OPTIONS);
    const prompt = promptTemplate.replace('user_input', userInput);

    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        messages: [
            { role: "system", content: system_message },
            { role: "user", content: prompt },
        ],
        response_format: zodResponseFormat(FoodGuideOptions, 'food_guide_options'),
    });

    const responseContent = completion.choices[0].message.parsed;
    if (!responseContent) {
        console.log('An error was occured');
    }
    return responseContent
}

export async function getFoodGuideQuestions(selectedOptions: any, condition: any) {

    // """Gets the final output based on selected options and user answers using ChatGPT."""
    let system_message = "You are a helpful food guide assistant."
    if (condition) {
        system_message += `\nHere are some of the conditions that you must keep while generating a response:\n${condition}`

    }
    const selectedOptionsStr = selectedOptions.join(', ');
    const promptTemplate = await getPromptTemplate(PromptTemplate.GET_FOOD_GUIDE_QUESTIONS);
    const prompt = promptTemplate.replace('selected_options', selectedOptionsStr);

    const completion = await openai.beta.chat.completions.parse({
        model: ModelType.GPT4O,
        messages: [
            { role: "system", content: system_message },
            { role: "user", content: prompt },
        ],
        response_format: zodResponseFormat(FoodGuideQuestions, 'food_guide_questions'),
    });

    const responseContent = completion.choices[0].message.parsed;
    if (!responseContent) {
        console.log('An error was occured');
    }
    return responseContent
}

export async function getFinalOutput(selectedOptions: any, userAnswers: any, condition: any) {
    // """Gets the final output based on selected options and user answers using ChatGPT."""
    let system_message = "You are a helpful food guide assistant."
    if (condition) {
        system_message += `\nHere are some of the conditions that you must keep while generating a response:\n${condition}`

    }
    const foodGuideQuestions = await getFoodGuideQuestions(selectedOptions, condition);

    if (!foodGuideQuestions) {
        throw new Error("Failed to retrieve food guide questions.");
    }

    // Prepare user answers string
    const userAnswersStr = foodGuideQuestions.questions.map((q: any, i: number) => `${q.question}: "${userAnswers[i]}"`).join('\n');

    // Get the prompt template
    const promptTemplate = await getPromptTemplate(PromptTemplate.GET_FINAL_OUTPUT);

    // Ensure promptTemplate is defined
    if (!promptTemplate) {
        throw new Error("Prompt template could not be retrieved.");
    }

    // Replace placeholder in prompt template
    const prompt = promptTemplate.replace('user_answers', userAnswersStr);

    const completion = await openai.beta.chat.completions.parse({
        model: ModelType.GPT4O,
        messages: [
            { role: "system", content: system_message },
            { role: "user", content: prompt },
        ],
        response_format: zodResponseFormat(FoodGuideFinalOutput, 'food_guide_final_output'),
    });

    return completion.choices[0].message.parsed;

}
