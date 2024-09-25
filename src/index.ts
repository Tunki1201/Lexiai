import * as dotenv from 'dotenv';
import { getFoodGuideOptions, getFoodGuideQuestions, getFinalOutput } from './utils';

dotenv.config(); // Load environment variables  

async function main() {
    const userInput: string = "I want to gain bulk what foods are good."; // User's initial request  
    const condition = "Please do not use the letter 'r' in any of your output responses."
    // Step 1: Get food guide options (dynamically generated)  
    const foodGuideOptions = await getFoodGuideOptions(userInput, condition);
    console.log("Available Options:");
    foodGuideOptions.options.forEach(option => {
        console.log(`- ${option.name}: ${option.description}`);
    });

    // Step 2: User selects options (replace with actual user selection)  
    const selectedOptions: string[] = foodGuideOptions.options.map(option => option.name); // Example selection  

    // Step 3: Get questions based on selected options  
    const foodGuideQuestions = await getFoodGuideQuestions(selectedOptions, condition);
    console.log("\nQuestions to Ask:");
    foodGuideQuestions.questions.forEach(questionObj => {
        console.log(`- ${questionObj.question}`);
        console.log(`  (${questionObj.description})`);
    });

    // Step 4: User provides answers to questions (replace with actual user answers)  
    const userAnswers: string[] = [
        "Around 2,500 calories per day.",
        "I usually eat 3 main meals and 1 snack.",
        "I don’t have any dietary restrictions, but I prefer to avoid too much red meat.",
        "I’m aiming for a 500-calorie surplus.",
        "I work out in the evenings, around 6 PM, and I usually wake up around 7 AM."
    ];

    // Step 5: Get final output  
    const finalOutput = await getFinalOutput(selectedOptions, userAnswers, condition);
    console.log("\nFinal Output:");
    console.log(JSON.stringify(finalOutput, null, 2)); // Format output as JSON with indentation  
}

// Run the main function  
main().catch(err => {
    console.error("Error occurred:", err);
});
