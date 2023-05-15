const express = require("express");
const router = express.Router();

const Book = require("../models/Book.model.js");
const Prestamo = require("../models/Prestamo.model.js");
// GET "/book/search-list" => renderiza la vista de buscar libro

// GET "/book/:id"=> renderiza los detalles del libro

//! hemos cambiado a :id/details para que no entre en esta ruta siempre y de fallo
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


router.get("/search-list", async (req, res, next) => {
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

// POST "/book/prestado" => coger los datos de libro prestado
router.post("/:id/prestado", async(req, res, next)=>{
  console.log("Entrando en prestado")
  
  try{
    const prestaBook = await Prestamo.create({
      user: req.session.user._id,
      book: req.params.id,
      status: "Prestado"
    })
    

res.redirect("/")
  }
  catch(error){
    next(error)
  }
})

module.exports = router;
