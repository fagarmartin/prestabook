const express = require("express");
const router = express.Router();

const Comentario = require("../models/Comentario.model.js");
const Book = require("../models/Book.model.js");

//POST "/comentario/:id/create" => recoge los datos del formulario de crear comentario
router.post("/:id/create", async (req, res, next) => {
  try {
    const checkComentario = await Comentario.find({
      book: req.params.id,
      user: req.session.user._id,
    });
    //se  deja comentar varias veces el mismo usario para dejar a los usuarios interactuar entre ellos

    const createComentario = await Comentario.create({
      book: req.params.id,
      user: req.session.user._id,
      comentario: req.body.comentario,
    });
    // para que redireccione a la misma pagina del libro en la que estaba

    res.redirect("/book/" + req.params.id + "/details");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
