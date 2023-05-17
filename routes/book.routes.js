const express = require("express");
const router = express.Router();

const Book = require("../models/Book.model.js");
const Prestamo = require("../models/Prestamo.model.js");
// GET "/book/search-list" => renderiza la vista de buscar libro

// GET "/book/:id"=> renderiza los detalles del libro

//! hemos cambiado a :id/details para que no entre en esta ruta siempre y de fallo
router.get("/:id/details", async (req, res, next) => {
  
  try {
    const bookDetails = await Book.findById(req.params.id);
    res.render("book/details", {
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
        // para poder buscar por titulo, genero o autor añadida una expresion regular para buscar por mayuscula o minuscula indistintamente
      { $or: [ {title: { $regex: new RegExp( req.query.datosBusqueda.toLowerCase(), "i")}}, {author: { $regex:new RegExp( req.query.datosBusqueda.toLowerCase(), "i")}},{genre: { $regex:new RegExp( req.query.datosBusqueda.toLowerCase(), "i")}} ] }
    );

    console.log(searchBook);
    res.render("book/search-list", {
      searchBook,
    });

   
  } catch (error) {
    next(error);
  }
});

// POST "/book/:id/prestado" => coger los datos de libro prestado , crear documento en Prestamo con id de usuario y libro
router.post("/:id/prestado", async(req, res, next)=>{
    
  try{    
    
    const foundBook=await Book.findById(req.params.id)
    if(foundBook.stock>0) // verificamos que haya stock antes de hacer el prestamo
    {
      // crea el prestamo con la id del libro y el usuario
      const prestaBook = await Prestamo.create({
        user: req.session.user._id,
        book: req.params.id,
        status: "Prestado"
      })
      await Book.findByIdAndUpdate(req.params.id,{stock:foundBook.stock-1}) // resta uno al stock actual
      res.redirect("/private/profile") 
    }
    else{ // volvera a redirigir a la pagina del libro que el usuario queria pedir prestado y reflejara que no hay stock
        res.redirect("/book/"+req.params.id+"/details")
    }
 
  }
  catch(error){
    next(error)
  }
})

//POST "/book/:id/like" => recoge los datos del me gusta para añadirlo a la array de like de Book
router.post("/:id/like",async(req,res,next)=>{
  try{
    const booksLike=await Book.findByIdAndUpdate(req.params.id,{like: req.session.user._id},{new:true})
    console.log(booksLike)
    res.redirect("/")
  }
  catch(error)
  {
    next(error)
  }
})


module.exports = router;
