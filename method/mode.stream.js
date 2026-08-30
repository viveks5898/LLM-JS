import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
dotenv.config();
const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-3.6-flash",


});

 const  newResponse  = await model.stream("Hey write a story about AI")

   for await ( const chunk of newResponse) {
    console.log("chunk", chunk?.content);
   }
