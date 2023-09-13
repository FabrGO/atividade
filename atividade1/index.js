const express = require("express");
const exphbs = require("express-handlebars");

const conn = require("./db/conn");

const Book = require("./models/Book");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

//Mostrar o formuário
app.get("/books/create", (request, response) => {
  return response.render("addbook");
});

//Cadastrar as informações do formulário
app.post("/books/create", async (request, response) => {
  const { title, author, price } = request.body;
  let newsletter = request.body.newsletter;

  if (newsletter === "on") {
    newsletter = true;
  } else {
    newsletter = false;
  }
  console.log(request.body);
  //Inserir
  await Book.create({ title, author, price, newsletter });

  return response.redirect("/");
});

//Rota para listar um único usuário
app.get("/books/:id", async function (request, response) {
  const id = request.params.id;
  //SELECT * FROM users WHERE id = id
  const book = await Book.findOne({ raw: true, where: { id: id } });
  console.log(book);
  return response.render("viewbook", { book });
});

app.post("/books/delete/:id", async (request, response) => {
  const id = request.params.id;
  //Delete - destroy
  await Book.destroy({ where: { id: id } });
  return response.redirect("/");
});

app.get("/books/edit/:id", async (request, response) => {
  const id = request.params.id;
  const book = await Book.findOne({ raw: true, where: { id: id } });
  console.log(book);
  return response.render("editbook", { book: book });
});

app.post("/book/update", async (request, response) => {
  const { id, title, author, price } = request.body;
  let newsletter = request.body.newsletter;

  if (newsletter === "on") {
    newsletter = true;
  } else {
    newsletter = false;
  }
  // Montar um objeto, para função do sequelize receba um dado
  const bookData = {
    id,
    title,
    author,
    price,
    newsletter,
  };
  //Update -> update
  await Book.update(bookData, { where: { id: id } });
  return response.redirect('/')
});

app.get("/", async (request, response) => {
  const books = await Book.findAll({ raw: true });
  // console.log(users)
  return response.render("home", { books });
});

conn
  .sync()
  .then(() => {
    app.listen(3333, () => {
      console.log("Servidor Online");
    });
  })
  .catch((error) => console.log(error));