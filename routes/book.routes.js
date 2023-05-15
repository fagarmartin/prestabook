const express = require("express");
const router = express.Router();

const Book = require("../models/Book.model.js");

// GET "/book/search-list" => renderiza la vista de buscar libro

// GET "/book/:id"=> renderiza los detalles del libro

router.get("/:id/details", async (req, res, next) => {
  console.log("ENTRA EN :id");
  try {
    const bookDetails = await Book.findById(req.params.id);
    res.render("book/index", {
      bookDetails,
    });
  } catch (error) {
    next(error);
  }
});

//! lo metemos dentro de /search porque si no coge la primera ruta que haya dentro de /book
router.get("/search/search-list", async (req, res, next) => {
  try {
    //  const searchBook = await Book.findOne({title: req.query.title})
    const searchBook = await Book.find(
     /* title: { $regex: req.query.datosBusqueda.toLowerCase()},
      author: { $regex: req.query.datosBusqueda.toLowerCase() } ,
      genre: { $regex: req.query.datosBusqueda.toLowerCase()  }, */

      { $or: [ {title: { $regex: req.query.datosBusqueda.toLowerCase()}}, {author: { $regex: req.query.datosBusqueda.toLowerCase()}},{genre: { $regex: req.query.datosBusqueda.toLowerCase()  }} ] }
    );

    console.log(searchBook);
    res.render("book/search-list", {
      searchBook,
    });

   
  } catch (error) {
    next(error);
  }
});

module.exports = router;
