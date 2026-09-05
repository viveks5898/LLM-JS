import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-3.6-flash",
  temperature: 0.7,
});

const prompt =  ChatPromptTemplate.fromTemplate(`
    Answer the following {input}
    `);

const chain = prompt.pipe(model);


const response  = await chain.invoke({
    input:"what is the LCEL"
})


console.log("response", response)