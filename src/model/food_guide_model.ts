import { z } from "zod";  
import { zodResponseFormat } from "openai/helpers/zod";  

// Type Aliases
type FoodGuideOptionType = z.infer<typeof FoodGuideOption>;
type FoodGuideQuestionType = z.infer<typeof FoodGuideQuestion>;
type FoodGuideQuestionsType = z.infer<typeof FoodGuideQuestions>;
type FoodGuideFinalOutputType = z.infer<typeof FoodGuideFinalOutput>;
type FoodGuideOptionsType = z.infer<typeof FoodGuideOptions>;

// Schema for FoodGuideOption  
const FoodGuideOption = z.object({  
    name: z.string().describe("The name of the option (e.g., 'Caloric Breakdown', 'Meal Timing and Frequency')."),  
    description: z.string().describe("A description of what the option provides."),  
});  

// Schema for FoodGuideQuestion  
const FoodGuideQuestion = z.object({  
    question: z.string().describe("The question to ask the user."),  
    description: z.string().describe("A short description explaining the purpose of the question."),  
});  

// Schema for FoodGuideQuestions  
const FoodGuideQuestions = z.object({  
    questions: z.array(FoodGuideQuestion).describe("A list of questions with descriptions."),  
});  

// Schema for FoodGuideFinalOutput  
const FoodGuideFinalOutput = z.object({  
    caloric_breakdown: z.record(z.string(), z.string()).optional(),  
    meal_timing_and_frequency: z.string().optional(),  
    high_protein_foods: z.array(z.string()).optional(),  
    carbohydrate_rich_foods: z.array(z.string()).optional(),  
    healthy_fats: z.array(z.string()).optional(),  
    sample_meal_plan: z.record(z.string(), z.array(z.string())).optional(),  
    // Add other fields as needed for different output types  
}).describe("The final output of the food guide including various nutritional details.");  

// Schema for FoodGuideOptions  
const FoodGuideOptions = z.object({  
    options: z.array(FoodGuideOption).describe("A list of food guide options."),  
});  

// Exporting the schemas for use in validation or type inference  
export {  
    FoodGuideOption,  
    FoodGuideQuestion,  
    FoodGuideQuestions,  
    FoodGuideFinalOutput,  
    FoodGuideOptions  
};
