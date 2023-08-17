function min(a, b) {
    return (a < b) ? a : b;
}
function levenshteinDistance(str1, str2) {
    const str1Len = str1.length;
    const str2Len = str2.length;

    const d = new Array(str2Len + 1).fill().map(() => new Array(str1Len + 1).fill(0));

    for (let i = 0; i <= str1Len; i++) {
        d[0][i] = i;
    }

    for (let j = 0; j <= str2Len; j++) {
        d[j][0] = j;
    }

    for (let j = 1; j <= str1Len; j++) {
        for (let i = 1; i <= str2Len; i++) {
            const tracker = (str1[i - 1] === str2[j - 1]) ? 0 : 1;
            const temp = min(d[i - 1][j] + 1, d[i][j - 1] + 1);
            d[i][j] = min(temp, d[i - 1][j - 1] + tracker);
        }
    }

    return d[str2Len][str1Len];
}

function chatGptQuery(array){
    const booksNamesArray = [];
    array.forEach(element => {
        booksNamesArray.push(element.item.book_name);
    });
    let string = '';
    booksNamesArray.forEach((book)=>{
        string+=`${book}\n`;
    })
    const query = `I will provide you with 5 book names , give me the top 5 tags that describes that book and the symmary of the book in the format of an object like:
    [{
         "book_name":"string",
        "tags":[array of top 5 tags],
        "summary":"string"
    },
    //similarly for each book
    ]
    ${string}
    make a JSON object
    Dont give any affirmation like certainly, of Course etc , just give me the code snippet`;
    
    return query;
}

function mergeArrayOfObjects(arr1,arr2){
    const length = arr1.length;
    const mergedArray = [];
    for(let i=0;i<length;i++){
        mergedArray.push({
            id:arr1[i].id,
            book_name:arr1[i].book_name,
            author_name:arr1[i].author_name,
            key_takeaways:arr1[i].key_takeaways,
            tags:arr2[i].tags,
            summary:arr2[i].summary
        });
    };
    return mergeArrayOfObjects;
}

module.exports = {
     levenshteinDistance,
     chatGptQuery,
     mergeArrayOfObjects
}