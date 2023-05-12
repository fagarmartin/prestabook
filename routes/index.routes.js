const express = require('express');
const router = express.Router();



/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//para las rutas de usuario autenticado
const privateRouter=require("./private.routes")
router.use("/private",privateRouter)


//rutas de acceso exclusivo de admin
const adminRouter=require("./admin.routes")
router.use("/admin",adminRouter)

//rutas para los  libros
const bookRouter=require("./book.routes")
router.use("/book",bookRouter)


//rutas para login y signup
const authRouter=require("./auth.routes")
router.use("/auth",authRouter)

module.exports = router;
