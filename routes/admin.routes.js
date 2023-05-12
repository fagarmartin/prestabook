const express = require("express");
const router = express.Router();
const Book = require("../models/Book.model.js");

//GET "/admin/index-admin" => renderiza la vista de la pagina de administrador
router.get("/index-admin", (req, res, next) => {
  res.render("admin/index-admin");
});

//GET "/admin/create" => renderiza la vista del formulario de crear libros
router.get("/create", (req, res, next) => {
  res.render("admin/create");
});

//POST "/admin/create" => recoge los datos del formulario de creacion de libros
router.post("/create", async (req, res, next) => {
  try {
    console.log(req.body)
    
  } catch (error) {
    next(error);
  }
});

module.exports = router;
