const { Configuration, OpenAIApi } = require("openai");
const path = require('path')
const dotenv = require('dotenv');
const { OpenAI } = require("langchain/llms/openai");
// const  { LLMChain } = require("langchain/chains");
// const  { PromptTemplate } = require("langchain/prompts");

// const llm = new OpenAI({
//     openAIApiKey:process.env.CHATGPT_API_KEY,
//   });

// const tagsPrompt = PromptTemplate.fromTemplate("")

// const tagsChain = new LLMChain({
//     llm,
//     tagsPrompt
// })

const envPath = path.resolve(__dirname,'../.env');

dotenv.config({path:envPath});

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.CHATGPT_API_KEY
}));

let conversationsArray = [];

async function sendMessage(prompt){
    conversationsArray.push({text:prompt,isAi:false});
    openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: buildPrompt(conversationsArray) }]
    }).then(res=>{
        const data = {text:res.data.choices[0].message.content,isAi:true};
        conversationsArray.push(data);
        return data;
    }).catch(err=>{
        console.log(err);
    })
}

// function buildPrompt(history){
//     let prompt = '';
//     for(const message of history){
//         prompt += `${message.isAi?"assistant":"user"}:${message.text}`
//     }
//     return prompt;
// }

exports.handleGPTQurery = async(req,res)=>{
    // const query = req.body.prompt;
    // const data = {
    //     text:`${query} answered`,
    //     isAi:true
    // }
    // res.send(data);
    const query = req.body.prompt;
    const data = await sendMessage(query);
    if(data){
        res.send(data);
    }else(res.status(500).send("internal error"));
};

exports.init = (req,res)=>{
    const name = req.query.bookName;
    const data = {text:`get ready to answer questions on ${name} book`,isAi:false};
    conversationsArray.push(data);
}