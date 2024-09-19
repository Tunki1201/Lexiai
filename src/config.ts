import * as fs from 'fs';
import * as path from 'path';

const PROJECT_ROOT = '';  // Set your project root if needed
const PROMPTS = path.join(PROJECT_ROOT, 'prompt_templates');

export enum ModelType {
    GPT4O = 'gpt-4o-2024-08-06',
    GPT4O_MINI = 'gpt-4o-mini',
    EMBEDDING = 'text-embedding-3-large',
}

export enum PromptTemplate {
    GET_FOOD_GUIDE_OPTIONS = 'get_food_guide_options.txt',
    GET_FOOD_GUIDE_QUESTIONS = 'get_food_guide_questions.txt',
    GET_FINAL_OUTPUT = 'get_final_output.txt',
}

export function getPromptTemplate(promptTemplate: PromptTemplate): string {
    const filePath = path.join(PROMPTS, promptTemplate);
    return fs.readFileSync(filePath, 'utf-8');
}
