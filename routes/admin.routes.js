const express = require("express");
const router = express.Router();
const Book = require("../models/Book.model.js");
const uploader = require("../middlewares/cloudinary.middleware.js")
const {isAdmin}= require("../middlewares/auth.middlewares.js")


//GET "/admin/index-admin" => renderiza la vista de la pagina de administrador
router.get("/index-admin",isAdmin, async (req, res, next) => {
  try{
   
    const allBooks =  await Book.find()
    res.render("admin/index-admin",{
      allBooks
    });
  }catch(error){
    next(error)
  }

});

//GET "/admin/create" => renderiza la vista del formulario de crear libros
router.get("/create",isAdmin, (req, res, next) => {
  res.render("admin/create");
});

//POST "/admin/create" => recoge los datos del formulario de creacion de libros
router.post("/create", uploader.single("image"), async (req, res, next) => {
if(req.file === undefined){
  next("no hay imagen")
  return
}

 try {
    const {title,synopsis, numPag,author,genre} = req.body
    Book.create({
      title,
      author,
      synopsis,
      numPag,
      genre,
      image: req.file.path
    })
    console.log("libro añadido")
    res.redirect("/admin/create") // cambiar ruta de redireccion despues de crear BD
   } catch (error) {
     next(error);
   }
});





//GET "/admin/editDelete" => renderiza la vista del formulario
router.get("/editDelete", isAdmin, (req, res, next)=>{
  res.render("admin/edit-delete")
})

module.exports = router;
