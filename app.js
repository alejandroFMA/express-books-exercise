const books = require('./data/books.json'); //trae datos como un array
const express = require('express')

const app = express()
const port = 3000



app.use(express.json()); //Habilito recepcion de json en servidor


app.get('/', (req, res) => {
    res.json("Welcome to the library of books");
});
//Create a route `/all` to fetch all books
app.get('/all', (req, res) => {
    res.json(books);
});

//Create a route `/first` to fetch the first book
app.get('/first', (req, res) => {
    res.json(books[0]);
});

//Create a route `/last` to fetch the last book
app.get('/last', (req, res) => {
    res.json(books[books.length-1]);
});

//Create a route `/middle` to fetch the book in the middle (number 50 in the array)
app.get('/middle', (req, res) => {
    res.json(books[Math.floor(books.length/2)])
});

//Create a route `/author/dante-alighieri` to fetch **ONLY THE TITLE** of `Dante Alighieri`'s book
app.get('/author/dante-alighieri', (req, res) => {
    const book = books.find((book) => book.author === 'Dante Alighieri'); //se usa find para encontrar el primero que consiga cumplir la condicion
    res.json(book.title);
});

//Create a route `/country/charles-dickens` to fetch **ONLY THE COUNTRY** of `Charles Dickens` book
app.get('/country/charles-dickens', (req, res) => {
    const book = books.find((book) => book.author === 'Charles Dickens');
    res.json(book.country);
});

//Create a route `/year&pages/cervantes` to fetch **PAGES AND YEAR** of `Miguel de Cervantes` book, Response example: `{ pages: ..., year: ... }`
app.get('/year&pages/cervantes', (req, res) => {
    const book = books.find((book) => book.author === 'Miguel de Cervantes');
    res.json({ pages: book.pages, year: book.year });
});

//Create a route `/country/count/spain` to fetch **THE NUMBER OF BOOK** from `Spain`
app.get('/country/count/spain', (req, res) => {
    const book = books.filter((book) => book.country === 'Spain'); //se usa filter para devolver un array, no el primero que cumpla condicion
    res.json(book.length);
});

//Create a route `/country/at-least/germany` to fetch **TRUE OR FALSE** depending on if there is or not a book from `Germany`
app.get('/country/at-least/germany', (req, res) => {
    const bookGermany = books.some((book) => book.country === 'Germany');
    res.json(bookGermany); // //some se usa cuando hay al menos un elemento en el array que cumple condicion y devuelve booleano
});


//Create a route `/pages/all-greater/200` to fetch **TRUE OR FALSE** depending on if every books contain more then `200` pages
app.get('/pages/all-greater/200', (req, res) => {
    const book200 = books.filter((book) => book.pages > 200); //se usa filter para devolver un array, no el primero que cumpla condicion
    res.json(book200.length === books.length);
    console.log(book200)
});
  

app.listen(port, () => { //puerto por donde sale la respuesta a la peticion
    console.log(`Example app listening on port on http://localhost:${port}`) 
  });