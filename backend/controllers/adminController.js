const pool = require('../db');
const query = require('../queries/query');

const dotenv = require('dotenv');
const path = require('path')

const envPath = path.resolve(__dirname,'../.env');

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.CHATGPT_API_KEY
}));

dotenv.config({path:envPath});

exports.add = async (req,res)=>{
    const name = req.body.name;
    const APP_URI = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(name)}&key=${process.env.GOOGLE_BOOKS_API}`;
    async function getImg(){
        return new Promise(async(resolve,reject)=>{
            const response = await axios.get(APP_URI);
            if(response){
                resolve(response.items[0].volumeInfo.imageLinks.thumbnail);
            }else{
                console.log(response);
                reject();
            }
        })
    } 
    const book_image_link = await getImg();
    
    const book_name = name;
    
    
    const data = {};

}

exports.delete = (req,res)=>{
    
}
exports.update = (req,res)=>{
    
}