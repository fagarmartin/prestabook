const express = require("express");
const router = express.Router();

const Book = require("../models/Book.model.js");
const {
  isUser,
  isLoggedIn,
  updateLocals,
  isAdmin,
} = require("../middlewares/auth.middlewares.js");

//para variables de ocultar los botones
router.use(updateLocals);

// GET "/"=> renderiza la pagina principal
router.get("/", isLoggedIn, isUser, async (req, res, next) => {
  try {
    const allBooks = await Book.find()
      .select({ title: 1, author: 1, image: 1, likes: 1 })
      .sort({ title: 1 });
    //hacemos un clon de la lista de libros
    const cloneBooks = JSON.parse(JSON.stringify(allBooks));
    cloneBooks.forEach((eachbook) => {
      // chekea los libros que tienen likes de un usuario activo, creamos una propiedad nueva: isLikes
      if (eachbook.likes.includes(req.session.user._id) === true) {
        eachbook.isLikes = true;
      }
      eachbook.likesCounter = eachbook.likes.length;
    });

    // pasamos como objeto el clone de allBooks
    res.render("index", {
      cloneBooks,
    });
  } catch (error) {
    next(error);
  }
});

//para las rutas de usuario autenticado
const privateRouter = require("./private.routes");
router.use("/private", isLoggedIn, isUser, privateRouter);

//rutas de acceso exclusivo de admin
const adminRouter = require("./admin.routes");
router.use("/admin", isAdmin, adminRouter);

//rutas para los  libros
const bookRouter = require("./book.routes");
router.use("/book", isLoggedIn, isUser, bookRouter);

//rutas para login y signup
const authRouter = require("./auth.routes");
router.use("/auth", authRouter);

//rutas para los comentarios de los libros
const comentariosRouter = require("./comentario.routes.js");
router.use("/comentario", isLoggedIn, isUser, comentariosRouter);

module.exports = router;
