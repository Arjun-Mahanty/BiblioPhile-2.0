const pool = require('./db');


categories = [
    "Adventure",
    "Fantasy",
    "Inspirational",
    "Self-Help",
    "Biography",
    "Psychology",
    "Non-fiction",
    "Spirituality",
    "Business",
    "Physics",
    "Electrical Engineering",
    "Computer"
]

pool.query("SELECT * FROM books",(err,result)=>{
    if(err){
        console.log(err);
    }else{
        result.rows.forEach(book=>{
            console.log(book.book_name)
        })
    }
})



