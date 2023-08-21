const { Configuration, OpenAIApi } = require("openai");
const path = require('path')
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname,'../.env');

dotenv.config({path:envPath});

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.CHATGPT_API_KEY
}));

exports.handleGPTQurery = (req,res)=>{
    // const query = req.body.prompt;
    // const data = {
    //     text:`${query} answered`,
    //     isAi:true
    // }
    // res.send(data);

    const query = req.body.prompt;
    let data;
    openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: query }]
    }).then(response=>{
      data = {text:response.data.choices[0].message.content,isAi:true}
      res.send(data);
    }).catch(error =>{
        console.log(error);
    })


};

exports.init = (req,res)=>{
    const name = req.query.bookName;
    const query = `get ready to answer questions on ${name} book`;
    openai.createChatCompletion({
        model:"gpt-3.5-turbo",
        messages:[{role:"user",content:query}]
    }).then(response=>{
        console.log("gpt ready");
        res.status(200).send("ok");
    }).catch(err=>{
        console.log(err);
    })
}