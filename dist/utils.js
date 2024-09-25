"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFoodGuideOptions = getFoodGuideOptions;
exports.getFoodGuideQuestions = getFoodGuideQuestions;
exports.getFinalOutput = getFinalOutput;
const openai_1 = require("openai");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const food_guide_model_1 = require("./model/food_guide_model");
const config_1 = require("./config");
const zod_1 = require("openai/helpers/zod");
// Load environment variables from .env file  
require('dotenv').config();
const PROJECT_ROOT = ''; // Set your project root if needed
const PROMPTS = path.join(PROJECT_ROOT, 'prompt_templates');
// Initialize OpenAI openai with the API key from the environment variable  
const openai = new openai_1.OpenAI({ apiKey: process.env.OPENAI_API_KEY });
function getPromptTemplate(promptTemplate) {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = path.join(PROMPTS, promptTemplate);
        return fs.promises.readFile(filePath, 'utf-8');
    });
}
function getFoodGuideOptions(userInput, condition) {
    return __awaiter(this, void 0, void 0, function* () {
        // """Gets the final output based on selected options and user answers using ChatGPT."""
        let system_message = "You are a helpful food guide assistant.";
        if (condition) {
            system_message += `\nHere are some of the conditions that you must keep while generating a response:\n${condition}`;
        }
        const promptTemplate = yield getPromptTemplate(config_1.PromptTemplate.GET_FOOD_GUIDE_OPTIONS);
        const prompt = promptTemplate.replace('user_input', userInput);
        const completion = yield openai.beta.chat.completions.parse({
            model: "gpt-4o-2024-08-06",
            messages: [
                { role: "system", content: system_message },
                { role: "user", content: prompt },
            ],
            response_format: (0, zod_1.zodResponseFormat)(food_guide_model_1.FoodGuideOptions, 'food_guide_options'),
        });
        const responseContent = completion.choices[0].message.parsed;
        // Check if the response is null or not a string  
        if (!responseContent || typeof responseContent !== 'string') {
            throw new Error("Invalid response from the API.");
        }
        // Parse the response content into FoodGuideOptions  
        try {
            const options = JSON.parse(responseContent);
            return { options }; // Return in the expected structure  
        }
        catch (error) {
            throw new Error("Failed to parse the response content as FoodGuideOptions.");
        }
    });
}
function getFoodGuideQuestions(selectedOptions, condition) {
    return __awaiter(this, void 0, void 0, function* () {
        // """Gets the final output based on selected options and user answers using ChatGPT."""
        let system_message = "You are a helpful food guide assistant.";
        if (condition) {
            system_message += `\nHere are some of the conditions that you must keep while generating a response:\n${condition}`;
        }
        const selectedOptionsStr = selectedOptions.join(', ');
        const promptTemplate = yield getPromptTemplate(config_1.PromptTemplate.GET_FOOD_GUIDE_QUESTIONS);
        const prompt = promptTemplate.replace('selected_options', selectedOptionsStr);
        const completion = yield openai.beta.chat.completions.parse({
            model: config_1.ModelType.GPT4O,
            messages: [
                { role: "system", content: system_message },
                { role: "user", content: prompt },
            ],
            response_format: (0, zod_1.zodResponseFormat)(food_guide_model_1.FoodGuideQuestions, 'food_guide_questions'),
        });
        const responseContent = completion.choices[0].message.parsed;
        // Check if the response is null or not a string  
        if (!responseContent || typeof responseContent !== 'string') {
            throw new Error("Invalid response from the API.");
        }
        // Parse the response content into FoodGuideQuestions  
        try {
            // Assuming the API returns a structured JSON response  
            const questions = JSON.parse(responseContent);
            return { questions }; // Return in the expected structure of FoodGuideQuestions  
        }
        catch (error) {
            throw new Error("Failed to parse the response content as FoodGuideQuestions.");
        }
    });
}
function getFinalOutput(selectedOptions, userAnswers, condition) {
    return __awaiter(this, void 0, void 0, function* () {
        // """Gets the final output based on selected options and user answers using ChatGPT."""
        let system_message = "You are a helpful food guide assistant.";
        if (condition) {
            system_message += `\nHere are some of the conditions that you must keep while generating a response:\n${condition}`;
        }
        const foodGuideQuestions = yield getFoodGuideQuestions(selectedOptions, condition);
        const userAnswersStr = foodGuideQuestions.questions.map((q, i) => `${q.question}: "${userAnswers[i]}"`).join('\n');
        const promptTemplate = yield getPromptTemplate(config_1.PromptTemplate.GET_FINAL_OUTPUT);
        const prompt = promptTemplate.replace('user_answers', userAnswersStr);
        const completion = yield openai.beta.chat.completions.parse({
            model: config_1.ModelType.GPT4O,
            messages: [
                { role: "system", content: system_message },
                { role: "user", content: prompt },
            ],
            response_format: (0, zod_1.zodResponseFormat)(food_guide_model_1.FoodGuideFinalOutput, 'food_guide_final_output'),
        });
        return completion.choices[0].message.parsed;
    });
}
