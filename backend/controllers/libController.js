const pool = require('../db');
const query = require('../Queries/query');
import { chatGptQuery, levenshteinDistance, mergeArrayOfObjects } from '../utils/utilityFunctions';
const {Configuration,OpenAIApi} = require("openai");

const openai = new OpenAIApi(new Configuration({
    apiKey:process.env.CHATGPT_API_KEY
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
    pool.query(query.getAllNames, (err, result) => {
        if (err) {
            console.log('failed to fetch Alldata Array', err);
        } else {
            const booksArray = [];
            result.rows.forEach((book_name) => {
                booksArray.push(book_name.book_name);
            })
            const fuzzyBooksArray = [];
            booksArray.forEach((book) => {
                const distance = levenshteinDistance(book, name);
                const piece = [book, distance];
                fuzzyBooksArray.push(piece);
            });
            fuzzyBooksArray.sort((item1, item2) => item1[1] - item2[1]);
            const slicedFuzzyBooksArray = fuzzyBooksArray.slice(0, 5);
            console.log(slicedFuzzyBooksArray);
            const responseArray = [];
            const queryPromises = []; // Array to hold promises

            slicedFuzzyBooksArray.forEach((book) => {
                const bookName = book[0];
                const queryPromise = new Promise((resolve, reject) => {
                    pool.query(query.getBookByName, [bookName], (err, result) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            resolve(result.rows[0]);
                        }
                    });
                });
                queryPromises.push(queryPromise);
            });

            Promise.all(queryPromises)
                .then((results) => {
                    responseArray.push(...results);
                    const query = chatGptQuery(responseArray);
                    openai.createChatCompletion({
                        model:"gpt-3.5-turbo",
                        messages:[{role:"user", content:query}]
                    }).then(res=>{
                        const recievedData = JSON.parse(res.data.choices[0].message.content);
                        const mergedArray = mergeArrayOfObjects(responseArray,recievedData);
                    })
                    if (mergedArray.length === 0) {
                        res.status(500).send("Internal Server Error");
                    } else {
                        res.status(200).send(mergedArray);
                    }
                })
                .catch((error) => {
                    res.status(500).send("Internal Server Error",error);
                });
            

        }
    });



}