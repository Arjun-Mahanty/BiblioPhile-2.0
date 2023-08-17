const pool = require('../db');
const query = require('../Queries/query');
const { chatGptQuery, levenshteinDistance, mergeArrayOfObjects } = require('../utils/utilityFunctions');
const { Configuration, OpenAIApi } = require("openai");
const Fuse = require('fuse.js')

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.CHATGPT_API_KEY
}));

exports.getAll = (req, res) => {
    pool.query(query.getAllData, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.status(200).json(result.rows);
        }
    })
}



exports.getByName = async (req, res) => {
    
    const name = req.params.name;
    pool.query(query.getAllData, (err, result) => {
        if (err) {
            console.log('failed to fetch Alldata Array', err);
        } else {
            const obj = result.rows;
            const fuseOptions = {
                keys: [
                    "book_name",
                    "author_name"
                ]
            };
            const fuse = new Fuse(obj, fuseOptions);
            const searchPattern = name;
            const responseArray = fuse.search(searchPattern);
            // const query = chatGptQuery(responseArray);
            // openai.createChatCompletion({
            //     model: "gpt-3.5-turbo",
            //     messages: [{ role: "user", content: query }]
            // }).then(res => {
            //     const recievedData = JSON.parse(res.data.choices[0].message.content);
            //     const mergedArray = mergeArrayOfObjects(responseArray, recievedData);
            // })
            if (responseArray.length === 0) {
                res.status(500).send("Internal Server Error", error);
            } else {
                res.status(200).send(fuse.search(searchPattern));
            }

        }
    });



}