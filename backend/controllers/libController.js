const pool = require('../db');
const query = require('../queries/query');
const Fuse = require('fuse.js')


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
            
            if (responseArray.length === 0) {
                res.status(500).send("Internal Server Error", err);
            } else {
                res.status(200).send(fuse.search(searchPattern));
            }

        }
    });
};

exports.getDetails = (req,res)=>{
    const name = req.query.bookName;
    pool.query(query.getBookByName,[name],(err,result)=>{
        if(err){
            res.status(500).send("Internal Server Error",err)
        } else{
            res.status(200).send(result.rows)
        }
    })
}