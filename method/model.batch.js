import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
dotenv.config();
const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-3.6-flash",


});

// const response = await model.invoke("Hello world, how are you?");

 const newResponse = await  model.batch([
  "Hello world, how are you?",
  "What is the capital of France?",
  "Tell me a joke."
]);

console.log("response", newResponse);
