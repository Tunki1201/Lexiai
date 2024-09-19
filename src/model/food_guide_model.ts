export interface FoodGuideOption {
    /** The name of the option (e.g., 'Caloric Breakdown', 'Meal Timing and Frequency'). */
    name: string;
    /** A description of what the option provides. */
    description: string;
}

export interface FoodGuideQuestion {
    /** The question to ask the user. */
    question: string;
    /** A short description explaining the purpose of the question. */
    description: string;
}

export interface FoodGuideQuestions {
    /** A list of questions with descriptions. */
    questions: FoodGuideQuestion[];
}

export interface FoodGuideFinalOutput {
    /** Caloric breakdown of meals. */
    caloric_breakdown?: Record<string, string>;
    /** Guidance on meal timing and frequency. */
    meal_timing_and_frequency?: string;
    /** List of high-protein foods. */
    high_protein_foods?: string[];
    /** List of carbohydrate-rich foods. */
    carbohydrate_rich_foods?: string[];
    /** List of healthy fats. */
    healthy_fats?: string[];
    /** Sample meal plan. */
    sample_meal_plan?: Record<string, string[]>;
    // Add other fields as needed for different output types
}

export interface FoodGuideOptions {
    /** A list of food guide options. */
    options: FoodGuideOption[];
}
