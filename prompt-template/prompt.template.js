import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-3.6-flash",
  temperature: 0.7,
});

//create a prompt template
// const prompt = await ChatPromptTemplate.fromTemplate(
//   "Write a story about {topic} in 100 words or less.",
// );

 const prompt = ChatPromptTemplate.fromMessages([
    {
        role: "system",
        content: "You are a helpful assistant that writes stories about a given topic in 10 words or less.",
    },
    {
        role: "user",
        content: "Write a story about {topic} in 100 words or less.",
    }
 ])

const chain = prompt.pipe(model);

const response = await chain.invoke({ topic: "AI" });

console.log("response", response);