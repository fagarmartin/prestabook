const express = require("express");
const router = express.Router();

const Book = require("../models/Book.model.js");
const Prestamo = require("../models/Prestamo.model.js");

// GET "/private/profile" => renderiza pagina privada del usuario ,lista de libros en prestamo y leidos
router.get("/profile", async (req, res, next) => {
  try {
    const prestadoBooks = await Prestamo.find({
      user: req.session.user._id,
      status: "Prestado",
    }).populate("book"); // para recoger todos los datos de los libros prestados

    const leidoBooks = await Prestamo.find({
      user: req.session.user._id,
      status: "Retornado",
    }).populate("book"); // para recoger todos los datos de los libros devueltos y leidos
    res.render("profile/index-user", { prestadoBooks, leidoBooks });
  } catch (error) {
    next(error);
  }
});
// POST "/private/:id/retornado"
router.post("/:idPrestamo/retornado", async (req, res, next) => {
  try {
    // actualiza el prestamo y cambia el estado a retornado
    const prestaBook = await Prestamo.findByIdAndUpdate(req.params.idPrestamo, {
      status: "Retornado",
    });
    await Book.findByIdAndUpdate(prestaBook.book, { $inc: { stock: 1 } }); // suma uno al stock actual
    res.redirect("/private/profile");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
