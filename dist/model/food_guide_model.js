"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodGuideOptions = exports.FoodGuideFinalOutput = exports.FoodGuideQuestions = exports.FoodGuideQuestion = exports.FoodGuideOption = void 0;
const zod_1 = require("zod");
// Schema for FoodGuideOption  
const FoodGuideOption = zod_1.z.object({
    name: zod_1.z.string().describe("The name of the option (e.g., 'Caloric Breakdown', 'Meal Timing and Frequency')."),
    description: zod_1.z.string().describe("A description of what the option provides."),
});
exports.FoodGuideOption = FoodGuideOption;
// Schema for FoodGuideQuestion  
const FoodGuideQuestion = zod_1.z.object({
    question: zod_1.z.string().describe("The question to ask the user."),
    description: zod_1.z.string().describe("A short description explaining the purpose of the question."),
});
exports.FoodGuideQuestion = FoodGuideQuestion;
// Schema for FoodGuideQuestions  
const FoodGuideQuestions = zod_1.z.object({
    questions: zod_1.z.array(FoodGuideQuestion).describe("A list of questions with descriptions."),
});
exports.FoodGuideQuestions = FoodGuideQuestions;
// Schema for FoodGuideFinalOutput  
const FoodGuideFinalOutput = zod_1.z.object({
    caloric_breakdown: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).nullable(),
    meal_timing_and_frequency: zod_1.z.string().nullable(),
    high_protein_foods: zod_1.z.array(zod_1.z.string()).nullable(),
    carbohydrate_rich_foods: zod_1.z.array(zod_1.z.string()).nullable(),
    healthy_fats: zod_1.z.array(zod_1.z.string()).nullable(),
    sample_meal_plan: zod_1.z.record(zod_1.z.string(), zod_1.z.array(zod_1.z.string())).nullable(),
    // Add other fields as needed for different output types  
}).describe("The final output of the food guide including various nutritional details.");
exports.FoodGuideFinalOutput = FoodGuideFinalOutput;
// Schema for FoodGuideOptions  
const FoodGuideOptions = zod_1.z.object({
    options: zod_1.z.array(FoodGuideOption).describe("A list of food guide options."),
});
exports.FoodGuideOptions = FoodGuideOptions;
