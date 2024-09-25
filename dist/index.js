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
const dotenv = __importStar(require("dotenv"));
const utils_1 = require("./utils");
dotenv.config(); // Load environment variables  
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const userInput = "I want to gain bulk what foods are good."; // User's initial request  
        // Step 1: Get food guide options (dynamically generated)  
        const foodGuideOptions = yield (0, utils_1.getFoodGuideOptions)(userInput);
        console.log("Available Options:");
        foodGuideOptions.options.forEach(option => {
            console.log(`- ${option.name}: ${option.description}`);
        });
        // Step 2: User selects options (replace with actual user selection)  
        const selectedOptions = foodGuideOptions.options.map(option => option.name); // Example selection  
        // Step 3: Get questions based on selected options  
        const foodGuideQuestions = yield (0, utils_1.getFoodGuideQuestions)(selectedOptions);
        console.log("\nQuestions to Ask:");
        foodGuideQuestions.questions.forEach(questionObj => {
            console.log(`- ${questionObj.question}`);
            console.log(`  (${questionObj.description})`);
        });
        // Step 4: User provides answers to questions (replace with actual user answers)  
        const userAnswers = [
            "Around 2,500 calories per day.",
            "I usually eat 3 main meals and 1 snack.",
            "I don’t have any dietary restrictions, but I prefer to avoid too much red meat.",
            "I’m aiming for a 500-calorie surplus.",
            "I work out in the evenings, around 6 PM, and I usually wake up around 7 AM."
        ];
        // Step 5: Get final output  
        const finalOutput = yield (0, utils_1.getFinalOutput)(selectedOptions, userAnswers);
        console.log("\nFinal Output:");
        console.log(JSON.stringify(finalOutput, null, 2)); // Format output as JSON with indentation  
    });
}
// Run the main function  
main().catch(err => {
    console.error("Error occurred:", err);
});
