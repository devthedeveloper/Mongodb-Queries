mongodb queries

//db.books.find({},{'here the fields which you want to return'})
// it will return only title and year
// 0 is for hide and 1 is for show
db.books.find({},{title:1,_id:0,year:1})

// using search $regex
db.books.find({title:/hey/i})

// using search $regex (^ start with hey and $ means end with hey)
db.books.find({title:/^hey$/i})

// using search $regex (.* search anything between h and y)
db.books.find({title:/h.*y/i})


// using greater then or equal to (find the book year greater or equal to 2000)
db.books.find({year:{$gte:2000}})

// using less then or equal to (find the book year less or equal to 2000)
db.books.find({year:{$lte:2000}})

// $or,$and,$nor,$not

// $or example (always takes an array as value)
// finds the values  between then year  greater or equal to 2000 and lesser or equal to 2009
db.books.find({
    $or : [
        {year:{$gte:2000}},
        {year:{$lte:2009}}
    ]
})

// $nor example (always takes an array as value)
// finds the values other then year  greater or equal to 2000 and lesser or equal to 2009
db.books.find({
    $or : [
        {year:{$gte:2000}},
        {year:{$lte:2009}}
    ]
})

//count
// returns number of matched documents
db.books.find({title:/war/i}).count();

//$mod
// modulus operator to get remainder (takes two params devider and expected remainder)
// query to get even years
db.books.find({
    year:{$mod:[2,0]}
}).count();

// $text
// used to search in indexed fields
// this will search for keyword war in title but title should be indexed
db.books.find({$text:{$search:"war"}});
// to make index use following
db.books.ensureIndex({title:'text'})
//MongoDB provides text indexes to support text search queries on string content. text indexes can include any field whose value is a string or an array of string elements.
//https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/#db.collection.createIndex
//https://docs.mongodb.com/manual/core/index-text/#index-feature-text

// $where
// where keyword is also used for $regex but only difference is that it will get through each record in the collection so its inefficient way
// takes two params, first is string "this" (this refrences to current document)
// get all records having length greater then 30
db.books.find({$where:'this.title.length>30'})
// can also take function and needs to return true or false
db.books.find({$where:function(){
    return this.title.length>80
}})

//$exists
//checking null values
// get all the records where year is null
db.books.find({year:null})
// get all the records where year is not associated
db.books.find({year:{$exists:false}})

// Subdocuments
// . operators should always in quotes
db.books.find({"author.name":"sherry"})