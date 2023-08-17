const getAllData = "SELECT * FROM books";
const getBookByName = "SELECT * FROM books WHERE book_name = $1";
const Names_authors = "SELECT book_name,author_name FROM books"

module.exports = {
    getAllData,
    getBookByName,
    Names_authors
}