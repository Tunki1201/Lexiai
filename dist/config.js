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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptTemplate = exports.ModelType = void 0;
exports.getPromptTemplate = getPromptTemplate;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const PROJECT_ROOT = ''; // Set your project root if needed
const PROMPTS = path.join(PROJECT_ROOT, 'prompt_templates');
var ModelType;
(function (ModelType) {
    ModelType["GPT4O"] = "gpt-4o-2024-08-06";
    ModelType["GPT4O_MINI"] = "gpt-4o-mini";
    ModelType["EMBEDDING"] = "text-embedding-3-large";
})(ModelType || (exports.ModelType = ModelType = {}));
var PromptTemplate;
(function (PromptTemplate) {
    PromptTemplate["GET_FOOD_GUIDE_OPTIONS"] = "get_food_guide_options.txt";
    PromptTemplate["GET_FOOD_GUIDE_QUESTIONS"] = "get_food_guide_questions.txt";
    PromptTemplate["GET_FINAL_OUTPUT"] = "get_final_output.txt";
})(PromptTemplate || (exports.PromptTemplate = PromptTemplate = {}));
function getPromptTemplate(promptTemplate) {
    const filePath = path.join(PROMPTS, promptTemplate);
    return fs.readFileSync(filePath, 'utf-8');
}
