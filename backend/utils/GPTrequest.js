const { Configuration, OpenAIApi } = require("openai");

const path = require('path')
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname,'../.env');
dotenv.config({path:envPath});

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.CHATGPT_API_KEY
}));


exports.handleGPTreq=(query)=>{
    openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content:query}]
    }).then(res=>{
        const data = {text:res.data.choices[0].message.content,isAi:true};
        return data;
    }).catch(err=>{
        console.log(err);
    })
}

