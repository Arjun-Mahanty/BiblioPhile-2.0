const getAllData = "SELECT * FROM data";
const getBookByName = "SELECT * FROM data WHERE book_name = $1";
const Names_authors = "SELECT book_name,author_name FROM data";


module.exports = {
    getAllData,
    getBookByName,
    Names_authors
}