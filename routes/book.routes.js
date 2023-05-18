const express = require("express");
const router = express.Router();

const Book = require("../models/Book.model.js");
const Prestamo = require("../models/Prestamo.model.js");
const Comentario=require("../models/Comentario.model.js") // para listar los comentarios en la vista de detalles del libro
// GET "/book/search-list" => renderiza la vista de buscar libro

// GET "/book/:id"=> renderiza los detalles del libro

//! hemos cambiado a :id/details para que no entre en esta ruta siempre y de fallo
router.get("/:id/details", async (req, res, next) => {
  
  try {
    //likes
    const bookDetails = await Book.findById(req.params.id);  
    const cloneBooks=JSON.parse(JSON.stringify(bookDetails))
    //para guardar la cantidad de likes que tiene el libro
    cloneBooks.likesCounter=cloneBooks.likes.length

    //comentarios
    const allComentarios=await Comentario.find({
      //busca por la propiedad del modelo Comentario
      book: req.params.id
    }).populate("user") //para poder mostrar el nombre del usuario
    console.log(allComentarios)
    res.render("book/details", {
      bookDetails:cloneBooks, allComentarios
    });
  } catch (error) {
    next(error);
  }
});

// GET "/search-list" => renderiza la pagina de busqueda
router.get("/search-list", async (req, res, next) => {
  try {
    //  const searchBook = await Book.findOne({title: req.query.title})
    const searchBook = await Book.find(    
        // para poder buscar por titulo, genero o autor añadida una expresion regular para buscar por mayuscula o minuscula indistintamente
      { $or: [ {title: { $regex: new RegExp( req.query.datosBusqueda.toLowerCase(), "i")}}, {author: { $regex:new RegExp( req.query.datosBusqueda.toLowerCase(), "i")}},{genre: { $regex:new RegExp( req.query.datosBusqueda.toLowerCase(), "i")}} ] }
    );
    const cloneBooks = JSON.parse(JSON.stringify(searchBook))
    cloneBooks.forEach(eachbook => {
     // console.log(eachbook.likes)

     // chekea los libros que tienen likes de un usuario activo, creamos una propiedad nueva: isLikes
      if(eachbook.likes.includes(req.session.user._id) === true ){
        eachbook.isLikes = true
      }
      eachbook.likesCounter = eachbook.likes.length
    });
    //console.log(searchBook);
    //hemos usado la misma vista creada en index 
    res.render("index", {
      cloneBooks
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

    // añade un usuario al array like de books y checkea que no este duplicado
     const booksLike=await Book.findByIdAndUpdate(req.params.id,{$addToSet: {likes: req.session.user._id}},{new:true})
    console.log(booksLike)
    res.redirect("/")
  }
  catch(error)
  {
    next(error)
  }
})


//POST "/book/:id/nolike" => recoge los datos del me gusta para quitarlo a la array de like de Book
router.post("/:id/nolike",async(req,res,next)=>{
  try{

    // añade un usuario al array like de books y checkea que no este duplicado
     const booksNoLike=await Book.findByIdAndUpdate(req.params.id,{$pull: {likes: req.session.user._id}},{new:true})
    console.log(booksNoLike)
    res.redirect("/")
  }
  catch(error)
  {
    next(error)
  }
})

module.exports = router;
