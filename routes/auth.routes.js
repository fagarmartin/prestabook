const express = require("express");
const router = express.Router();
const User =require("../models/User.model.js")
const bcrypt = require("bcryptjs");

//GET "/auth/login" => renderiza un formulario de acceso a la web
router.get("/login",(req,res,next)=>{
    res.render("auth/login.hbs")
})

//POST "/auth/login" => recoge datos del formulario de login
router.post("/login",async(req,res,next)=>{


})



module.exports = router;