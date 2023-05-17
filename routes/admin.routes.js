const express = require("express");
const router = express.Router();
const Book = require("../models/Book.model.js");
const Prestamo=require("../models/Prestamo.model.js")
const uploader = require("../middlewares/cloudinary.middleware.js");
const { isAdmin } = require("../middlewares/auth.middlewares.js");

//GET "/admin/index-admin" => renderiza la vista de la pagina de administrador
router.get("/index-admin", isAdmin, async (req, res, next) => {
  try {
    const allBooks = await Book.find();
    res.render("admin/index-admin", {
      allBooks,
    });
  } catch (error) {
    next(error);
  }
});

//GET "/admin/create" => renderiza la vista del formulario de crear libros
router.get("/create",  (req, res, next) => {
  res.render("admin/create");
});

//POST "/admin/create" => recoge los datos del formulario de creacion de libros
router.post("/create", uploader.single("image"), async (req, res, next) => {
  if (req.file === undefined) {
    next("no hay imagen");
    return;
  }

  try {
    const { title, synopsis, numPag, author, genre } = req.body;
    Book.create({
      title,
      author,
      synopsis,
      numPag,
      genre,
      image: req.file.path,
    });
    console.log("libro añadido");
    res.redirect("/admin/index-admin");
  } catch (error) {
    next(error);
  }
});

//todo en la vista seleccionar el genero que esté en la base de datos
//GET "/admin/:id/edit" => renderiza la vista del formulario
router.get("/:id/edit",  async (req, res, next) => {
  try {
    const bookDetails = await Book.findById(req.params.id);
    res.render("admin/edit", { bookDetails });
  } catch (error) {
    next(error);
  }
});

//POST "/admin/:id/edit" => recibe la informacion del formulario de editar
//  uploader.single("image"),
router.post("/:id/edit",  async (req, res, next) => {
  const { title, synopsis, numPag, author, genre } = req.body;
  try {
    const editBooks = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        synopsis,
        numPag,
        author,
        genre,
        // image: req.file.path,
      },
      { new: true }
    );
    res.redirect("/admin/index-admin");
  } catch (error) {
    next(error);
  }
});

//POST "/admin/:id/delete" => borrar libro por su id
router.post("/:id/delete",  async (req, res, next) => {
  try {
    const bookDeleted = await Book.findByIdAndDelete(req.params.id);
    res.redirect("/admin/index-admin");
  } catch (error) {
    next(error);
  }
});

//GET "/admin/list-status" => renderiza la lista de libros prestados y retornados
router.get("/list-status",async(req,res,next)=>{

  try{
      const searchStatus= await Prestamo.find({status:"Prestado"}).sort({user:1}).populate("book").populate("user")   
      console.log(searchStatus)
      res.render("admin/list-status",{searchStatus})
  }
  catch(error)
  {
    next(error)
  }
})

module.exports = router;
