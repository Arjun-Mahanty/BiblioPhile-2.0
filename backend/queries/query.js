const getAllData = "SELECT * FROM books";
const getBookByName = "SELECT * FROM books WHERE book_name = $1";
const getAllNames = "SELECT book_name FROM books"

module.exports = {
    getAllData,
    getBookByName,
    getAllNames
}