import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { CommaSeparatedListOutputParser } from "@langchain/core/output_parsers";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import dotenv from "dotenv";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-3.6-flash",
  temperature: 0.7,
});

async function CallStringOutputParser() {
  const prompt = ChatPromptTemplate.fromMessages([
    {
      role: "system",
      content:
        "You are a helpful assistant that writes stories about a given topic in 100 words or less.",
    },
    {
      role: "user",
      content: "Write a story about {topic} in 100 words or less.",
    },
  ]);
  const parser = new StringOutputParser();
  const chain = prompt.pipe(model).pipe(parser);

  return await chain.invoke({ topic: "AI" });
}

async function callCommaSeparatedaListOutputParser() {
  const pompt = ChatPromptTemplate.fromTemplate(`
    Provide 5 synonoms for the word {word} in a comma separated list.
    `);

  const outputParser = new CommaSeparatedListOutputParser();

  const chain = pompt.pipe(model).pipe(outputParser);

  return await chain.invoke({
    word: "Happy",
  });
}

async function GetresultInJS() {
  const pompt = ChatPromptTemplate.fromTemplate(`
    Extract information from the Followig phrase.
    Format instruction : {format_instructions}
    Phrase:{phrase}
    `);

    const outputParser = StructuredOutputParser.fromNamesAndDescriptions({
      name:"the name of the person",
      age:"the age of the person"
    })

     const chain = pompt.pipe(model).pipe(outputParser)

     return await  chain.invoke({
      phrase :"max is 30 years old",
      format_instructions: outputParser.getFormatInstructions()
     })
}

// const response = await CallStringOutputParser();
// const response = await callCommaSeparatedaListOutputParser();

const response = await GetresultInJS()

console.log("response", response);
